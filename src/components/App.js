import React from "react";
import {Route, Switch, useHistory} from 'react-router-dom'; 
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import auth from "../utils/Auth";
import InfoToolTip from "./InfoTooltip";

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isRegistration, setRegistration] = React.useState(false);
  const [isInfoToolTip, setInfoToolTip] = React.useState(false);
  const [isEmail, setUserEmail] = React.useState('');
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = React.useState({
    avatar: "",
    name: "",
    about: "",
  });
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }, []);

  React.useEffect(() => {
    api
      .getUserProfile()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }, []);

  function tokenCheck() {
    const token = localStorage.getItem('jwt');
    if (token) {
        auth.tokenComparison(token)
            .then((res) => {
                if (res) {
                  setUserEmail(res.data['email']);
                  setLoggedIn(true);
                  history.push('/');
                }
            })
            .catch((err) => console.error(err));
    }
  };

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function handleRegistration(data) {
    auth.registration(data)
      .then((res) => {
        console.log(res)
        setRegistration(true);
        handleInfoToolTip();
        history.push('/sign-in')
      })
      .catch((err) => {
        console.error(err);
        setRegistration(false);
      })
      .finally(() => handleInfoToolTip())
  }

  function handleAuthorization(data) {
    auth.authorization(data)
      .then((res) => {
        setLoggedIn(true);
        setUserEmail(data.email);
        localStorage.setItem('jwt', res.token);
        history.push('/');
      })
      .catch((err) => {
        console.error(err);
      })
  }

  function logOff() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in')
  }

  function handleInfoToolTip() {
    setInfoToolTip(true);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .likeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }

  function handleUpdateUser(data) {
    api
      .editUserProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }

  function handleUpdateAvatar(data) {
    api
      .changeAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setInfoToolTip(false);
    setSelectedCard({ name: "", link: "" });
  }
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header emailUser={isEmail} onLogOff={logOff}/>
        <Switch>
          <Route exact path="/sign-up">
            <Register onRegistration={handleRegistration}/>
          </Route>
          <Route path="/sign-in">
            <Login handleAuthorization={handleAuthorization}/>
          </Route>
          <ProtectedRoute path="/" loggedIn={loggedIn} component={Main} onCardClick={handleCardClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}>
          </ProtectedRoute>
          </Switch>
                <InfoToolTip
                    isRegistration={isRegistration}
                    isOpen={isInfoToolTip}
                    onClose={closeAllPopups}
                />
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
              />
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
              />
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
              />
              <PopupWithForm
                name="delete-card"
                title="Вы уверены"
                button="Да"
              ></PopupWithForm>
              <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        {loggedIn && <Footer />}
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
