import { NextResponse } from 'next/server';
import { locations } from '@/lib/mockData';

/**
 * GET /api/locations
 * Returns all available Premier Inn locations
 */
export async function GET() {
  try {
    // Simulate a slight delay to mimic a real API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return NextResponse.json({ 
      success: true, 
      data: locations 
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch locations' },
      { status: 500 }
    );
  }
}
