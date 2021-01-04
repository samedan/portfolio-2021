import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
import Link from "next/link";

const BsNavLink = (props) => {
  const { title, href } = props;
  return (
    <Link href={href}>
      <a className="nav-link port-navbar-link">{title}</a>
    </Link>
  );
};

const BsNavBrand = () => (
  <Link href="/">
    <a className="navbar-brand port-navbar-brand">Popescu Daniel</a>
  </Link>
);

const LoginLink = () => (
  <a className="nav-link port-navbar-link" href="/api/v1/login">
    Login
  </a>
);
{
  /* <BsNavLink href="/api/v1/login" title="Login" />; */
}
const LogoutLink = () => (
  <a className="nav-link port-navbar-link" href="/api/v1/logout">
    Logout
  </a>
);

const Header = ({ user, loading }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar
      className="port-navbar port-default absolute"
      color="transparent"
      dark
      expand="md"
    >
      <BsNavBrand href="/"></BsNavBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem className="port-navbar-item">
            <Link href="/">
              <BsNavLink title="Home" href="/" />
            </Link>
          </NavItem>
          <NavItem className="port-navbar-item">
            <BsNavLink title="About" href="/about" />
          </NavItem>
          <NavItem>
            <BsNavLink title="Portfolios" href="/portfolios" />
          </NavItem>
          <NavItem className="port-navbar-item">
            <BsNavLink title="Blogs" href="/blogs" />
          </NavItem>
          <NavItem className="port-navbar-item">
            <BsNavLink title="CV" href="/cv" />
          </NavItem>
          <NavItem className="port-navbar-item">
            <BsNavLink title="Secret" href="/secret" />
          </NavItem>
          <NavItem className="port-navbar-item">
            <BsNavLink title="SecretSSR" href="/secret_ssr" />
          </NavItem>
          <NavItem className="port-navbar-item">
            <BsNavLink title="Admin" href="/onlyadmin" />
          </NavItem>
        </Nav>

        <Nav navbar>
          {!loading && (
            <>
              {user && (
                <NavItem className="port-navbar-item">
                  <LogoutLink />
                </NavItem>
              )}
              {!user && (
                <NavItem className="port-navbar-item">
                  <LoginLink />
                </NavItem>
              )}
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
