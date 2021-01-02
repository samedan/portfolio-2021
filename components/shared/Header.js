import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Link from "next/link";

const BsNavLink = (props) => {
  const { title, href } = props;
  return (
    <Link href={href}>
      <a className="nav-link port-navbar-link">{title}</a>
    </Link>
  );
};

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
      <NavbarBrand href="/">
        <Link href="/">
          <a className="port-navbar-brand">Popescu Daniel</a>
        </Link>
      </NavbarBrand>
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
      </Collapse>
    </Navbar>
  );
};

export default Header;
