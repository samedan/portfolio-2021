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
  <span className="nav-link port-navbar-link clickable">Login</span>
);
const LogoutLink = () => (
  <span className="nav-link port-navbar-link clickable">Logout</span>
);

const Header = () => {
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
        </Nav>
        <Nav navbar>
          <NavItem className="port-navbar-item">
            <LoginLink />
          </NavItem>
          <NavItem className="port-navbar-item">
            <LogoutLink />
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
