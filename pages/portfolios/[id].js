import axios from "axios";
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetPostById } from "@/actions";
import { useRouter } from "next/router";
import { useGetUser } from "@/actions/user";

const Portfolio = () => {
  const { data: dataU, loading: loadingU } = useGetUser();
  const router = useRouter();
  const { data: portfolio, error, loading } = useGetPostById(router.query.id);

  return (
    <>
      <BaseLayout user={dataU} loading={loadingU}>
        <BasePage>
          {loading && <p> Loading data...</p>}
          {error && <div className="alert alert-danger">{error.message}</div>}
          {portfolio && (
            <>
              <h1>TITLE: {portfolio.title}</h1>
              <p>BODY: {portfolio.body}</p>
              <p>ID: {portfolio.id}</p>
            </>
          )}
        </BasePage>
      </BaseLayout>
    </>
  );
};

export default Portfolio;
