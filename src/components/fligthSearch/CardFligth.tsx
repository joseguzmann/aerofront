import React from "react";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Link from "next/link";
import config from "../../config/index.json";
// import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Image from "next/image";

const CardFligth = () => {
  return (
    <div>
      <div className="my-[25px] ">
        <div className="bg-[#ECECEC] w-[100%] flex row p-1 items-center">
          <div className="mr-5">
            <Image
              src={config.other.imgAirplane}
              width={64}
              height={42}
              alt=""
            />
          </div>

          <p className="mx-5"> CODE ORIGIN</p>
          <Image src={config.other.imgArrow2} width={99} height={13} alt="" />
          <p className="mx-5">CODE DESTINATE</p>
        </div>
      </div>
      <Link href={"/"}>
        <div className="my-[25px] flex row  w-[100%] py-5 cursor-pointer">
          <div className="bg-[#FF7100] w-10 flex row p-5 items-center"></div>
          <div className="flex row px-[11rem] justify-between py-[15px] bg-[#FFF8E1] w-[100%]">
            <div className="flex row  ">
              <div className="flex flex-col mx-9">
                <p>Fri, 17 May 2022</p>
                <p>Prague</p>
                <p>LKPR</p>
                <p className="text-4xl font-bold">18:10</p>
              </div>
              <div className="flex flex-col justify-center items-center ">
                <p>2h 5m</p>
                <Image
                  src={config.other.imgArrow}
                  width={310}
                  height={28}
                  alt=""
                />
              </div>
              <div className="flex flex-col mx-9">
                <p>Fri, 17 May 2022</p>
                <p>Prague</p>
                <p>LKPR</p>
                <p className="text-4xl font-bold">20:15</p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="text-2xl  font-bold text-[#FF7100] underline">
                $100
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardFligth;
