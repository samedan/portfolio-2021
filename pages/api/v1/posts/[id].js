import axios from "axios";
import { json } from "express";

export default async (req, res) => {
  try {
    const axiosRes = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${req.query.id}`
    );
    const post = axiosRes.data;
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(error.status || 400).json({ message: "API error" });
  }
};
