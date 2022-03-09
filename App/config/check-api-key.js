module.exports = (req, res, next) => {
    const {
      'x-api-key': apiKey,
    } = req.headers;
    if (apiKey !== process.env.EXPRESS_API_SECRET_KEY) {
      return res.status(401).send('Invalid API key');
    }
  
    if (!process.env.EXPRESS_API_SECRET_KEY) {
      console.warn('Your Express API does not secured by API key');
    }

    next();
};
  