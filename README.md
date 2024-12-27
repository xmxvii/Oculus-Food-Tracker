# Oculus - Food Vision AI

An AI-powered food analysis application that uses computer vision to identify and provide nutritional information for food items.

## Deployment

### Frontend (Cloudflare Pages)

1. Connect your GitHub repository to Cloudflare Pages
2. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node.js version: 18.x

### Backend (Cloudflare Workers)

1. Install Wrangler CLI:
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

3. Configure environment variables:
```bash
wrangler secret put OPENAI_API_KEY
```

4. Deploy the worker:
```bash
npm run worker:deploy
```

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Create a `.dev.vars` file from the example:
```bash
cp .dev.vars.example .dev.vars
```

3. Start the development server:
```bash
# Frontend
npm run dev

# Backend (in a separate terminal)
npm run worker:dev
```

## Environment Variables

Required environment variables:
- `OPENAI_API_KEY`: Your OpenAI API key
- `ENVIRONMENT`: `development` or `production`

## Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run worker:dev` - Start Cloudflare Worker locally
- `npm run worker:deploy` - Deploy Cloudflare Worker
- `npm run pages:deploy` - Deploy to Cloudflare Pages

[Rest of README content...]
