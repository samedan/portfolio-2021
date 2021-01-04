import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { withAuth } from "@/utils/auth0";

const SecretSSR = ({ user, title }) => {
  // const { data, loading } = useGetUser();

  return (
    <BaseLayout
      // user={data}
      // COming from SSR Auth
      user={user}
      // loading={loading}
      loading={false}
    >
      <BasePage>
        <h1>Secret - Hello {user && user.name}</h1>
        <h2>{title}</h2>
      </BasePage>
    </BaseLayout>
  );
};

// server side async fetchData
const getTitle = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res({ title: "My new Title" });
    }, 500);
  });
};

//SERVER AUTH
export const getServerSideProps = withAuth(async ({ req, res }, user) => {
  const title = await getTitle();
  return title;
});

export default SecretSSR;
