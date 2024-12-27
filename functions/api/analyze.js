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
      throw new Error(`Method ${context.request.method} not allowed`);
    }

    // Get API key from environment
    const apiKey = context.env.OPEN_AI_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Parse request body
    const body = await context.request.json();
    if (!body.image) {
      throw new Error('No image data provided');
    }

    // Make OpenAI API request
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-4o",
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
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'OpenAI API error');
    }

    const data = await response.json();
    
    // Parse and validate response
    const responseText = data.choices?.[0]?.message?.content;
    if (!responseText) {
      throw new Error('Invalid API response structure');
    }

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Not Hotdog');
    }

    const foodData = JSON.parse(jsonMatch[0]);
    
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

    return new Response(JSON.stringify(foodData), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });

  } catch (error) {
    console.error('Error:', error);
    
    const status = error.message.includes('API key') ? 401 : 
                  error.message.includes('Method not allowed') ? 405 :
                  error.message === 'No image data provided' ? 400 : 500;

    return new Response(JSON.stringify({
      error: error.message
    }), {
      status,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
}
