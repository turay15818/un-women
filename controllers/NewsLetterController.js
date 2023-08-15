import Sequelize from "sequelize";
import NewsLetter from "../models/NewsLetterModel.js";

export const getNewsLetter = async (req, res) => {
  try {
    const response = await NewsLetter.findAll({
      where: {
        Active: true,
        Deleted: false,
      },
      
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createNewsLetter = async (req, res) => {
  const {
    email
  } = req.body;
  const CreatedBy = req.user.name;
  try {
    await NewsLetter.create({
      email: email,
    });
    res.status(201).json({ msg: "NewsLetter Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteNewsLetter = async (req, res) => {
  const newsLetter = await NewsLetter.findOne({
    where: {
        uuid: req.params.id,
      Active: true,
      Deleted: false,
    },
  });

  if (!newsLetter) {
    return res.status(404).json({ msg: "News Letter not found" });
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
          id: newsLetter.id,
        },
      }
    );

    res.status(200).json({ msg: "NewsLetter Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

