import React from "react";
import Image from "next/image";
import Link from "next/link";
import SmallLogo from "@assets/SmallLogo";
import CodePen from "@assets/codepen.svg";
import Github from "@assets/github.svg";
import Linkedin from "@assets/linkedin.svg";
import Twitter from "@assets/twitter.svg";
import Login from "@assets/icons/login-icon.svg";

function Sidebar() {
  return (
    <div className="container sidebar-wrapper">
      <div className="sidebar fixed">
        <div className="logo">
          <SmallLogo />
        </div>
        <div>
          <div className="ttb">Web developer</div>
        </div>
        <div className="socials">
          <Link
            className="social cursor-hover-item codepen"
            data-cursor-text="CODEPEN"
            data-cursor-text-repeat="4"
            href="https://codepen.io/CroPsychooo"
            rel="noopener noreferrer" target="_blank"
          >
            <Image src={CodePen} alt="codepen" />
          </Link>
          <Link
            className="social cursor-hover-item github"
            data-cursor-text="GITHUB"
            data-cursor-text-repeat="5"
            href="https://github.com/MarkoMalec"
            rel="noopener noreferrer" target="_blank"
          >
            <Image src={Github} alt="github" />
          </Link>
          <Link
            className="social cursor-hover-item twitter"
            data-cursor-text="TWITTER"
            data-cursor-text-repeat="4"
            href="https://twitter.com/Marko7147751283"
            rel="noopener noreferrer" target="_blank"
          >
            <Image src={Twitter} alt="twitter" />
          </Link>
          <Link
            className="social cursor-hover-item linkedin"
            data-cursor-text="LINKEDIN"
            data-cursor-text-repeat="4"
            href="https://www.linkedin.com/in/lecmarko/"
            rel="noopener noreferrer" target="_blank"
          >
            <Image src={Linkedin} alt="linkedin" />
          </Link>
          <Link
            className="social cursor-hover-item login"
            data-cursor-text="LOG IN!"
            data-cursor-text-repeat="5"
            href="/login"
            rel="noopener noreferrer" target="_blank"
          >
            <Image src={Login} alt="Login into an account" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
