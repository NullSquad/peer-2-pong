import { useState } from 'preact/hooks';
import { Children } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export const Slider = ({children}) => {
	const [active, setActive] = useState(0);
	const count = Children.count(children);
	return (
    	<>
			<div class="bg-white flex flex-row">
				{	active > 0 &&
				<button onClick={() => setActive(i => i - 1)}>
					flecha izquierda
				</button> 
				}
    			
				<div 
					class="	bg-primary flex flex-row " 
				>
					{children}
				</div>

				{	active < count - 1 && 
				<button onClick={() => setActive(i => i + 1)}>
					flecha derecha 
				</button>
				}
			</div>
    	</>
	);
};
