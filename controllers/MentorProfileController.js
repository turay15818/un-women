import MentorProfile from "../models/MentorProfileModel.js";
import Users from "../models/UserModel.js";
import Sequelize from "sequelize";

export const getMentorProfile = async (req, res) => {
  try {
    const response = await MentorProfile.findAll({
      where: {
        Active: true,
        Deleted: false,
      },
      include: {
        model: Users,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getMentorProfileById = async (req, res) => {
  try {
    const response = await MentorProfile.findOne({
      where: {
        uuid: req.params.id,
        Active: true,
        Deleted: false,
      },
      include: {
        model: Users,
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

export const createMentorProfile = async (req, res) => {
  const {
    description,
    skills,
    experience,
    education,
    languages,
    availability,
    linkedinProfile,
    website,
    noOfMentee,
    rating,
  } = req.body;
  const CreatedBy = req.user.name;
  try {
    await MentorProfile.create({
      description: description,
      skills: skills,
      experience: experience,
      education: education,
      languages: languages,
      availability: availability,
      linkedinProfile: linkedinProfile,
      website: website,
      noOfMentee: noOfMentee,
      rating: rating,
      userId: req.userId,
      CreatedBy: CreatedBy,
    });
    res.status(201).json({ msg: "Mentor Profile Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateMentorProfile = async (req, res) => {
  const {
    description,
    skills,
    experience,
    education,
    languages,
    availability,
    linkedinProfile,
    website,
    noOfMentee,
    rating,
  } = req.body;

  try {
    const mentorProfile = await MentorProfile.findOne({
      where: {
        userId: req.user.id,
        Active: true,
        Deleted: false,
      },
    });
    const UpdatedBy = req.user.name;

    if (!mentorProfile) {
      return res.status(404).json({ msg: "Mentor Profile not found" });
    }
    mentorProfile.description = description;
    mentorProfile.skills = skills;
    mentorProfile.experience = experience;
    mentorProfile.education = education;
    mentorProfile.languages = languages;
    mentorProfile.availability = availability;
    mentorProfile.linkedinProfile = linkedinProfile;
    mentorProfile.website = website;
    mentorProfile.noOfMentee = noOfMentee;
    mentorProfile.rating = rating;
    mentorProfile.UpdatedBy = UpdatedBy;
    mentorProfile.DateUpdated = Sequelize.literal("CURRENT_TIMESTAMP");

    await mentorProfile.save();

    res.status(200).json({ msg: "Mentor Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
  console.log(req.user);
};

export const deleteMentorProfile = async (req, res) => {
  const mentorProfile = await MentorProfile.findOne({
    where: {
      userId: req.user.id,
      Active: true,
      Deleted: false,
    },
  });

  if (!mentorProfile) {
    return res.status(404).json({ msg: "User not found" });
  }
  const DeletedReason = req.body.DeletedReason;
  const DeletedBy = req.user.name;

  try {
    await MentorProfile.update(
      {
        Active: false,
        Deleted: true,
        DateDeleted: Sequelize.literal("CURRENT_TIMESTAMP"),
        DeletedReason: DeletedReason,
        DeletedBy: DeletedBy,
      },
      {
        where: {
          id: mentorProfile.id,
        },
      }
    );
    res.status(200).json({ msg: "Mentor Profile Profile Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
