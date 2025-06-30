import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-auto flex flex-row items-center justify-center gap-2 px-4 pt-16 text-center">
      <small className="block text-base">
        © {new Date().getFullYear()} Scheff
      </small>
      <a
        href="https://github.com/scheffchuk"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub size={20} />
      </a>
    </footer>
  );
};

export default Footer;
