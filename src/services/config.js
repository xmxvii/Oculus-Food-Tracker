const CONFIG = {
  API_URL: process.env.NODE_ENV === 'production'
    ? 'https://api.oculus-food.pages.dev'
    : 'http://localhost:8787',
  
  ENVIRONMENT: process.env.NODE_ENV,
  
  VERSION: '1.0.0'
};

export default CONFIG;
