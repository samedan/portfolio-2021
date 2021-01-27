import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetUser } from "@/actions/user";
import { Row, Col } from "reactstrap";

const Cv = () => {
  const { data, loading } = useGetUser();
  return (
    <>
      <BaseLayout user={data} loading={loading}>
        <BasePage>
          <Row>
            <Col md={{ size: 10, offset: 1 }}>
              <iframe
                style={{ width: "100%", height: "800px" }}
                src="/cv.pdf"
              />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    </>
  );
};

export default Cv;
