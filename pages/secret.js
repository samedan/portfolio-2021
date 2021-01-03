import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetUser } from "@/actions/user";
import { useRouter } from "next/router";

const Secret = () => {
  const { data, loading } = useGetUser();
  const router = useRouter();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (
    !data &&
    // when in a browser (not server)
    typeof window !== "undefined"
  ) {
    // TODO improve return
    router.push("/api/v1/login");
    return null;
  } else {
    return (
      <BaseLayout user={data} loading={loading}>
        <BasePage>
          <h1>Secret</h1>
        </BasePage>
      </BaseLayout>
    );
  }
};

export default Secret;
