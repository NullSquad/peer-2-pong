import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { Children } from 'react';
import 'swiper/css';

export const Slider = ({children}) => {
	const count = Children.count(children);
	return (
		<>
			<article class="flex justify-center w-screen bg-white py-8 px-8">
				<Swiper
				effect={'cards'}
		        grabCursor={true}
		        modules={[EffectCards]}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}
				className="flex justify-center items-center"
				>
					{
						Children.map(children, (child, index) => (
			        	<SwiperSlide 
						key={index} 
						style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}
						>
							{child}
						</SwiperSlide>
			    		))
					}
		    	</Swiper>
			</article>
    	</>
	);
};
