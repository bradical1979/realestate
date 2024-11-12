import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateMiniSiteContent(mlsNumber?: string, address?: string) {
  if (!mlsNumber && !address) {
    throw new Error('An MLS number or an address is required');
  }

  console.log('Generating content for:', address || mlsNumber);

  const searchTerm = mlsNumber ? `MLS number ${mlsNumber}` : `property at ${address}`;
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(address || mlsNumber || '')}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a real estate AI assistant with in-depth property and neighborhood knowledge. Generate detailed property descriptions without disclaimers."
        },
        {
          role: "user",
          content: `Generate a comprehensive, richly detailed breakdown for the property located at ${searchTerm}. Structure the response into clear sections with headings for: 
          ####  Neighborhood and Community Overview**
   - Describe the neighborhood atmosphere (e.g., family-friendly, artistic, business-oriented) and include notable community traits (e.g., “known for its holiday parades”).
   - Offer specific historical details about the area, mentioning any nearby historical landmarks, famous events, or well-known community figures.
   - Include information on local social groups, hobby clubs, and neighborhood associations, as well as any community events, festivals, or gatherings that enrich the area.

####  Lifestyle Fit and Buyer Profile**
   - **Ideal Buyer Profile**: Describe the types of residents typically drawn to the neighborhood (e.g., young professionals, retirees, families).
   - **Local Demographics**: Include an overview of the neighborhood’s demographics, such as average age, family size, and common professions, if available.

####  Schools and Family Resources**
   - List nearby public and private schools with exact names, ratings, distances from the address, and a brief description of each school's strengths (e.g., “high-ranking arts program,” “known for small class sizes”).
   - Include details on local daycare centers, preschools, after-school programs, and family resources like youth sports leagues or community centers.

####  Safety and Accessibility**
   - Provide crime statistics for the area, recent trends, and details on nearby police and fire stations (include names and distances).
   - Describe local accessibility features for people with disabilities, including sidewalks, wheelchair access, ADA compliance, and specific accommodations.
   - Mention noise levels in the area, common noise sources (e.g., proximity to highways, nightlife), and typical quiet hours.

####  Local Amenities and Daily Living Resources**
   - List essential amenities like grocery stores, pharmacies, banks, and gas stations, specifying exact names, distances, hours, and known specialties (e.g., “organic options available”).
   - For dining, include specific nearby restaurants with exact names, cuisine types, ratings, and distance from the property (e.g., “La Dolce Vita - 0.5 miles - 4.7 stars - Italian, family-friendly”).
   - Note any hidden gems, unique local shops, specialty stores, or farmers' markets that add character to the area.

####  Recreation, Arts, and Lifestyle**
   - Provide details on nearby parks, trails, gyms, and recreational venues, including activity types supported (e.g., “hiking, biking, playgrounds”) and distances.
   - Describe arts and entertainment options such as theaters, galleries, music venues, and community events. Mention any annual festivals, seasonal markets, or cultural events.
   - Note nearby pet-friendly venues, dog parks, pet services, and any pet-related restrictions in the area.

####  Economic and Employment Landscape**
   - List major employers and industries in the area with specifics (e.g., company names, sectors). Include average commute times to popular job centers and any prominent local economic drivers (like tourism or tech).
   - Provide an economic growth forecast, noting upcoming development plans or business expansions nearby.

####  Transportation and Commute Information**
   - Specify commute times by car, public transit, and bike to key locations (downtown, airports). Include the closest public transit stops and availability of ride-sharing or carpool options.
   - Mention local walkability, bike lanes, car-friendly infrastructure, and accessibility features like electric vehicle (EV) charging stations.

####  Climate, Environment, and Seasonal Living**
   - Describe climate details like average seasonal temperatures, annual precipitation, and any notable weather patterns.
   - Mention nearby natural features (rivers, mountains) and seasonal activities (skiing, beach-going) that make the location unique.
   - Include environmental risks (e.g., flood zones, wildfire-prone areas) and local resilience efforts, such as emergency services or community preparedness programs.

####  Sustainability and Green Living**
   - List local recycling programs, green energy providers, eco-friendly services, and incentives for sustainable practices. Include community green initiatives (e.g., “community garden 0.3 miles away”) and water/air quality levels if available.
   - Describe options for sustainable living and energy-saving potential in the area, such as incentives for solar power, composting facilities, and support for electric vehicles.

####  Health, Wellness, and Nearby Medical Facilities**
   - List nearby hospitals, urgent care centers, and specialized medical facilities with names, distances, and any specialties they’re known for.
   - Describe wellness resources like fitness classes, yoga studios, mental health support, and any community health programs.
   - Include options for senior care facilities, accessible healthcare services, and specific resources for aging residents.

####  Real Estate Market and Financial Insights**
   - Provide specific historical appreciation rates for the neighborhood, typical property taxes, and any notable financial benefits for homeowners (such as homestead exemptions).
   - Include market trends and rental income potential, giving a well-rounded view of the property’s investment potential.
   - Mention nearby planned developments, infrastructure projects, or zoning changes that may impact future property value.

####  Personalized Recommendations**
  
   - Include tips for integrating into the community, such as neighborhood meet-ups, volunteer opportunities, or family-friendly activities nearby.
          
          `
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });
    
    console.log('OpenAI response received');
    
    return {
      content: completion.choices[0].message.content,
      googleSearchUrl
    };
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    throw new Error(error.message || 'Failed to generate content');
  }
}