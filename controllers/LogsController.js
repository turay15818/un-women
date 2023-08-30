import Logs from '../models/Logs.js';

export const logRequest = async (req, res, next) => {
  try {
    const { method, originalUrl, body } = req;
    const { statusCode, statusMessage } = res;
    const requestBody = JSON.stringify(body);
    const responseBody = JSON.stringify(res.locals.responseBody);
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    await Logs.create({
      ipAddress,
      method,
      route: originalUrl,
      requestBody,
      responseBody,
      statusCode,
    });

    next();
  } catch (error) {
    console.error('Error logging request:', error);
    next(error);
  }
};
