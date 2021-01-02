import axios from "axios";
import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";

class Portfolio extends React.Component {
  static async getInitialProps({ query }) {
    let post = {};
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${query.id}`
      );
      post = res.data;
    } catch (error) {
      console.log(error);
    }

    return { portfolio: post };
  }

  render() {
    const { portfolio } = this.props;

    return (
      <>
        <BaseLayout>
          <h1>TITLE: {portfolio.title}</h1>
          <p>BODY: {portfolio.body}</p>
          <p>ID: {portfolio.id}</p>
        </BaseLayout>
      </>
    );
  }
}

export default Portfolio;
