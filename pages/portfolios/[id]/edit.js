import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useRouter } from "next/router";
import withAuth from "@/hoc/withAuth";
import PortfolioForm from "@/components/PortfolioForm";
import { useGetPortfolio } from "@/actions/portfolios";
import { Row, Col } from "reactstrap";

const PortfolioEdit = ({ user }) => {
  const router = useRouter();
  const { data } = useGetPortfolio(router.query.id);

  return (
    <>
      <BaseLayout user={user} loading={false}>
        <BasePage header="Edit Portfolio">
          <Row>
            <Col md="8">
              {data && (
                <PortfolioForm
                  onSubmit={(data) => alert(JSON.stringify(data))}
                  initialData={data}
                />
              )}
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    </>
  );
};

export default withAuth(PortfolioEdit)("admin");
