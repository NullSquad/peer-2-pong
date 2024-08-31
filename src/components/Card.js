import { html, useState } from "zaphod";

const Card = ({ children, image }) => {
  const [isFollowing, setIsFollowing] = useState(true);
  const text = isFollowing ? "Siguiendo" : "Seguir";
  const buttonClassName = isFollowing
    ? "tw-followCard-button is-following"
    : "tw-followCard-button";
  const handleClick = () => {
    setIsFollowing(!isFollowing);
  };

  return html`
    <article class="tw-followCard">
      <header class="tw-followCard-header">
        <img class="tw-followCard-avatar" src=${image} />
        <div class="tw-followCard-info">
          <strong>${children}</strong>
          <span class="tw-followCard-infoUserName">@${children}</span>
        </div>
      </header>

      <aside>
        <button class=${buttonClassName} onClick=${handleClick}>
          <span className="tw-followCard-text">${text}</span>
          <span className="tw-followCard-stopFollow">Dejar de seguir</span>
        </button>
      </aside>
    </article>
  `;
};

export default Card;
