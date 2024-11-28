/*const Carousel = ({children}) => 
{
	return 
	(
    	<div className='carousel'>
        	{active > 0 && <button className='nav left' onClick={() => setActive(i => i - 1)}><TiChevronLeftOutline/></button>}
			{React.Children.map(children, (child, i) => 
			(
            	<div className='card-container' style=
				{{
            		'--active': i === active ? 1 : 0,
            		'--offset': (active - i) / 3,
            		'--direction': Math.sign(active - i),
            		'--abs-offset': Math.abs(active - i) / 3,
            		'pointer-events': active === i ? 'auto' : 'none',
        			'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
    				'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
        		}}
				>
					{child}
				</div>
			))
			}
		{active < count - 1 && <button className='nav right' onClick={() => setActive(i => i + 1)}><TiChevronRightOutline/></button>}
		</div>
    );
};
import { useState, useEffect } from 'preact/hooks';
import { Event } from './events.jsx';

const App = () => 
(
	<div className='app'>
    	<Carousel>
        	{[...new Array(CARDS)].map((_, i) => 
			(
        		<Card title={'Card ' + (i + 1)} content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'/>
    		))
			}
        </Carousel>
    </div>  
);

ReactDOM.render
(
	<App/>,
	document.body
);

*/
//export function App() {
//  const [message, setMessage] = useState('');
//
//  useEffect(() => {
//    async function fetchMessage() {
//      const response = await fetch('/api/');
//      const data = await response.json();
//      setMessage(data.message);
//    }
//    fetchMessage();
//  }, []);
//
//  return (
//    <>
//      <h1 class="text-white text-5xl">Peer 2 Pong</h1>
//      <div class="text-3xl font-bold underline text-primary">
//        <p>{message}</p>
//      </div>
//    </>
//  );
//}

// function	LoginPage()
// {
// // shadow-inner-t_colors-primary-yellow-100+b_colors-primary-yellow-900
// 	return (
// 		<>
// 			<div className="w-[800px] h-[70px] left-[96px] top-[575px] absolute justify-center items-center inline-flex">
// 				<div className="w-[800px] h-[70px] relative">
// 					<div className="w-[199.99px] h-[69.72px] shadow-yellow-100-700 parallelogram-tuta px-4 py-2 left-0 top-[0.28px] bg-primary-yellow rounded-sm border-2 border-black justify-center items-center gap-2 inline-flex">
// 						<div className="text-white leading-loose"><h1>LOGIN</h1></div>
// 					</div>
// 					<div className="w-[199.99px] h-[69.72px] shadow-yellow-50-700 parallelogram-tuta px-4 py-2 left-0 top-[0.28px] bg-primary-yellow rounded-sm border-2 border-black justify-center items-center gap-2 inline-flex">
// 						<div className="text-white leading-loose"><h1>MATCHES</h1></div>
// 					</div>
// 					<div className="w-[25.99px] h-[20.72px] text-[25px] shadow-blue-ocean parallelogram-tuta px-4 py-2 left-0 top-[0.28px] bg-accent-blue rounded-sm border-2 border-black justify-center items-center gap-2 inline-flex">
// 						<div className="text-white leading-loose">+</div>
// 					</div>
// 					<div className="w-[25.99px] h-[20.72px] text-[25px] shadow-red-light-dark px-4 py-2 left-0 top-[0.28px] bg-accent-red rounded-sm border-2 border-black justify-center items-center gap-2 inline-flex">
// 						<div className="text-white leading-loose">-</div>
// 					</div>
// 				</div>
// 			</div>
// 			<img className="w-[203px] h-[183px] left-[93px] top-[223px] absolute" src="assets/logo.png" />
// 		</>
// 	);

// }

// function	Background({children})
// {
// 	return (
// 			<div className="w-[1200px] h-[852px] relative bg-[#212528]">
// 				<img className="w-[1200px] h-[854px] left-0 top-[-2px] absolute" src="assets/background_image.png" />
// 				{children}
// 			</div>
// 	);
// }

// function	Banner()
// {
// 	return (
// 		<div className="w-80 h-9 relative">
// 			<div className="w-72 border-4 border-black h-6 mt-1 left-[7.85px] parallelogram-banner rounded-r-md shadow-yellow-50-700 bg-primary-yellow top-[23.10px] absolute">
// 			</div>                      
// 			<div className="w-64 border-4 border-black h-6 left-[95px] parallelogram-banner rounded-r-md shadow-yellow-50-700 bg-primary-yellow top-[8.20px] absolute">
// 			</div>                      
// 			<div className="w-60 border-4 border-black h-12 left-0 parallelogram-banner rounded-r-md shadow-yellow-50-700 bg-primary-yellow top-0 absolute">
// 			</div>
// 			<div className="w-44 left-[30px] top-[-14px] absolute text-white text-3xl font-normal font-['Fugaz One'] leading-loose"><h1>MATCHES</h1></div>
// 		</div>
// 	);
// }

// export function	App()
// {
// 	return (
// 		<Background>
// 			<Banner/>
// 		</Background>
// 	);
// }

import { useState, useEffect } from 'preact/hooks';
import { Slider } from './slider.jsx'
import { h } from 'preact';
import { Event } from './events.jsx';

export function App() 
{
  return (
    <>
    <Slider>
    <Event class="bg-primary size-40 flex items-center justify-center" > LEAGUE </Event>
    <Event class="bg-primary size-40 flex items-center justify-center" > TOURNAMENT </Event>
    <Event class="bg-primary size-40 flex items-center justify-center" > MORE EVENTS </Event>
    </Slider>
    </>
  );
}

