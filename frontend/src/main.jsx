import { render } from 'preact';

const root = document.getElementById('app');

const Test = () => {
	return (
	  <h1 className="text-black">Hello World!</h1>
  )
}

function Tuvieja() {
	return (
	  <h1 className="text-black">Hello World!</h1>
  )
}

render(<Tuvieja/>, root)
