import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetUser } from "@/actions/user";
import BlogApi from "lib/api/blogs";
import { Col, Row } from "reactstrap";
import { SlateView } from "slate-simple-editor";

const BlogDetail = ({ blog }) => {
  console.log(blog);
  const { data, loading } = useGetUser();

  return (
    <BaseLayout user={data} loading={loading}>
      <BasePage className="slate-container">
        <Row
          md={{
            // 8 out of 12 columns
            size: 8,
            // padding on left and right of 2 columns
            offset: 2,
          }}
        >
          <Col>
            <SlateView initialContent={blog.content} />
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export async function getStaticPaths() {
  const json = await new BlogApi().getAll();
  const blogs = json.data;
  const paths = blogs.map((b) => {
    return {
      params: { slug: b.slug },
    };
  });
  return {
    paths,
    // 404 error
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const json = await new BlogApi().getBySlug(params.slug);
  return { props: { blog: json.data } };
}

export default BlogDetail;
