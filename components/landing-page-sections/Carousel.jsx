"use client";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const slides = [
  "https://i.pinimg.com/564x/8e/c9/a0/8ec9a069104a29a8657d43e6673d0210.jpg",
  "https://i.pinimg.com/564x/dd/63/c3/dd63c38f4f374739dd9d80a4257916f7.jpg",
  "https://th.bing.com/th?id=OIF.UOm2eXuPha%2bG%2f6y6U3U6PQ&pid=ImgDet&rs=1",
];

const Carousel = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide>
        <img
          src="https://images.hdqwalls.com/download/spiderman-into-the-spiderverse-15k-yg-1920x1200.jpg"
          alt="img1"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://www.hdwallpapers.in/download/miles_morales_2-HD.jpg"
          alt="img2"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://images.hdqwalls.com/wallpapers/gwen-stacy-4k-artwork-mq.jpg"
          alt="img3"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
