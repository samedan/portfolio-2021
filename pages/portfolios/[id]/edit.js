import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useRouter } from "next/router";
import withAuth from "@/hoc/withAuth";
import PortfolioForm from "@/components/PortfolioForm";
import { useGetPortfolio } from "@/actions/portfolios";
import { Row, Col } from "reactstrap";
import { useUpdatePortfolio } from "@/actions/portfolios";
import { toast } from "react-toastify";

const PortfolioEdit = ({ user }) => {
  const router = useRouter();
  const [updatePortfolio, { error }] = useUpdatePortfolio();
  const { data: initialData } = useGetPortfolio(router.query.id);

  // combines function with id
  const _updatePortfolio = async (data) => {
    try {
      await updatePortfolio(router.query.id, data);
      toast.success("Portfolio has been updated", { autoClose: 3000 });
    } catch (error) {
      toast.error("Edit failed", { autoClose: 3000 });
    }

    // PROMISE
    // updatePortfolio(router.query.id, data)
    //   .then(() =>
    //     toast.success("Portfolio has been updated", { autoClose: 3000 })
    //   )
    //   .catch(() => toast.error("Some error", { autoClose: 3000 }));
  };

  return (
    <>
      <BaseLayout user={user} loading={false}>
        <BasePage header="Edit Portfolio">
          <Row>
            <Col md="8">
              {initialData && (
                <PortfolioForm
                  onSubmit={_updatePortfolio}
                  initialData={initialData}
                />
              )}
              {error && <div className="alert alert-danger mt-2">{error}</div>}
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    </>
  );
};

export default withAuth(PortfolioEdit)("admin");
