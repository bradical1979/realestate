'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';

interface Section {
  id: string;
  title: string;
  content: string;
}

interface ContentProps {
  content: {
    overview: string;
    sections: Section[];
  };
}

export function MiniSiteContent({ content }: ContentProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Property Overview</h2>
        <p className="text-muted-foreground">{content.overview}</p>
      </Card>

      <Accordion
        type="single"
        collapsible
        value={activeSection || undefined}
        onValueChange={(value) => setActiveSection(value)}
      >
        {content.sections.map((section) => (
          <AccordionItem key={section.id} value={section.id}>
            <AccordionTrigger className="text-lg font-semibold">
              {section.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="prose max-w-none pt-4">
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">More Details on the Web</h2>
        <div className="aspect-video">
          <iframe
            src={`https://www.google.com/search?igu=1&q=${encodeURIComponent(content.overview)}`}
            className="w-full h-full border-0"
            title="Property Search Results"
          />
        </div>
      </Card>
    </div>
  );
}