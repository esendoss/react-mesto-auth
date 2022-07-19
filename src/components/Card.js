import React from "react";
import '../index.css';
import like from '../images/like.svg';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    //подписываемся на контекст
    const currentUser = React.useContext(CurrentUserContext);

    //определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `card__delete ${isOwn ? 'card__delete_active' : ''}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `card__like ${isLiked ? 'card__like_active' : ''}`
    );


    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }
    function handleDeleteClick () {
        onCardDelete(card);
    }

    return (
        <li className="card">
            <img className="card__img" src={card.link} alt={card.name} onClick={handleClick} />
            <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
            <div className="card__caption">
                <h2 className="card__place">{card.name}</h2>
                <div className="card__likes">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}>
                        <img src={like} alt="Лайк" />
                    </button>
                    <p className="card__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}
export default Card;