import React from "react";
import config from "../../config/index.json";

const Footer = () => {
  const { section1 } = config.footer;
  const { section2 } = config.footer;
  const { section3 } = config.footer;

  return (
    <div className="w-[100%] bg-[#F2C77C] py-10 flex row justify-around mt-20">
      <div className="flex flex-col">
        {section1.map((section, i) => {
          if (i === 0) {
            return (
              <p key={i} className="font-bold">
                {section}
              </p>
            );
          }

          return <p key={i}>{section}</p>;
        })}
      </div>
      <div className="flex flex-col">
        {section2.map((section, i) => {
          if (i === 0) {
            return (
              <p key={i} className="font-bold text-center">
                {section}
              </p>
            );
          }

          return (
            <p key={i} className=" text-center">
              {section}
            </p>
          );
        })}
      </div>
      <div className="flex flex-col">
        {section3.map((section, i) => {
          if (i === 0) {
            return (
              <p key={i} className="font-bold text-right">
                {section}
              </p>
            );
          }

          return (
            <p key={i} className="text-right">
              {section}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
