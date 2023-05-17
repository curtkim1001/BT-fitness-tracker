import express from "express";
import { ValidationError } from "objection";
import uploadImage from "../../../services/uploadImage.js";
import { User } from "../../../models/index.js";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, firstName, lastName, password });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(422).json({ errors: error });
  }
});

usersRouter.get("/image", async (req, res) => {
  try {
    const userToReturn = await User.query().findById(req.user.id);
    return res.status(200).json({ photo: userToReturn.imageUrl });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ errors: error });
  }
});

usersRouter.post("/image", uploadImage.single("image"), async (req, res) => {
  try {
    const { body } = req;
    const data = {
      ...body,
      image: req.file.location,
    };
    const user = await User.query().findById(req.user.id);
    await user.$query().patch({ imageUrl: req.file.location });
    return res.status(201).json({ photo: user.imageUrl });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default usersRouter;