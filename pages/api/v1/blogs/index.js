import BlogApi from "@/lib/api/blogs";
import auth0 from "@/utils/auth0";

export default async function createBlog(req, res) {
  try {
    const { accessToken } = await auth0.getSession(req);

    const json = await new BlogApi(accessToken).create(req.body);

    return res.json(json.data);
  } catch (error) {
    console.log("Error here");
    return res.status(error.status || 422).json(error.response.data);
  }
}
