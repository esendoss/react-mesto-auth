import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import '../index.css'
import '../App.css';
import { api } from '../utils/Api';
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


function App() {
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

    //Api
    useEffect(() => {
        api.getUserInfo()
            .then((name, about, avatar) => {
                setCurrentUser(name, about, avatar)
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    }, []);

    useEffect(() => {
        api.getInitialCards()
            .then((data) => {
                setCards(data);
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    }, []);

    function handleUpdateUser(data) {
        api.editProfileInfo(data)
            .then((newProfile) => {
                setCurrentUser(newProfile);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    }

    function handleUpdateAvatar(data) {
        api.editAvatar(data)
            .then((newAvatar) => {
                setCurrentUser(newAvatar);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    }

    function handleAddPlaceSubmit(data) {
        api.addUserCard(data.name, data.link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                console.log(newCard)
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка: ${err}`))
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
            .catch(err => console.log(`Ошибка: ${err}`))
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
            .catch(err => console.log(`Ошибка: ${err}`))
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
        <BrowserRouter>
            <CurrentUserContext.Provider value={currentUser}>
                <div className="page">
                    <div className="page__box">
                        <Header email={email} />
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
                            <Route path="/signup">
                                <Register />
                            </Route>
                            //для авторизации пользователя
                            <Route path="/signin">
                                <Login />
                            </Route>

                            <Redirect to={email ? '/' : '/signin'} />

                        </Switch>
                        <InfoTooltip isOpen={isInfoTooltipPopupOpen} tooltipMessage={tooltipMessage} tooltipStatus={tooltipStatus} onClose={closeAllPopups} />
                        <Footer />
                    </div>

                </div>

            </CurrentUserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
