import React from "react";
import { CIcon } from "@/components/icons/Icons";
import { version } from "@package";
const Footer = () => {
  return (
    <footer className="py-4 text-sm text-gray-700 flex justify-between items-center">
      <div className="italic">Yana Anatska</div>
      Version: {version}
      <div className="flex gap-1 items-center">
        <CIcon /> Kyiv, 2024
      </div>

    </footer>
  );
};

export default Footer;
