import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    //подписываемся на контекст
    const currentUser = React.useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (

        <PopupWithForm
            isOpen={isOpen}
            name='edit'
            title='Редактировать профиль'
            buttonText='Сохранить'
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_data_name"
                type="text"
                id="name"
                placeholder="Имя"
                name="userName"
                minLength="2"
                maxLength="40"
                autoComplete="off"
                onChange={handleNameChange}
                value={name || ''}
                required />
            <span className="popup__input-error name-error" id="name-error"></span>

            <input
                className="popup__input popup__input_data_job"
                type="text"
                id="description"
                placeholder="О себе"
                name="description"
                minLength="2"
                maxLength="200"
                autoComplete="off"
                onChange={handleDescriptionChange}
                value={description || ''}
                required />
            <span className="popup__input-error job-error" id="job-error"></span>
        </PopupWithForm>
    )


}

export default EditProfilePopup;