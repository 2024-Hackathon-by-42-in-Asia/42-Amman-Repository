"use client";

import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="tw-bg-dark tw-text-light tw-text-center tw-text-lg-start">
      <div className="tw-container tw-p-4">
        <div className="tw-flex tw-flex-wrap tw-justify-center">
          <div className="tw-w-full md:tw-w-1/12 tw-mb-4 tw-mt-3 tw-flex tw-justify-center tw-items-center">
            <img src="https://www.42network.org/wp-content/uploads/2024/04/42.svg" alt="Logo" className="tw-h-auto" />
          </div>
          <div className="tw-w-full md:tw-w-1/3 tw-mb-4 tw-mt-3">
            <h5 className="tw-text-uppercase tw-mb-4 tw-font-bold" style={{ color: "#a68469" }}>
              Address
            </h5>
            <p>Prs. Basmah St., Amman, Jordan</p>
          </div>
          <div className="tw-w-full md:tw-w-1/4 tw-mb-4 tw-mt-3">
            <h5 className="tw-text-uppercase tw-mb-4 tw-font-bold" style={{ color: "#a68469" }}>
              Contact
            </h5>
            <p>Email: pedago@42amman.com</p>
            <p>Phone: +962 7 7848 4242</p>
          </div>
          <div className="tw-w-full md:tw-w-1/5 tw-mb-4 tw-mt-3">
            <h5 className="tw-text-uppercase tw-mb-4 tw-font-bold" style={{ color: "#a68469" }}>
              Follow Us
            </h5>
            <a
              href="https://web.facebook.com/42Amman"
              className="tw-inline-block tw-m-1 tw-border tw-border-solid tw-border-[#a68469] tw-px-4 tw-py-2 tw-text-[#a68469] tw-no-underline tw-cursor-pointer hover:tw-bg-[#a68469] hover:tw-text-[white] tw-rounded"
              role="button"
              target='_blank'
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com/42Amman"
              className="tw-inline-block tw-m-1 tw-border tw-border-solid tw-border-[#a68469] tw-px-4 tw-py-2 tw-text-[#a68469] tw-no-underline tw-cursor-pointer hover:tw-bg-[#a68469] hover:tw-text-[white] tw-rounded"
              role="button"
              target='_blank'
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/42amman"
              className="tw-inline-block tw-m-1 tw-border tw-border-solid tw-border-[#a68469] tw-px-4 tw-py-2 tw-text-[#a68469] tw-no-underline tw-cursor-pointer hover:tw-bg-[#a68469] hover:tw-text-[white] tw-rounded"
              role="button"
              target='_blank'
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
      <div className="tw-text-center tw-p-3" style={{ backgroundColor: '#a68469', color: "white" }}>
        &copy; 2024 42Amman Team. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
