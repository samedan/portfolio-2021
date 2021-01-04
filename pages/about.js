import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetUser } from "@/actions/user";

const About = () => {
  const { data, loading } = useGetUser();

  return (
    <BaseLayout user={data} loading={loading}>
      <BasePage>
        <h1>About</h1>
      </BasePage>
    </BaseLayout>
  );
};

export default About;
