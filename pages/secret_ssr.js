import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
// import { useGetUser } from "@/actions/user";
import { authorizeUser } from "@/utils/auth0";

const SecretSSR = ({ user }) => {
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
      </BasePage>
    </BaseLayout>
  );
};

//SERVER AUTH
export const getServerSideProps = async ({ req, res }) => {
  const user = await authorizeUser(req, res);

  return {
    props: { user },
  };

  // const session = await auth0.getSession(req);
  // if (!session || !session.user) {
  //   // 302 redirect
  //   res.writeHead(302, {
  //     Location: "/api/v1/login",
  //   });
  //   res.end();
  //   return { props: {} };
  // }

  // console.log(session.user); // on server console
  // debugger; // not executed because server-side
  // return {
  //   // props provided to the page to display
  //   props: { user: session.user },
};

export default SecretSSR;
