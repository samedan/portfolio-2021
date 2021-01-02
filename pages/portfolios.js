import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
// import Link from "next/link";
import { Link } from "../routes";
import axios from "axios";

class Portfolios extends React.Component {
  static async getInitialProps() {
    let posts = [];
    try {
      const res = await axios.get("http://jsonplaceholder.typicode.com/posts");
      posts = res.data;
    } catch (error) {
      console.log(error);
    }

    return { posts: posts.slice(0, 10) };
  }

  renderPosts(posts) {
    return posts.map((post) => (
      <li key={post.id}>
        {/* [id] comes from [id].js */}
        <Link route={`/portfolios/${post.id}`}>
          <a>{post.title}</a>
        </Link>
      </li>
    ));
  }

  render() {
    const { posts } = this.props;
    return (
      <BaseLayout>
        <h1>Portfolios</h1>
        <u>{this.renderPosts(posts)}</u>
      </BaseLayout>
    );
  }
}

export default Portfolios;
