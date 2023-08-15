import ProductImage from "../models/ProductImageModel.js";
import path from "path";
import Products from "../models/ProductModel.js";
import fs from "fs";
import { Sequelize } from "sequelize";

export const getProductImage = async (req, res) => {
  try {
    const response = await ProductImage.findAll({
      where: {
        Active: true,
        Deleted: false,
      },
      include: {
        model: Products,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getProductImageById = async (req, res) => {
  try {
    const response = await ProductImage.findOne({
      where: {
        uuid: req.params.id,
        Active: true,
        Deleted: false,
      },
      include: {
        model: Products,
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

export const createProductImage = async (req, res) => {
  try {
    const CreatedBy = req.user.name;
    const userId = req.user.id;
    const {
      productImageOne,
      productImageTwo,
      productImageThree,
      productImageFour,
      productImageFive,
      productImageSix,
    } = req.files;
    const ProductId = req.body.ProductId;
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

    const businessLogo = await uploadFile(productImageOne);
    const productImageTwoUrl = await uploadFile(productImageTwo);
    const productImageThreeUrl = await uploadFile(productImageThree);
    const productImageFourUrl = await uploadFile(productImageFour);
    const productImageFiveUrl = await uploadFile(productImageFive);
    const productImageSixUrl = await uploadFile(productImageSix);

    try {
      await ProductImage.create({
        userId: req.user.id,
        businessLogo: businessLogo,
        productImageOne: await uploadFile(productImageOne), // Use the function directly here
        productImageTwo: productImageTwoUrl,
        productImageThree: productImageThreeUrl,
        productImageFour: productImageFourUrl,
        productImageFive: productImageFiveUrl,
        productImageSix: productImageSixUrl,
        CreatedBy: CreatedBy,
        ProductId: ProductId,
      });

      res.status(201).json({ msg: "Product Images created successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Server error" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateProductImage = async (req, res) => {
  try {
    const UpdatedBy = req.user.name;
    const userId = req.user.id;
    const {
      productImageOne,
      productImageTwo,
      productImageThree,
      productImageFour,
      productImageFive,
      productImageSix,
    } = req.files;
    const ProductId = req.body.ProductId;
    const updatedBy = req.user.updatedBy;
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

    const updatedProductImages = {
      productImageOne: await uploadFile(productImageOne),
      productImageTwo: await uploadFile(productImageTwo),
      productImageThree: await uploadFile(productImageThree),
      productImageFour: await uploadFile(productImageFour),
      productImageFive: await uploadFile(productImageFive),
      productImageSix: await uploadFile(productImageSix),
      UpdatedBy: UpdatedBy,
      ProductId: ProductId,
      DateUpdated: Sequelize.literal("CURRENT_TIMESTAMP"),
    };

    try {
      const updatedProductImage = await ProductImage.update(
        updatedProductImages,
        {
          where: {
            userId: req.user.id,
            Active: true,
            Deleted: false,
          },
        }
      );
      if (!updatedProductImage) {
        return res.status(404).json({ msg: "Product not found" });
      }
      res.status(200).json({ msg: "Product Images updated successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Server error" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};


