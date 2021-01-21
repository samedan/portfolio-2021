import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { Editor } from "slate-simple-editor";
import { useCreateBlog } from "actions/blogs";
import withAuth from "@/hoc/withAuth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const BlogEditor = ({ user, loading }) => {
  const router = useRouter();

  const [
    createBlog,
    { data: createdBlog, error, loading: blogLoading },
  ] = useCreateBlog();

  const saveBlog = async (data) => {
    const createdBlog = await createBlog(data);
    router.push("/blogs/editor/[id]", `/blogs/editor/${createdBlog._id}`);
  };

  if (error) {
    // toast.error(error.message);
    toast.error("Error saving blog");
  }
  return (
    <BaseLayout user={user} loading={loading}>
      <BasePage>
        <Editor
          // header="Ypour own title"
          loading={blogLoading}
          onSave={saveBlog}
        />
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(BlogEditor)("admin");
