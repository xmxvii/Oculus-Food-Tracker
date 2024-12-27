import CONFIG from './config';

export async function analyzeImage(base64Image) {
  try {
    // Check if server is running
    const healthCheck = await fetch(`${CONFIG.API_URL}/api/health`);
    if (!healthCheck.ok) {
      throw new Error('Server is not responding');
    }

    console.log('Sending image for analysis...');
    const response = await fetch(`${CONFIG.API_URL}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        image: base64Image.startsWith('data:') ? base64Image : `data:image/jpeg;base64,${base64Image}`
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Analysis error response:', errorData);
      throw new Error(errorData.error || 'Failed to analyze image');
    }

    const data = await response.json();
    console.log('Analysis response:', data);
    
    if (!data.name || typeof data.calories !== 'number' || !data.macros) {
      console.error('Invalid response format:', data);
      throw new Error('Invalid response format from food analysis');
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
