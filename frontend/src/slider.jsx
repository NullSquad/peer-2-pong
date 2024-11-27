import { useState } from 'preact/hooks';
import { Children } from 'react';

export const Slider = ({children}) => {
	const [active, setActive] = useState(2);
	const count = Children.count(children);
	return (
    	<>
			{	active > 0 && 
				<button onClick={() => setActive(i => i - 1)}>
					flecha izquierda
				</button>
			}
    		
			<div class="bg-primary flex flex-row">
				{children}
			</div>

			{	active < count - 1 && 
				<button onClick={() => setActive(i => i + 1)}>
					flecha derecha 
				</button>
			}
    	</>
	);
};
