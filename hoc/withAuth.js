import { Component } from "react";

import { useGetUser } from "@/actions/user";
import { isAuthorized } from "@/utils/auth0";
import Redirect from "@/components/shared/Redirect";

// export default withAuth(OnlyAdmin)("Admin");
const withAuth = (Component) => (role) => {
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
      if (role && !isAuthorized(data, role)) {
        return <Redirect ssr to="/api/v1/login" />;
      }
      return <Component user={data} loading={loading} {...props} />;
    }
  };
};

export default withAuth;
