import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, Building2, Calendar } from 'lucide-react';

interface AgentInfoProps {
  agent: {
    name: string;
    phone: string;
    email: string;
    image: string;
    company: string;
    calendlyUrl?: string;
  };
}

export function AgentInfo({ agent }: AgentInfoProps) {
  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Contact Agent</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative h-20 w-20 rounded-full overflow-hidden">
            <Image
              src={agent.image}
              alt={agent.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{agent.name}</h3>
            <p className="text-sm text-muted-foreground flex items-center">
              <Building2 className="h-4 w-4 mr-1" />
              {agent.company}
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href={`tel:${agent.phone}`}>
              <Phone className="mr-2 h-4 w-4" />
              {agent.phone}
            </a>
          </Button>
          
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href={`mailto:${agent.email}`}>
              <Mail className="mr-2 h-4 w-4" />
              {agent.email}
            </a>
          </Button>
          
          <Button className="w-full" asChild>
            <a href={agent.calendlyUrl || '#'} target="_blank" rel="noopener noreferrer">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule a Showing
            </a>
          </Button>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            "I'm here to help you find your perfect home. Contact me anytime for questions or to schedule a viewing!"
          </p>
        </div>
      </CardContent>
    </Card>
  );
}