"use server"

import { generateMiniSiteContent } from "@/lib/openai";
import { redirect } from "next/navigation";

export async function generateMiniSite(formData: FormData) {
  const address = formData.get("address");
  
  if (!address || typeof address !== "string") {
    return { 
      success: false, 
      error: "Address is required" 
    };
  }

  try {
    const content = await generateMiniSiteContent(address);
    
    if (!content) {
      throw new Error('No content generated');
    }

    return { 
      success: true, 
      content 
    };
  } catch (error: any) {
    console.error("Error in generateMiniSite:", {
      message: error.message,
      cause: error.cause,
      stack: error.stack,
    });

    return { 
      success: false, 
      error: error.message || "Failed to generate content" 
    };
  }
}