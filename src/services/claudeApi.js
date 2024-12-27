export async function analyzeImage(base64Image) {
  try {
    // Ensure we have a proper data URL
    const imageUrl = base64Image.startsWith('data:') 
      ? base64Image 
      : `data:image/jpeg;base64,${base64Image}`;

    const response = await fetch('http://localhost:3001/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageUrl })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Analysis error response:', errorData);
      throw new Error(errorData.error || 'Failed to analyze image');
    }

    const data = await response.json();
    console.log('Analysis response:', data);
    
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
      throw new Error('Cannot connect to server. Please ensure the server is running.');
    }
    throw error;
  }
}
