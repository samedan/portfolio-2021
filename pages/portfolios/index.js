import BaseLayout from "@/components/layouts/BaseLayout";

import { Row, Col } from "reactstrap";
import BasePage from "@/components/BasePage";
import { useRouter } from "next/router";
import { useGetUser } from "@/actions/user";
import PortfolioApi from "@/lib/api/portfolios";
import PortfolioCard from "@/components/PortfolioCard";

const Portfolios = ({ portfolios }) => {
  const { data: dataU, loading: loadingU } = useGetUser();
  const router = useRouter();

  return (
    <BaseLayout user={dataU} loading={loadingU}>
      <BasePage header="Portfolios" className="portfolio-page">
        <Row>
          {portfolios.map((portfolio) => (
            <Col
              key={portfolio._id}
              onClick={() => {
                router.push("/portfolios[id]", `/portfolios/${portfolio._id}`);
              }}
              md="4"
            >
              <PortfolioCard portfolio={portfolio} />
            </Col>
          ))}
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

// called during build time
// improves performance
export async function getStaticProps() {
  const json = await new PortfolioApi().getAll();
  const portfolios = json.data;
  return {
    props: { portfolios },
  };
}

export default Portfolios;
