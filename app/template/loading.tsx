import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="w-full md:w-1/2">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Property Details</h1>
          </div>
          <Card className="p-6">
            <div className="flex items-center justify-center h-96">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          </Card>
        </div>
        <div className="w-full md:w-1/2">
          <div className="sticky top-4">
            <h2 className="text-2xl font-semibold mb-4">Property Listings</h2>
            <Card className="p-6">
              <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}