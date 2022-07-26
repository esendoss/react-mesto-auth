import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import '../index.css'
import '../App.css';
import { api } from '../utils/Api';
import * as Auth from '../utils/Auth';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';

import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';

import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App(props) {
    const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [email, setEmail] = useState('');
    const [tooltipMessage, setTooltipMessage] = useState('');
    const [tooltipStatus, setTooltipStatus] = useState(false);

    useEffect(() => {
        handleTokenCheck()
    }, []);

    useEffect(() => {
        if (email) {
            Promise.all([api.getUserInfo(), api.getInitialCards()])
                .then(([profile, cards]) => {
                    setCurrentUser(profile);
                    setCards(cards);
                })
                .catch(err => { console.log(err) });
        }
    }, [email]);

    function handleUpdateUser(data) {
        api.editProfileInfo(data.name, data.about)
            .then((newProfile) => {
                setCurrentUser(newProfile);
                closeAllPopups();
            })
            .catch(err => console.log(err));
    }

    function handleUpdateAvatar(data) {
        api.editAvatar(data)
            .then((newAvatar) => {
                setCurrentUser(newAvatar);
                closeAllPopups();
            })
            .catch(err => console.log(err));
    }

    function handleAddPlaceSubmit(data) {
        api.addUserCard(data.name, data.link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                //console.log(newCard)
                closeAllPopups();
            })
            .catch(err => console.log(err));
    }

    //лайк
    function handleCardLike(card) {
        //Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        //Отправляем запрос в API и получаем обновлённые данные карточки
        api.updateСardLike(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
            })
            .catch(err => console.log(err));
    }

    //удаление карточки
    function handleCardDelete(card) {
        //Снова проверяем, являемся ли мы владельцем текущей карточки
        const isOwn = card.owner._id === currentUser._id;

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.deleteCard(card._id, !isOwn)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id))
            })
            .catch(err => console.log(err));
    }

    //проверка токена
    function handleTokenCheck() {
        const token = localStorage.getItem('token');
        if (token) {
            // проверяем токен пользователя
            Auth.checkToken(token)
                .then((res) => {
                    if (res) {
                        handleLogin(res.data.email);
                    }
                })
                .catch(err => console.log(err))
        };
    }
    function handleLogin(email) {
        setEmail(email);
        props.history.push('/main');
    }

    function handleAuthorize(email, password) {
        Auth.authorize(email, password)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    handleLogin(email);
                } else {
                    handleInfoTooltipClick('Неверный логин или пароль', false)
                }
            })
            .catch(err => handleInfoTooltipClick('Что-то пошло не так! Попробуйте ещё раз.', false));
    }

    function handleRegister(email, password) {
        Auth.register(email, password)
            .then((res) => {
                handleInfoTooltipClick(
                    res.error ? 'Что-то пошло не так! Попробуйте ещё раз.' : 'Вы успешно зарегистрировались!', !res.error
                );
            })
            .catch(err => console.log(err));
    }

    function handleSignOut() {
        setCards([]);
        setEmail('');
        localStorage.removeItem('token');
    }
    //открытие попапов

    function handleEditProfileClick() {
        setisEditProfilePopupOpen(!isEditProfilePopupOpen);
    };
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    };
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    };
    function handleInfoTooltipClick(tooltipMessage, tooltipStatus) {
        setIsInfoTooltipOpen(true);
        setTooltipMessage(tooltipMessage);
        setTooltipStatus(tooltipStatus);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    //закрытие попапов
    function closeAllPopups() {
        setisEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsInfoTooltipOpen(false);
        setSelectedCard({});
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__box">
                    <Header email={email} onSignOut={handleSignOut} />
                    <Switch>
                        <Route exact path='/'>
                            <ProtectedRoute
                                component={Main}
                                email={email}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                                cards={cards}
                            />
                            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                            <ImagePopup
                                card={selectedCard}
                                onClose={closeAllPopups}
                            ></ImagePopup>
                        </Route>
                            //для регистрации пользователя
                        <Route path="/sign-up">
                            <Register onRegister={handleRegister} />
                        </Route>
                            //для авторизации пользователя
                        <Route path="/sign-in">
                            <Login onAuthorize={handleAuthorize} />
                        </Route>

                        <Redirect to={email ? '/' : '/sign-in'} />

                    </Switch>
                    <InfoTooltip isOpen={isInfoTooltipPopupOpen} tooltipMessage={tooltipMessage} tooltipStatus={tooltipStatus} onClose={closeAllPopups} />
                    <Footer />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default withRouter(App);
