import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { Editor } from "slate-simple-editor";
import withAuth from "@/hoc/withAuth";

const BlogEditor = ({ user, loading }) => {
  const saveBlog = () => {
    console.log(data);
  };
  return (
    <BaseLayout user={user} loading={loading}>
      <BasePage>
        <Editor
          // header="Ypour own title"
          // loading={true}
          onSave={(data) => {
            console.log(data);
          }}
        />
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(BlogEditor)("admin");
