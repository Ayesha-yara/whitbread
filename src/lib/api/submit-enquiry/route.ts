import { NextRequest, NextResponse } from 'next/server';
import { groupBookingSchema, GroupBookingFormData } from '@/lib/validation/groupBookingSchema';

// In-memory storage for submitted form data (for development)
// In production, this would be replaced with a database or API call
const submissions: GroupBookingFormData[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const result = groupBookingSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { 
          success: false, 
          errors: result.error.format() 
        }, 
        { status: 400 }
      );
    }
    
    submissions.push(result.data);
    
    return NextResponse.json({ 
      success: true,
      message: 'Enquiry submitted successfully',
      submissionId: Date.now().toString() // Mock ID
    });
    
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ submissions });
}