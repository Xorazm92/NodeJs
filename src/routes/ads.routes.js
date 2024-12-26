import { Router } from "express";
import { Ads } from "../models/ads.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const ads = await Ads.find();
    res.status(200).send({
      msg: "Sucess",
      data: ads,
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Ads.findByIdAndDelete(req.params.id);
    res.status(200).send({
      msg: "Deleted",
      id: req.params.id,
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
