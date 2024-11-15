import { logger } from "../utils/logger";

export const addSocial = async (req, res) => {
    try {
      const { error, value } = socialValidation(req.body);
  
      if (error) {
        return res.status(400).send({ message: error.message });
      }
  
      const { social_name, social_icon_file } = value;
      const social = await Social.findOne({
        social_name: { $regex: social_name, $options: "i" },
      });
  
      if (social) {
        return res.status(400).send({ message: "Bunday social_name mavjud" });
      }
  
      const newsocial = await Social.create({
        social_name,
        social_icon_file,
      });
  
      res.status(201).send({ message: "Yangi social_name qo'shildi", newsocial });
    } catch (error) {
      logger.error(error);
    }
  };
  
  export const getSocials = async (req, res) => {
    try {
      const socials = await Social.find();
      res.send(socials);
    } catch (error) {
      logger.error(error);
    }
  };
  
  export const updateSocial = async (req, res) => {
    try {
      const { id } = req.params;
      const { social_name, social_icon_file } = req.body;
  
      const updatedSocial = await Social.findByIdAndUpdate(
        id,
        { social_name, social_icon_file },
        { new: true }
      );
  
      res.status(200).send({ message: "social_name updated successfully", updatedSocial });
    } catch (error) {
     logger.error(error)
    }
  };
  
  export const deleteSocial = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedSocial = await Social.findByIdAndDelete(id);
  
      res.status(200).send({ message: "social_name deleted successfully", deletedSocial });
    } catch (error) {
      logger.error(error)
    }
  };
  
  export const getSocialById = async (req, res) => {
    try {
      const { id } = req.params;
      const social = await Social.findById(id);
  
      if (!social) {
        return res.status(404).send({ message: "social_name mavjud emas" });
      }
  
      res.send(social);
    } catch (error) {
     logger.error(error)
    }
  };
  