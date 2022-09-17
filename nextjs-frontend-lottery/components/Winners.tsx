import React from "react";
import { winners } from "../data/game";
import CardWinner from "./cards/CardWinner";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper";
import "swiper/css";
import { GoChevronRight } from "react-icons/go";
const Winners = () => {
  return (
    <div className=" grid gap-2 w-[90%] mx-auto sm:w-full overflow-hidden">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Recent Winners</h1>
        <p className="rounded-full border-solid border-2 px-3 p-1 cursor-pointer hover:brightness-95 dark:hover:brightness-125 bg-gray-200 dark:bg-slate-800 flex space-x-1 items-center">
          <span>ALL</span>
          <GoChevronRight size={14} />
        </p>
      </div>
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          900: {
            slidesPerView: 4,
          },
        }}
        spaceBetween={5}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
      >
        {winners.map((winner, _) => (
          <SwiperSlide key={_}>
            <CardWinner winner={winner} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Winners;
