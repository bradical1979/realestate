'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

interface PropertyContentProps {
  content: string;
  googleSearchUrl: string;
}

export function PropertyContent({ content, googleSearchUrl }: PropertyContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const sections = content.split('###').filter(Boolean).map(section => {
    const lines = section.trim().split('\n');
    const title = lines[0].trim();
    const content = lines.slice(1).join('\n').trim();
    
    const id = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    return { id, title, content };
  });

  return (
    <div className="space-y-8" ref={contentRef}>
      {sections.map((section, index) => (
        <section 
          key={index} 
          id={section.id}
          className="scroll-mt-20"
        >
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <div className="prose max-w-none">
              {section.content.split('\n').map((paragraph, idx) => (
                paragraph.trim() && (
                  <p key={idx} className="mb-4 text-muted-foreground">
                    {paragraph.trim().replace(/\*\*/g, '')}
                  </p>
                )
              ))}
            </div>
          </Card>
        </section>
      ))}

      <section id="property-listings" className="scroll-mt-20">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Property Listings</h2>
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              src={googleSearchUrl}
              className="w-full h-full"
              title="Property Search Results"
            />
          </div>
        </Card>
      </section>
    </div>
  );
}