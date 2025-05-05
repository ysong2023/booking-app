import { NextResponse } from 'next/server';

// Use direct API call instead of SDK due to typing issues
export async function POST(request: Request) {
  try {
    const { messages, contextData } = await request.json();

    const systemPrompt = `
You are a helpful assistant for a restaurant booking system. 
You help users book tables at a restaurant based on available time slots.

AVAILABLE TABLES:
${contextData.tables.map((table: any) => `- ${table.name} (seats ${table.capacity})`).join('\n')}

AVAILABLE TIME SLOTS:
${contextData.availableSlots.map((slot: any) => `- ${slot.time}`).join('\n')}

When a user wants to book a table:
1. Identify the requested time and table
2. Check if that combination is available
3. Ask for the reservation name if not provided
4. Return with action: "book_table" and parameters

IMPORTANT: Do not invent time slots or tables that are not in the list above.
Keep your responses brief and focused on helping with bookings.
`;

    // Format messages for Claude API
    const claudeMessages = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.content
    }));

    // Call Claude API directly with fetch
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1000,
        system: systemPrompt,
        messages: claudeMessages,
      })
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Parse the response to check for booking intent
    const responseContent = data.content[0].text;
    
    // Extract booking parameters if this is a booking intent
    let action = null;
    let parameters = null;
    
    if (
      responseContent.toLowerCase().includes('book') ||
      responseContent.toLowerCase().includes('reserv')
    ) {
      // Extract time slot
      let timeSlotId = null;
      for (const slot of contextData.availableSlots) {
        if (responseContent.includes(slot.time)) {
          timeSlotId = slot.id;
          break;
        }
      }
      
      // Extract table
      let tableId = null;
      for (const table of contextData.tables) {
        if (responseContent.toLowerCase().includes(table.name.toLowerCase())) {
          tableId = table.id;
          break;
        }
      }
      
      // Extract name - Simplified approach
      let reservationName = null;
      const nameMatch = responseContent.match(/for\s+([A-Za-z\s]+)/) || 
                         messages[messages.length - 1].content.match(/for\s+([A-Za-z\s]+)/);
      
      if (nameMatch && nameMatch[1]) {
        reservationName = nameMatch[1].trim();
      }
      
      // If we have all required parameters, this is a booking action
      if (timeSlotId && tableId && reservationName) {
        action = 'book_table';
        parameters = { timeSlotId, tableId, reservationName };
      }
    }

    return NextResponse.json({
      response: responseContent,
      action,
      parameters
    });
  } catch (error) {
    console.error('Error calling Claude API:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
} 