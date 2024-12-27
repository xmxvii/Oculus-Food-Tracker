import OpenAI from 'openai';

export async function onRequest(context) {
  // Enable CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle OPTIONS request for CORS
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  try {
    if (context.request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    // Check if OPENAI_API_KEY is set
    if (!context.env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    const openai = new OpenAI({
      apiKey: context.env.OPENAI_API_KEY
    });

    const body = await context.request.json();
    const { image } = body;

    if (!image) {
      return new Response(JSON.stringify({ error: 'No image data provided' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

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
                url: image
              }
            }
          ]
        }
      ],
      max_tokens: 1000,
      temperature: 0.5
    });

    if (!response.choices || !response.choices[0]?.message?.content) {
      return new Response(JSON.stringify({ error: 'Invalid API response structure' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    const responseText = response.choices[0].message.content;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const foodData = JSON.parse(jsonMatch[0]);
    
    if (!foodData.name || typeof foodData.calories !== 'number' || !foodData.macros) {
      throw new Error('Invalid food data structure');
    }

    const macros = foodData.macros;
    if (typeof macros.protein !== 'number' || 
        typeof macros.carbs !== 'number' || 
        typeof macros.fat !== 'number' || 
        typeof macros.fiber !== 'number') {
      throw new Error('Macro values must be numbers');
    }

    return new Response(JSON.stringify(foodData), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });

  } catch (error) {
    console.error('Analysis error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to analyze the food image',
      details: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
}
