import BaseLayout from "@/components/layouts/BaseLayout";
import { useState } from "react";
import { Row, Col, Button } from "reactstrap";
import BasePage from "@/components/BasePage";
import { useRouter } from "next/router";
import { useGetUser } from "@/actions/user";
import { useDeletePortfolio } from "@/actions/portfolios";
import PortfolioApi from "@/lib/api/portfolios";
import PortfolioCard from "@/components/PortfolioCard";
import { isAuthorized } from "@/utils/auth0";

const Portfolios = ({ portfolios: initialPortfoliosFromProps }) => {
  const { data: dataU, loading: loadingU } = useGetUser();
  const [deletePortfolio, { data, error }] = useDeletePortfolio();
  const router = useRouter();
  const [portfolios, setPortfolios] = useState(initialPortfoliosFromProps);

  const _deletePortfolio = async (e, portfolioId) => {
    e.stopPropagation();
    // confirm is native to browsers (yes= true)
    const isConfirm = confirm(
      "Are you sure you want to delete this portfolio?"
    );
    if (isConfirm) {
      await deletePortfolio(portfolioId);
    }

    //check if the deleted portfolio is in the list
    const newPortfolios = portfolios.filter(
      (portfolio) => portfolio._id !== portfolioId
    );
    setPortfolios(newPortfolios);
  };

  return (
    <BaseLayout user={dataU} loading={loadingU}>
      <BasePage header="Portfolios" className="portfolio-page">
        <Row>
          {portfolios.map((portfolio) => (
            <Col
              key={portfolio._id}
              onClick={() => {
                router.push("/portfolios/[id]", `/portfolios/${portfolio._id}`);
              }}
              md="4"
            >
              <PortfolioCard portfolio={portfolio}>
                {dataU && isAuthorized(dataU, "admin") && (
                  <>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          `/portfolios/[id]/edit`,
                          `/portfolios/${portfolio._id}/edit`
                        );
                      }}
                      className="mr-2"
                      color="warning"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={(e) => _deletePortfolio(e, portfolio._id)}
                      color="danger"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </PortfolioCard>
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
