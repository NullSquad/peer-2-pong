import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, EffectCoverflow } from "swiper/modules";
import { Children } from "react";
import "swiper/css";

export const Slider = ({ children, setCompetition }) => {
  const count = Children.count(children);
  return (
    <article className="w-full bg-blue py-4 sm:py-6 md:py-8 px-2 sm:px-4 md:px-8">
      <Swiper
        modules={[EffectCoverflow, EffectCards]}
        loopFillGroupWithBlank={true}
        cardsEffect={{
          rotate: 10,
          stretch: 100,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        effect={"cards"}
        grabCursor={true}
        onSlideChange={(swiper) => setCompetition(swiper.activeIndex)}
        className="flex justify-center items-center"
      >
        {Children.map(children, (child, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </article>
  );
};

export default Slider;
