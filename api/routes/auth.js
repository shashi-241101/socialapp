import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

//REGISTER
router.post("/register", async (req, res) => {
  try {
    console.log("username :"+ req.body.email);
    const preuser = await User.findOne({ email: req.body.email });
    if(preuser) {
      res.status(201).json(preuser);
      return;
    }
    //generate new password
  else{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    
    //save user and respond

    const user = await newUser.save();
    res.status(200).json(user);
    return;
  }
  } catch (err) {

    res.status(500).json(err)
    return;
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log("user Not found");
      return res.status(404).json("user not found");
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      console.log("wrong password");
      return res.status(400).json("wrong password");
    }

    res.status(202).json(user)
  } catch (err) {
    console.log("Getting this error");
  return res.status(500).json(err);
  }
});

export default router;
