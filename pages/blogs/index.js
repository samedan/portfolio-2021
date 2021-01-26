import React from "react";
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import Masthead from "components/shared/masthead";
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

      <BasePage className="blog-body">
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
  const json = await new BlogApi().getAll();
  console.log(json);
  return {
    props: { blogs: json.data },
    // we will attempt to re-generate the page:
    // - when a request comes in
    // - at most once every 60 seconds
    revalidate: 60,
  };
}

export default Blogs;
