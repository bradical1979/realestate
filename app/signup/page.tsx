import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignUpPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          Choose Your Plan
        </h1>
        <p className="max-w-[700px] text-center text-gray-500 md:text-xl">
          Select the perfect plan for your real estate business
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
          <Card>
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <CardDescription>Perfect for individual agents</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">$29/mo</p>
              <ul className="mt-4 space-y-2">
                <li>5 Mini-Sites per month</li>
                <li>Basic analytics</li>
                <li>Email support</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Professional</CardTitle>
              <CardDescription>For growing teams</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">$79/mo</p>
              <ul className="mt-4 space-y-2">
                <li>20 Mini-Sites per month</li>
                <li>Advanced analytics</li>
                <li>Priority support</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>
          <Card className="sm:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>For large agencies</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">Custom</p>
              <ul className="mt-4 space-y-2">
                <li>Unlimited Mini-Sites</li>
                <li>Custom analytics</li>
                <li>24/7 support</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Contact Sales</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}