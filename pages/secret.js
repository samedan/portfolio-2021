import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import withAuth from "../hoc/withAuth";

const Secret = ({ user, loading }) => {
  return (
    <BaseLayout user={user} loading={loading}>
      <BasePage>
        <h1>Secret </h1>
      </BasePage>
    </BaseLayout>
  );
};

// High Order Component - HOC

export default withAuth(Secret);
