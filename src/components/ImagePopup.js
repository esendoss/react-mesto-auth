import React from "react";
import close from '../images/close-icon.svg';

function ImagePopup(props) {

    function handleOverlayClick(evt) {
        if (evt.target === evt.currentTarget) {
            props.onClose()
        };
    }
    return (
        <div className={`popup popup_picture ${props.link && 'popup_opened'}`} onClick={handleOverlayClick}>
            <form className="form" name="pic-form">
                <div className="popup__container-image">
                    <img className="popup__image" src={props.link} alt={props.name} />
                    <button className="popup__exit popup__exit_pic" type="button" onClick={props.onClose}>
                        <img className="popup__exit-sign" src={close} alt="Кнопка выхода" />
                    </button>
                </div>
                <h4 className="popup__name">{props.name}</h4>
            </form>
        </div>
    )

}
export default ImagePopup;