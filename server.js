import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

// load environment variables
dotenv.config();

const app = express();
const port = 3001;
// const OPENAI_API_KEY = process.env.VITE_API_URL;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


// Configure OpenAI with API key
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

// Define the model name as a constant
const GPT4_MODEL = "gpt-4o";

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Food Analysis API Server' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/analyze', async (req, res) => {
  try {
    console.log('Received analysis request');
    const { image } = req.body;
    
    if (!image) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    console.log('Sending request to OpenAI...');

    const response = await openai.chat.completions.create({
      model: GPT4_MODEL,  // Using gpt-4o model
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

    console.log('OpenAI response received:', response);

    if (!response.choices || !response.choices[0]?.message?.content) {
      console.error('Invalid API response structure:', response);
      return res.status(500).json({ error: 'Invalid API response structure' });
    }

    const responseText = response.choices[0].message.content;
    console.log('GPT-4 response text:', responseText);

    try {
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

      console.log('Parsed food data:', foodData);
      res.json(foodData);

    } catch (parseError) {
      console.error('Parse error:', parseError);
      return res.status(500).json({ 
        error: 'Failed to parse response',
        details: parseError.message
      });
    }

  } catch (error) {
    console.error('Server error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to analyze the food image',
      details: error.response?.data?.error?.message || error.message 
    });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log('- GET  /');
  console.log('- GET  /api/health');
  console.log('- POST /api/analyze');
});
