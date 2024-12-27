import OpenAI from 'openai';

export async function onRequest(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    // Handle CORS preflight
    if (context.request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    // Verify request method
    if (context.request.method !== 'POST') {
      throw new Error('Method not allowed');
    }

    // Verify API key
    if (!context.env.OPENAI_API_KEY) {
      console.error('OpenAI API key not found in environment variables');
      throw new Error('OpenAI API key not configured');
    }

    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: context.env.OPENAI_API_KEY
    });

    // Parse request body
    let body;
    try {
      body = await context.request.json();
    } catch (e) {
      throw new Error('Invalid request body');
    }

    // Verify image data
    if (!body.image) {
      throw new Error('No image data provided');
    }

    // Make OpenAI API request
    console.log('Making OpenAI API request...');
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this food image and provide ONLY a JSON response in this exact format: {\"name\": \"food name\", \"calories\": number, \"macros\": {\"protein\": number, \"carbs\": number, \"fat\": number, \"fiber\": number}}. Ensure all numbers are numeric values, not strings. Be precise with nutritional information."
            },
            {
              type: "image_url",
              image_url: {
                url: body.image
              }
            }
          ]
        }
      ],
      max_tokens: 1000,
      temperature: 0.5
    });

    console.log('OpenAI response received:', response);

    // Validate OpenAI response
    if (!response.choices?.[0]?.message?.content) {
      throw new Error('Invalid API response structure');
    }

    // Parse JSON from response
    const responseText = response.choices[0].message.content;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    let foodData;
    try {
      foodData = JSON.parse(jsonMatch[0]);
    } catch (e) {
      throw new Error('Failed to parse JSON response');
    }

    // Validate food data structure
    if (!foodData.name || typeof foodData.calories !== 'number' || !foodData.macros) {
      throw new Error('Invalid food data structure');
    }

    const macros = foodData.macros;
    if (typeof macros.protein !== 'number' || 
        typeof macros.carbs !== 'number' || 
        typeof macros.fat !== 'number' || 
        typeof macros.fiber !== 'number') {
      throw new Error('Invalid macronutrient values');
    }

    // Return successful response
    return new Response(JSON.stringify(foodData), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });

  } catch (error) {
    console.error('Error in analyze function:', error);
    
    // Determine status code based on error
    let status = 500;
    if (error.message === 'Method not allowed') status = 405;
    if (error.message === 'No image data provided' || 
        error.message === 'Invalid request body') status = 400;

    return new Response(JSON.stringify({
      error: error.message,
      details: error.stack
    }), {
      status,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
}
