'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ExternalLink } from 'lucide-react';

interface PropertyData {
  content: string;
  googleSearchUrl: string;
}

export function PropertyContent() {
  const searchParams = useSearchParams();
  const contentParam = searchParams.get('content');
  
  let propertyData: PropertyData | null = null;

  try {
    if (contentParam) {
      propertyData = JSON.parse(decodeURIComponent(contentParam));
    }
  } catch (err) {
    console.error('Error parsing content:', err);
  }

  if (!propertyData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const sections = propertyData.content.split('\n\n').filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="w-full md:w-2/3">
          <div className="space-y-6">
            {sections.map((section, index) => {
              const lines = section.split('\n');
              const title = lines[0].replace(/^#+\s*/, '');
              const content = lines.slice(1).join('\n');

              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      {content.split('\n').map((line, i) => (
                        <p key={i} className="mb-2">{line}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="sticky top-4">
            <Card>
              <CardHeader>
                <CardTitle>Property Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <iframe
                    src={propertyData.googleSearchUrl}
                    width="100%"
                    height="500px"
                    className="border-0"
                  />
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(propertyData.googleSearchUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Full Listings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}