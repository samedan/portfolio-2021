import React, { Children } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

{
  /* 
  // 
  <Link href={href}> // href = ...props
      // <a ... = children
      <a className={`nav-link port-navbar-link ${className}`}>{title}</a>
    </Link> */
}

const ActiveLink = ({ children, ...props }) => {
  const router = useRouter();
  // only one root element into a children
  const child = Children.only(children);
  // extract className from '<a className=""...'
  let className = child.props.className || "";

  if (router.asPath === props.href && props.activeClassName) {
    className = `${className} ${props.activeClassName}`;
  }

  delete props.activeClassName;

  // className is provided to the <a> element
  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default ActiveLink;
