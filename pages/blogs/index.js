import React from "react";
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import Masthead from "components/shared/Masthead";
import { Row, Col } from "reactstrap";
import { useGetUser } from "@/actions/user";

import BlogApi from "lib/api/blogs";
import BlogItem from "components/BlogItem";

const Blogs = ({ blogs }) => {
  const { data, loading } = useGetUser();

  return (
    <BaseLayout
      navClass="transparent"
      className="blog-listing-page"
      user={data}
      loading={loading}
    >
      <Masthead imagePath="/images/home-bg.jpg">
        <h1>Fresh Blogs</h1>
        <span className="subheading">Programming, travelling...</span>
      </Masthead>

      <BasePage title="Newest Blogs - Popescu Daniel" className="blog-body">
        <Row>
          {blogs.map((blog) => (
            <Col md="10" lg="8" className="mx-auto" key={blog._id}>
              <BlogItem blog={blog} />
              <hr></hr>
            </Col>
          ))}
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export async function getStaticProps() {
  const { data } = await new BlogApi().getAll();
  const blogs = data.map((item) => ({ ...item.blog, author: item.author }));
  return {
    props: { blogs },
    // we will attempt to re-generate the page:
    // - when a request comes in
    // - at most once every 60 seconds
    revalidate: 60,
  };
}

export default Blogs;
