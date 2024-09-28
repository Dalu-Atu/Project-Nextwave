import React from "react";
import styled from "styled-components";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLocationArrow,
} from "react-icons/fa";
import Logo from "./Logo";
import { FaLocationPin } from "react-icons/fa6";
import { IoMdMailUnread } from "react-icons/io";
import { PiPhone } from "react-icons/pi";
import { MdOutlineLocalPhone } from "react-icons/md";

const FooterContainer = styled.footer`
  background-color: #1a1a1a;
  color: #fff;
  padding: 2rem 2rem;
  text-align: center;
  z-index: 1;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: auto;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
  overflow: hidden;
`;

const FooterSection = styled.div`
  margin: 2rem 0;
  min-width: 20rem;
  color: lightgray;

  @media (min-width: 768px) {
    margin: 2rem;
  }
  .input,
  button {
    height: 3rem;
    padding: 0 1rem;
    border-radius: var(--border-radius-sm);
    margin-top: 1rem;
  }
  button {
    margin-left: 1rem;
    background: var(--secondary-color);
    color: white;
    border: none;
  }
`;

const SocialIcons = styled.div`
  margin-top: 1rem;

  a {
    color: #fff;
    margin: 0 0.5rem;
    font-size: 1.5rem;
    transition: color 0.3s;
  }
`;

const FooterCopy = styled.div`
  margin-top: 2rem;
  font-size: 0.9rem;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;
const Contact = styled.div`
  margin: 1rem;
  display: flex;

  align-items: center;
  .icon {
    position: relative;
    left: -0.5rem;
    color: #00aa6c;
    top: 0.4rem;
  }
  .contact-text {
    text-align: left;
    line-height: 1.5rem;
    color: lightgray;
  }
`;
const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <Contact>
            <span>
              <FaLocationPin className="icon" size={"20px"} />
            </span>
            <span className="contact-text">
              8538 London Street <br />
              Carlifonia Gates
            </span>
          </Contact>
          <Contact>
            <span>
              <IoMdMailUnread className="icon" size={"20px"} />
            </span>
            <span className="contact-text">reachus@Nextave.com</span>
          </Contact>
          <Contact>
            <span className="contact-text">
              <MdOutlineLocalPhone className="icon" size={"20px"} />
            </span>
            <span>+19494937673</span>
          </Contact>
        </FooterSection>

        <FooterSection>
          <h4>Follow Us</h4>
          <SocialIcons>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
          </SocialIcons>
          <p>
            <b>Follow Us</b> <br />
            Join us for the latest updates, special offers, and exclusive
            content.
          </p>
        </FooterSection>

        <FooterSection>
          <h4>Join our Newsletter</h4>
          <input className="input" type="text" placeholder="Enter Your Email" />
          <button className="subscribe-btn">Subscribe</button>
        </FooterSection>
      </FooterContent>

      <FooterCopy>&copy; 2024 NextWave. All Rights Reserved.</FooterCopy>
    </FooterContainer>
  );
};

export default Footer;
