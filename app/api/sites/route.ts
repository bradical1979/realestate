import { NextResponse } from 'next/server';
import { generateMiniSiteContent } from '@/lib/openai';
import { slugify } from '@/lib/utils/slugify';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const body = await request.json();
    const { address } = body;

    if (!address) {
      return NextResponse.json(
        { success: false, error: 'Address is required' },
        { status: 400, headers }
      );
    }

    console.log('Generating content for:', address);
    const result = await generateMiniSiteContent(undefined, address);
    const slug = slugify(address);

    const response = {
      success: true,
      url: `/sites/${slug}?content=${encodeURIComponent(JSON.stringify(result))}`,
    };

    console.log('API Response:', response);

    return NextResponse.json(response, { 
      status: 200, 
      headers 
    });
  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to generate mini-site' 
      },
      { status: 500, headers }
    );
  }
}