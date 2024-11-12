import { Card } from '@/components/ui/card';
import { MiniSiteNav } from '@/components/minisite/nav';
import { AgentInfo } from '@/components/minisite/agent-info';
import { PropertyContent } from '@/components/minisite/property-content';
import { PropertyHeader } from '@/components/minisite/property-header';
import { generateMiniSiteContent } from '@/lib/openai';

interface PageProps {
  params: { slug: string };
  searchParams: { content?: string };
}

export default async function PropertyPage({ params, searchParams }: PageProps) {
  const address = params.slug.split('-').join(' ');
  
  let content;
  let googleSearchUrl;
  
  if (searchParams.content) {
    const data = JSON.parse(decodeURIComponent(searchParams.content));
    content = data.content;
    googleSearchUrl = data.googleSearchUrl;
  } else {
    const result = await generateMiniSiteContent(undefined, address);
    content = result.content;
    googleSearchUrl = result.googleSearchUrl;
  }

  const agent = {
    name: "Jane Smith",
    phone: "(555) 123-4567",
    email: "jane.smith@realestate.com",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&q=80",
    company: "Premier Real Estate",
    calendlyUrl: "https://calendly.com/janesmith"
  };

  return (
    <>
      <MiniSiteNav />
      <div className="container mx-auto px-4 py-8">
        <PropertyHeader address={address} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <PropertyContent 
              content={content} 
              googleSearchUrl={googleSearchUrl} 
            />
          </div>
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <AgentInfo agent={agent} />
              <Card className="p-6 hidden lg:block">
                <h2 className="text-xl font-semibold mb-4">Property Listings</h2>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={googleSearchUrl}
                    className="w-full h-full"
                    title="Property Search Results"
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}