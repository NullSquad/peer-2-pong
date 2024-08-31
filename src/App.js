import { html } from "zaphod";
import Card from "./components/Card.js";

const users = [
  {
    user: "sguzman",
    image:
      "https://cdn.intra.42.fr/users/b4c2641d99c5484f2cd86dd8b454c457/sguzman.png",
  },
  {
    user: "bautrodr",
    image:
      "https://cdn.intra.42.fr/users/2cda6bee6a2954eb4612156dfcf1243b/bautrodr.png",
  },
  {
    user: "deordone",
    image:
      "https://cdn.intra.42.fr/users/b87ca409e3426d93cff377a3c1c3f031/deordone.png",
  },
  {
    user: "eralonso",
    image:
      "https://cdn.intra.42.fr/users/1c7b1d707503c67f6075d34920a1c83d/eralonso.jpg",
  },
];

const App = () => {
  return html`
    ${users.map(
      ({ user, image }) => html` <${Card} image=${image}> ${user} <//> `,
    )}
  `;
};

export default App;
