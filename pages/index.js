import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import { Container } from "reactstrap";

class Index extends React.Component {
  render() {
    return (
      <>
        <BaseLayout>
          <Container>
            <h1>Index</h1>
          </Container>
        </BaseLayout>
      </>
    );
  }
}

export default Index;
