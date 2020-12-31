// const Index = () => {
//   return (
//     <h1>Index</h1>
//   )
// }

import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import Header from "../components/shared/Header";

class Index extends React.Component {
  render() {
    return (
      <>
        <BaseLayout>
          <h1>Index</h1>
        </BaseLayout>
      </>
    );
  }
}

export default Index;
