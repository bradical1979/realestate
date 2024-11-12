import { AddressForm } from '@/components/address-form';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center space-y-8 py-12">
        <div className="text-center space-y-4 max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight">
            Real Estate Mini-Sites Platform
          </h1>
          <p className="text-xl text-muted-foreground">
            Generate beautiful, SEO-optimized mini-sites for your real estate listings in seconds
          </p>
        </div>
        <div className="w-full max-w-md">
          <AddressForm />
        </div>
      </div>
    </div>
  );
}