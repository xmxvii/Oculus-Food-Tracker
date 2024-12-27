const config = {
    apiBaseUrl: import.meta.env.PROD 
      ? 'https://oculus-food-tracker.pages.dev/api' // Production: Use full URL for Cloudflare Pages
      : 'http://localhost:3001/api' // Development: Use local Express server
  };
  
  export default config;
  