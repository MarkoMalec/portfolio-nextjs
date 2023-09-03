import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer id="footer">
      <section className="above-footer">
        <div className="container">
          <div className="contact-block">
            <h2>
              You like what you see?
              <br />
              Send me a message!
            </h2>
            <p>
              'Fortune favors the bold.' If my portfolio sparks interest, make
              the bold move. Send a message, and let's transform ideas into
              achievements.
            </p>
            <Link href="/contact" className="btn">
              message now
            </Link>
          </div>
        </div>
      </section>
      <div className="container bottom">
        <div className="copyright">Copyright © markomalec.com</div>
        <div className="created-by">Created by Marko Malec.</div>
      </div>
    </footer>
  );
};

export default Footer;
