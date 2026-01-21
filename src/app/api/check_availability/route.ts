// app/api/venue/check-availability/route.ts
// Check venue availability and suggest alternatives

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { 
  checkVenueAvailability, 
  findAlternativeSlots, 
  validateBookingDate,
  MealType 
} from '@/utils/google_calender_service';

// Validation schema
const availabilitySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  meal_type: z.enum(['lunch', 'dinner']),
  call_id: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request
    const body = await request.json();
    const validatedData = availabilitySchema.parse(body);

    console.log('📅 Checking venue availability:', validatedData);

    // Validate date
    const dateValidation = validateBookingDate(validatedData.date);
    if (!dateValidation.valid) {
      return NextResponse.json({
        success: false,
        available: false,
        error: dateValidation.error
      }, { status: 400 });
    }

    // Check availability
    const availability = await checkVenueAvailability(
      validatedData.date,
      validatedData.meal_type as MealType
    );

    if (availability.available) {
      // Slot is available!
      return NextResponse.json({
        success: true,
        available: true,
        date: validatedData.date,
        meal_type: validatedData.meal_type,
        message: `Great news! The venue is available for ${validatedData.meal_type} on ${validatedData.date}.`,
        time_slot: validatedData.meal_type === 'lunch' 
          ? '10:00 AM - 3:00 PM' 
          : '5:00 PM - 10:00 PM'
      });

    } else {
      // Slot is NOT available - find alternatives
      console.log('❌ Slot not available, finding alternatives...');
      
      const alternatives = await findAlternativeSlots(
        validatedData.date,
        validatedData.meal_type as MealType
      );

      if (alternatives.length === 0) {
        return NextResponse.json({
          success: true,
          available: false,
          message: 'Unfortunately, we have no availability in the next 14 days. Please call us directly to check further dates.',
          alternatives: []
        });
      }

      return NextResponse.json({
        success: true,
        available: false,
        requested_date: validatedData.date,
        requested_meal_type: validatedData.meal_type,
        message: `I'm sorry, the venue is already booked for ${validatedData.meal_type} on that date. Here are 3 alternative options:`,
        alternatives: alternatives.map((alt, index) => ({
          option_number: index + 1,
          date: alt.date,
          meal_type: alt.mealType,
          display_date: alt.displayDate,
          time_slot: alt.displayTime,
          description: `Option ${index + 1}: ${alt.displayDate} for ${alt.mealType === 'lunch' ? 'Lunch' : 'Dinner'} (${alt.displayTime})`
        }))
      });
    }

  } catch (error) {
    console.error('❌ Error checking availability:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        details: error.errors
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to check availability. Please try again.'
    }, { status: 500 });
  }
}

// GET endpoint for testing
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const mealType = searchParams.get('meal_type');

  if (!date || !mealType) {
    return NextResponse.json({
      error: 'Missing required parameters: date, meal_type',
      example: '/api/venue/check-availability?date=2024-01-25&meal_type=lunch'
    }, { status: 400 });
  }

  // Reuse POST logic
  return POST(
    new NextRequest(request.url, {
      method: 'POST',
      body: JSON.stringify({ date, meal_type: mealType })
    })
  );
}