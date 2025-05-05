'use client';

import { useState, useEffect } from 'react';
import { useBooking } from '@/hooks/useBooking';
import { Table, TimeSlot, Booking } from '@/types';

export default function BookingTable() {
  const { availableSlots, tables, userBookings, loading, cancelBooking } = useBooking();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  
  // Group time slots by time for display
  const timeSlotsByTime: Record<string, TimeSlot[]> = {};
  availableSlots.forEach(slot => {
    if (!timeSlotsByTime[slot.time]) {
      timeSlotsByTime[slot.time] = [];
    }
    timeSlotsByTime[slot.time].push(slot);
  });
  
  // Sort times for consistent display
  const sortedTimes = Object.keys(timeSlotsByTime).sort();

  // Handle booking cancellation
  const handleCancel = async (booking: Booking) => {
    if (confirm(`Are you sure you want to cancel this reservation?`)) {
      await cancelBooking(booking.id);
    }
  };
  
  if (loading) {
    return <div className="text-center p-4">Loading bookings...</div>;
  }

  return (
    <div className="bg-black rounded-lg border border-cyan-700 overflow-hidden">
      <div className="p-4 border-b border-cyan-700">
        <h2 className="text-xl font-semibold text-cyan-400">Restaurant Bookings</h2>
      </div>
      
      {/* Availability Table */}
      <div className="p-4">
        <h3 className="text-lg font-medium mb-3 text-cyan-300">Available Times</h3>
        <div className="overflow-x-auto max-w-full">
          <table className="w-full divide-y divide-cyan-800 table-fixed">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-cyan-400 uppercase tracking-wider" style={{ width: '120px' }}>
                  Time
                </th>
                {tables.map(table => (
                  <th key={table.id} className="px-4 py-2 text-left text-xs font-medium text-cyan-400 uppercase tracking-wider" style={{ width: 'auto' }}>
                    {table.name} (Seats {table.capacity})
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-black divide-y divide-cyan-800">
              {sortedTimes.map(time => (
                <tr key={time}>
                  <td className="px-4 py-3 whitespace-nowrap text-cyan-400">
                    {time}
                  </td>
                  {tables.map(table => {
                    // Check if this table is booked at this time
                    const isBooked = userBookings.some(booking => 
                      booking.table?.name === table.name && 
                      booking.time_slot?.time === time
                    );
                    
                    // Find the booking if it exists
                    const booking = userBookings.find(booking => 
                      booking.table?.name === table.name && 
                      booking.time_slot?.time === time
                    );
                    
                    return (
                      <td key={table.id} className="px-4 py-3 whitespace-nowrap text-cyan-400">
                        {isBooked ? (
                          <div className="flex flex-col items-start">
                            <span className="px-2 py-1 text-xs rounded-full bg-cyan-900 text-cyan-300">
                              Booked: {booking?.reservation_name}
                            </span>
                            <button 
                              onClick={() => booking && handleCancel(booking)}
                              className="mt-1 text-red-500 hover:text-red-400"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-900 text-cyan-400">
                            Available
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Your Bookings Section */}
      <div className="p-4 border-t border-cyan-700">
        <h3 className="text-lg font-medium mb-3 text-cyan-300">Your Bookings</h3>
        {userBookings.length > 0 ? (
          <div className="space-y-3">
            {userBookings.map(booking => (
              <div key={booking.id} className="flex justify-between items-center p-3 bg-gray-900 border border-cyan-700 rounded">
                <div>
                  <p className="font-medium text-cyan-400">{booking.reservation_name}</p>
                  <p className="text-sm text-cyan-300">
                    {booking.table?.name} at {booking.time_slot?.time}
                  </p>
                </div>
                <button 
                  onClick={() => handleCancel(booking)}
                  className="px-3 py-1 bg-red-900 text-red-300 rounded hover:bg-red-800"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-cyan-300">You don't have any bookings yet.</p>
        )}
      </div>
    </div>
  );
} 