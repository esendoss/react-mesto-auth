import React from 'react';
import Card from './Card';
import '../index.css'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {

    //подписываемся на контекст
    const currentUser = React.useContext(CurrentUserContext);
    
    return (
        <main className="main">
            <section className="profile page__borders">
                <div className="profile__info">
                    <img className="profile__avatar" onClick={onEditAvatar} src={currentUser.avatar} />
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button onClick={onEditProfile} className="profile__edit-button" type="button" aria-label="Редактировать"></button>
                    <p className="profile__about">{currentUser.about}</p>
                </div>
                <button onClick={onAddPlace} className="profile__add-button" type="button" aria-label="Добавить"></button>
            </section>
            <ul className="gallery page__borders">
                {cards.map((card) => (
                    <Card 
                    key={card._id} 
                    card={card} 
                    onCardClick={onCardClick}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete}
                    />
                ))}
            </ul>
        </main>
    )
}

export default Main