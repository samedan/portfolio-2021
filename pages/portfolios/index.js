import BaseLayout from "../../components/layouts/BaseLayout";
import Link from "next/link";
import axios from "axios";
import BasePage from "../../components/BasePage";

const Portfolios = ({ posts }) => {
  const renderPosts = (posts) => {
    return posts.map((post) => (
      <li key={post.id}>
        {/* [id] comes from [id].js */}
        <Link as={`/portfolios/${post.id}`} href="/portfolios/[id]">
          <a>{post.title}</a>
        </Link>
      </li>
    ));
  };

  return (
    <BaseLayout>
      <BasePage>
        <h1>Portfolios</h1>
        <u>{renderPosts(posts)}</u>
      </BasePage>
    </BaseLayout>
  );
};

Portfolios.getInitialProps = async () => {
  let posts = [];
  try {
    const res = await axios.get("http://jsonplaceholder.typicode.com/posts");
    posts = res.data;
  } catch (error) {
    console.log(error);
  }

  return { posts: posts.slice(0, 10) };
};

export default Portfolios;
