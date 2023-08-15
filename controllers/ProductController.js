import Products from "../models/ProductModel.js";
import Sequelize from "sequelize";
import ProductImage from "../models/ProductImageModel.js";
import NewsLetter from "../models/NewsLetterModel.js";
import { sendEmail } from "../config/SendMailConfig.js";
import path from "path";
import handlebars from "handlebars"
import fs from 'fs';

export const getProducts = async (req, res) => {
  try {
    const response = await Product.findAll({
      where: {
        Active: true,
        Deleted: false,
      },
      include: {
        model: ProductImage,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const response = await Product.findOne({
      where: {
        uuid: req.params.id,
        Active: true,
        Deleted: false,
      },
      include: {
        model: ProductImage,
      },
    });

    if (!response) {
      return res.status(404).json({ msg: "Business Profile not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createProduct = async (req, res) => {
  const {
    productName,
    discription,
    rating,
    previousPrice,
    currentPrice,
    ProductId,
  } = req.body;
  const CreatedBy = req.user.name;
  try {
    await Product.create({
      productName: productName,
      discription: discription,
      rating: rating,
      currentPrice: currentPrice,
      previousPrice: previousPrice,
      ProductId: ProductId,
      userId: req.userId,
      CreatedBy: CreatedBy,
    });
    const templatePath = './Utils/productEmailTemplate.html';
    const productEmailTemplate = fs.readFileSync(templatePath, 'utf-8');
    const template = handlebars.compile(productEmailTemplate);
    const emailData = {
      productName: productName,
      description: discription,
      currentPrice: currentPrice,
    };
    const emailBody = template(emailData);
    const subscribers = await NewsLetter.findAll({
      attributes: ['email'],
    });
    subscribers.forEach(async (subscriber) => {
      const subject = 'New Product Announcement';
      
      await sendEmail(subscriber.email, subject, emailBody);
    });
    res.status(201).json({ msg: "Product Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { productName, description, rating, previousPrice, currentPrice } =
    req.body;
  const UpdatedBy = req.user.name;
  try {
    const product = await Product.findOne({
      where: {
        userId: req.user.id,
        Active: true,
        Deleted: false,
      },
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    product.productName = productName;
    product.description = description;
    product.rating = rating;
    product.currentPrice = currentPrice;
    product.previousPrice = previousPrice;
    product.UpdatedBy = UpdatedBy;
    product.DateUpdated = Sequelize.literal("CURRENT_TIMESTAMP");

    await product.save();

    res.status(200).json({ msg: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findOne({
    where: {
      userId: req.user.id,
      Active: true,
      Deleted: false,
    },
  });

  if (!product) {
    return res.status(404).json({ msg: "User not found" });
  }
  const DeletedReason = req.body.DeletedReason;
  const DeletedBy = req.user.name;

  try {
    await Product.update(
      {
        Active: false,
        Deleted: true,
        DateDeleted: Sequelize.literal("CURRENT_TIMESTAMP"),
        DeletedReason: DeletedReason,
        DeletedBy: DeletedBy,
      },
      {
        where: {
          id: product.id,
        },
      }
    );

    // Return a response indicating success
    res.status(200).json({ msg: "Business Profile Deleted" });
  } catch (error) {
    // Return an error response if there's an issue
    res.status(400).json({ msg: error.message });
  }
};

export const createProductAndImages = async (req, res) => {
  try {
    const CreatedBy = req.user.name;
    const userId = req.user.id;

    const {
      productName,
      discription,
      rating,
      previousPrice,
      currentPrice,
      businessProfileId,
    } = req.body;
    const {
      productImageOne,
      productImageTwo,
      productImageThree,
      productImageFour,
      productImageFive,
      productImageSix,
    } = req.files;

    if (
      !productImageOne ||
      !productImageTwo ||
      !productImageThree ||
      !productImageFour ||
      !productImageFive ||
      !productImageSix
    ) {
      return res.status(400).json({ msg: "Six product images are required" });
    }

    const allowedTypes = [".png", ".jpg", ".jpeg"];
    const maxFileSize = 5000000;

    const uploadFile = async (file) => {
      const ext = path.extname(file.name);
      const fileName = file.md5 + ext;

      if (!allowedTypes.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Invalid image format" });
      }

      if (file.data.length > maxFileSize) {
        return res.status(422).json({ msg: "Image size exceeds 5 MB" });
      }

      await file.mv(`./public/images/${fileName}`);
      return `${req.protocol}://${req.get("host")}/images/${fileName}`;
    };
    const product = await Products.create({
      productName: productName,
      discription: discription,
      rating: rating,
      businessProfileId: businessProfileId,
      currentPrice: currentPrice,
      previousPrice: previousPrice,
      userId: userId,
      CreatedBy: CreatedBy,
    });
    const productImageOneUrl = await uploadFile(productImageOne);
    const productImageTwoUrl = await uploadFile(productImageTwo);
    const productImageThreeUrl = await uploadFile(productImageThree);
    const productImageFourUrl = await uploadFile(productImageFour);
    const productImageFiveUrl = await uploadFile(productImageFive);
    const productImageSixUrl = await uploadFile(productImageSix);
    await ProductImage.create({
      userId: userId,
      productImageOne: productImageOneUrl,
      productImageTwo: productImageTwoUrl,
      productImageThree: productImageThreeUrl,
      productImageFour: productImageFourUrl,
      productImageFive: productImageFiveUrl,
      productImageSix: productImageSixUrl,
      CreatedBy: CreatedBy,
      ProductId: product.id,
    });

    const templatePath = './Utils/productEmailTemplate.html';
    const productEmailTemplate = fs.readFileSync(templatePath, 'utf-8');
    const template = handlebars.compile(productEmailTemplate);
    const emailData = {
      productName: productName,
      description: discription,
      currentPrice: currentPrice,
    };
    const emailBody = template(emailData);
    const subscribers = await NewsLetter.findAll({
      attributes: ['email'],
    });
    subscribers.forEach(async (subscriber) => {
      const subject = 'New Product Announcement';
      
      await sendEmail(subscriber.email, subject, emailBody);
    });


    res.status(201).json({ msg: "Product and Images created successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};
