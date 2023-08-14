import React from "react";
import Image from "next/image";
import SmallLogo from "@assets/SmallLogo";
import CodePen from "@assets/codepen.svg";
import Github from "@assets/github.svg";
import Linkedin from "@assets/linkedin.svg";
import Twitter from "@assets/twitter.svg";
import Login from "@assets/login.svg";

function Sidebar() {
  return (
    <div className="container sidebar-wrapper">
      <div className="sidebar fixed">
        <div className="logo">
          <SmallLogo isShrunk={true} />
        </div>
        <div>
          <div className="ttb">Web developer</div>
        </div>
        <div className="socials">
          <a
            className="social cursor-hover-item codepen"
            data-cursor-text="CODEPEN"
            data-cursor-text-repeat="4"
          >
            <Image src={CodePen} alt="codepen" />
          </a>
          <div
            className="social cursor-hover-item github"
            data-cursor-text="GITHUB"
            data-cursor-text-repeat="5"
          >
            <Image src={Github} alt="github" />
          </div>
          <div
            className="social cursor-hover-item twitter"
            data-cursor-text="TWITTER"
            data-cursor-text-repeat="4"
          >
            <Image src={Twitter} alt="twitter" />
          </div>
          <div
            className="social cursor-hover-item linkedin"
            data-cursor-text="LINKEDIN"
            data-cursor-text-repeat="4"
          >
            <Image src={Linkedin} alt="linkedin" />
          </div>
          <a
            className="social cursor-hover-item login"
            data-cursor-text="LOG IN!"
            data-cursor-text-repeat="5"
            href="/login"
          >
            <Image src={Login} alt="Login into an account" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
