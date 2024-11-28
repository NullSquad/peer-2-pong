import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, EffectCoverflow } from 'swiper/modules';
import { Children } from 'react';
import 'swiper/css';

export const Slider = ({children}) => {
  const count = Children.count(children);
  return (
    <>
    <article className="flex justify-center w-screen bg-blue py-8 px-8">
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
      effect={'cards'}
      grabCursor={true}
      // loop={true}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      className="flex justify-center items-center"
      >
      {
        Children.map(children, (child, index) => (
          <SwiperSlide  className="flex justify-center items-center"
          key={index}>
          {child}
          </SwiperSlide>
        ))
      }
      </Swiper>
    </article>
    </>
  );
};

export default Slider;
