import React from "react";
import Link from "next/link";

class Header extends React.Component {
  render() {
    return (
      <>
        <p className="customClass">Styled P</p>
        <p className="customClassFromFile">Styled P 2</p>
        <Link href="/">
          <a style={{ fontSize: "30px" }}> Home </a>
        </Link>
        <Link href="/about">
          <a> About </a>
        </Link>
        <Link href="/portfolios">
          <a> Portfolios </a>
        </Link>
        <Link href="/cv">
          <a> CV </a>
        </Link>
        <Link href="/blogs">
          <a> Blogs </a>
        </Link>
        <style jsx>
          {`
            .customClass {
              color: red;
            }
          `}
        </style>
      </>
    );
  }
}

export default Header;
