import { sendEmail } from '../config/SendMailConfig';
import NewsLetter from '../models/NewsLetterModel.js';
import Products from '../models/ProductModel.js';


const subscribers = await NewsLetter.findAll({
  attributes: ['email'],
});


subscribers.forEach(async (subscriber) => {
  const subject = 'New Product Announcement';
  const text = `We have a new product available. Check it out!`;

  await sendEmail(subscriber.email, subject, text);
});
