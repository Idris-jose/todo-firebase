import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
   const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };
  return (
   <div className="slider-container">
  <Slider {...settings}>
    {[1, 2, 3, 4, 5, 6,7,8].map(num => (
      <div key={num} className="px-3"> 
        <div
          className="
            bg-black 
            p-20
            h-36 
            flex 
            items-center 
            justify-center 
            text-3xl 
            font-semibold 
            text-green-500 
            shadow-md 
            transition 
            duration-300 
            hover:-translate-y-2 
            hover:shadow-xl
          "
        >
          {num}
        </div>
      </div>
    ))}
  </Slider>
</div>

  );
}