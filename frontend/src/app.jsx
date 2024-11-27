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

import { useState, useEffect } from 'preact/hooks';
import { Slider } from './slider.jsx'
import { h } from 'preact';

export function App() 
{
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchMessage() {
      const response = await fetch('/api/');
      const data = await response.json();
      setMessage(data.message);
    }
    fetchMessage();
  }, []);

  return (
    <>
	  <h1>message :{message}</h1>
	  <Slider>
		<div> children 1 </div>
		<div> children 2 </div>
		<div> children 3 </div>
	  </Slider>
    </>
  );
}
