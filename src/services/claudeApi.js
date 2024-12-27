export async function analyzeImage(base64Image) {
  try {
    // Ensure we have a proper data URL
    const imageUrl = base64Image.startsWith('data:') 
      ? base64Image 
      : `data:image/jpeg;base64,${base64Image}`;

    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ image: imageUrl })
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || `Failed to analyze image (${response.status})`);
    }

    const data = await response.json();
    
    // Validate response structure
    if (!data.name || typeof data.calories !== 'number' || !data.macros) {
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
    throw error;
  }
}
