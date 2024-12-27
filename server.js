import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
const port = process.env.PORT || 3001;

// Configure CORS for production
const allowedOrigins = [
  'https://oculus-food-vision.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get('/', (req, res) => {
  res.json({ message: 'Oculus Food Vision API' });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
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

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log('Environment:', process.env.NODE_ENV);
});

// Handle errors
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});
