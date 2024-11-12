import { MapPin } from 'lucide-react';

interface PropertyHeaderProps {
  address: string;
}

export function PropertyHeader({ address }: PropertyHeaderProps) {
  return (
    <div className="space-y-4 mb-8">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {address}
      </h1>
      <p className="flex items-center text-muted-foreground">
        <MapPin className="h-4 w-4 mr-1" />
        {address}
      </p>
    </div>
  );
}