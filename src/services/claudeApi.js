import config from './Config';

export async function analyzeImage(base64Image) {
  try {
    // Ensure we have a proper data URL
    const imageUrl = base64Image.startsWith('data:') 
      ? base64Image 
      : `data:image/jpeg;base64,${base64Image}`;

    console.log('Making API request to:', `${config.apiBaseUrl}/analyze`);
    
    const response = await fetch(`${config.apiBaseUrl}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageUrl })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', data);
      throw new Error(data.error || 'Failed to analyze image');
    }

    console.log('API Response:', data);
    
    // Validate response structure
    if (!data.name || typeof data.calories !== 'number' || !data.macros) {
      console.error('Invalid response format:', data);
      throw new Error('Invalid response format from food analysis');
    }

    // Validate macro values
    const macros = data.macros;
    if (typeof macros.protein !== 'number' || 
        typeof macros.carbs !== 'number' || 
        typeof macros.fat !== 'number' || 
        typeof macros.fiber !== 'number') {
      throw new Error('Invalid macronutrient values in response');
    }

    return data;
  } catch (error) {
    console.error('Analysis error:', error);
    if (error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to server. Please check your connection.');
    }
    throw error;
  }
}
