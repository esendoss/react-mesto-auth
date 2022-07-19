import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    useEffect(() => {
        avatarRef.current.value = "";
    }, [isOpen]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            name='avatar'
            title='Обновить аватар'
            onClose={onClose}
            buttonText='Сохранить'
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_data_avatar"
                type="url"
                id="avatar"
                name="avatar"
                placeholder="Ссылка на картинку"
                ref={avatarRef}
                defaultValue=""
                required />
            <span className="popup__input-error avatar-error" id="avatar-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;