import { Component } from "react";

import { useGetUser } from "@/actions/user";
import Redirect from "@/components/shared/Redirect";

const withAuth = (Component) => {
  return (props) => {
    const { data, loading } = useGetUser();

    if (loading) {
      return <p>Loading...</p>;
    }

    if (
      !data &&
      // when in a browser (not server)
      typeof window !== "undefined"
    ) {
      // TODO improve return
      // SSR - server side rendering
      return <Redirect ssr to="/api/v1/login" />;
    } else {
      return <Component user={data} loading={loading} {...props} />;
    }
  };
};

export default withAuth;
