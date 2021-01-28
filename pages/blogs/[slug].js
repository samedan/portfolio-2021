import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetUser } from "@/actions/user";
import BlogApi from "lib/api/blogs";
import { Col, Row } from "reactstrap";
import { SlateView } from "slate-simple-editor";
import Avatar from "components/shared/Avatar";

const BlogDetail = ({ blog, author }) => {
  console.log(blog, author);
  const { data, loading } = useGetUser();

  return (
    <BaseLayout user={data} loading={loading}>
      <BasePage
        title={`${blog.title} - Popescu Daniel`}
        metaDescription={blog.subTitle.substr(0, 160)}
        className="slate-container"
      >
        <Row
          md={{
            // 8 out of 12 columns
            size: 8,
            // padding on left and right of 2 columns
            offset: 2,
          }}
        >
          <Col>
            <Avatar
              name={author.name}
              image={author.picture}
              date={blog.createdAt}
            />
            <hr />
            <SlateView initialContent={blog.content} />
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export async function getStaticPaths() {
  const { data } = await new BlogApi().getAll();
  // const blogs = json.data;
  const paths = data.map(({ blog }) => {
    return {
      params: { slug: blog.slug },
    };
  });
  return {
    paths,
    // 404 error
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const {
    data: { blog, author },
  } = await new BlogApi().getBySlug(params.slug);

  return { props: { blog, author } };
}

export default BlogDetail;
