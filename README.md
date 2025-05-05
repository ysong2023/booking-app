# Restaurant Booking System

A modern restaurant booking application built with Next.js, Supabase, and Anthropic's Claude model for conversational booking experience.

## Features

- Authentication with Supabase Auth
- Real-time booking management
- Interactive chat interface with Claude
- Responsive design with Tailwind CSS
- Deployable to Vercel

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Supabase (Auth, Database)
- **AI**: Anthropic Claude
- **Deployment**: Vercel

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd booking-app
```

### 2. Set Up Supabase

1. Create a new Supabase project at [https://supabase.com](https://supabase.com)
2. Set up the following tables in your database:
   - `tables` - Restaurant tables
   - `time_slots` - Available time slots
   - `user_bookings` - User's reservations
3. Configure Row-Level Security (RLS) policies for the tables

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### 6. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fbooking-app)

When deploying to Vercel, make sure to set up the environment variables in the Vercel dashboard.

## Database Schema

### Tables

- `tables`
  - `id`: UUID (Primary Key)
  - `name`: Text
  - `capacity`: Integer

- `time_slots`
  - `id`: UUID (Primary Key)
  - `time`: Text
  - `available`: Boolean

- `user_bookings`
  - `id`: UUID (Primary Key)
  - `user_id`: UUID (Foreign Key to auth.users)
  - `time_slot_id`: UUID (Foreign Key to time_slots)
  - `table_id`: UUID (Foreign Key to tables)
  - `reservation_name`: Text
  - `created_at`: Timestamp with timezone

## License

MIT
