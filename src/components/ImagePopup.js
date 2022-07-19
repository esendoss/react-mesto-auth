import React from "react";
import close from '../images/close-icon.svg';

function ImagePopup({ card, onClose }) {

    function handleOverlayClick(evt) {
        if (evt.target === evt.currentTarget) {
            onClose()
        };
    }
    return (
        <div className={`popup popup_picture ${card.link && 'popup_opened'}`} onClick={handleOverlayClick}>
            <form className="form" name="pic-form">
                <div className="popup__container-image">
                    <img className="popup__image" src={card.link} alt={card.name} />
                    <button className="popup__exit popup__exit_pic" type="button" onClick={onClose}>
                        <img className="popup__exit-sign" src={close} alt="Кнопка выхода" />
                    </button>
                </div>
                <h4 className="popup__name">{card.name}</h4>
            </form>
        </div>
    )

}
export default ImagePopup;