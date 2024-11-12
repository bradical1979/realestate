import { NextResponse } from 'next/server';
import { generateMiniSiteContent } from '@/lib/openai';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  console.log('Received POST request to /api/generateMiniSite');
  
  try {
    const body = await request.json();
    console.log('Request body:', body);
    
    const { address } = body;

    if (!address) {
      console.log('Missing address in request');
      return NextResponse.json(
        { success: false, error: 'Address is required' },
        { status: 400 }
      );
    }

    console.log('Generating content for address:', address);
    const content = await generateMiniSiteContent(undefined, address);
    console.log('Content generated successfully');
    
    return NextResponse.json({
      success: true,
      content: content.content,
      googleSearchUrl: content.googleSearchUrl
    });
  } catch (error: any) {
    console.error('Error in generateMiniSite API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to generate content' 
      },
      { status: 500 }
    );
  }
}