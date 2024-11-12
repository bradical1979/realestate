import { NextResponse } from 'next/server';
import { generateMiniSiteContent } from '@/lib/openai';

export async function POST(req: Request) {
  console.log('Received request to /api/generate');
  
  try {
    const body = await req.json();
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
    const { content, googleSearchUrl } = await generateMiniSiteContent(undefined, address);
    console.log('Content generated successfully');
    
    return NextResponse.json({
      success: true,
      content,
      googleSearchUrl
    });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to generate content' 
      },
      { status: 500 }
    );
  }
}