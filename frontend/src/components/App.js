/* eslint-disable no-restricted-globals */
import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import DeleteCardPopup from "./DeleteCardPopup";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth.js";

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState();
  const [currentUser, setCurrentUser] = React.useState();
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cardToDelete, setCardToDelete] = React.useState();
  const [isSuccess, setIsSuccess] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [headerEmail, setHeaderEmail] = React.useState();
  const [token, setToken] = React.useState(localStorage.getItem("token"));

  React.useEffect(() => {
    const localEmailAddress = JSON.parse(localStorage.getItem("email address"));
    setHeaderEmail(localEmailAddress);
  }, []);

  React.useEffect(() => {
    api
      .getUserInfo(token)
      .then((res) => {
        setCurrentUser(res.user);
      })
      .catch((err) => console.log(err));
  }, [token, currentUser?._id]);

  React.useEffect(() => {
    api
      .getCardList(token)
      .then((res) => {
        setCards(res.data);
      })
      .catch((err) => console.log(err));
  }, [token]);

  React.useEffect(() => {
    handleTokenCheck();
  }, [token]);

  function handleTokenCheck() {
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (!res) {
            return res.status(400).send({
              message: "Token not provided or provided in the wrong format",
            });
          }
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => console.log(err));
    }
  }

  function handleEmailChange(e) {
    localStorage.setItem("email address", JSON.stringify(e.target.value));
    setHeaderEmail(e.target.value);
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setIsSuccess(true);
          setIsInfoTooltipPopupOpen(true);
          setTimeout(() => {
            history.push("/signin");
            setIsInfoTooltipPopupOpen(false);
          }, 2000);
          setEmail("");
          setPassword("");
        } else {
          setIsSuccess(false);
          setIsInfoTooltipPopupOpen(true);
          setTimeout(() => {
            setIsInfoTooltipPopupOpen(false);
          }, 2000);
          console.log("Something went wrong");
        }
      })
      .catch((err) => console.log(err));
  }

  function handleLogin(e) {
    e.preventDefault();
    setLoggedIn(true);
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          setEmail("");
          setPassword("");
          handleLogin(e);
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  }

  function handleLogoutSubmit(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("email address");
    setLoggedIn(false);
    history.push("/signin");
  }

  function handleEditProfileClick() {
    setIsLoading(false);
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsLoading(false);
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsLoading(false);
    setIsEditAvatarPopupOpen(true);
  }

  function handleDeleteCardClick(clickedCard) {
    setIsLoading(false);
    setIsDeleteCardPopupOpen(true);
    setCardToDelete(clickedCard);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard();
  }

  function handleCardClick(clickedCard) {
    setSelectedCard(clickedCard);
  }

  function handleUpdateUser(info) {
    api
      .setUserInfo(info, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(info) {
    api
      .setUserAvatar(info, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit({ link, name }) {
    api
      .addCard({ link, name }, token)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes?.some((i) => i === currentUser?._id);
    if (!isLiked) {
      api
        .addLike(card._id, token)
        .then((newCard) => {
          setCards((prevState) => prevState.map((cardItem) => (cardItem._id === card._id ? newCard : cardItem))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .removeLike(card._id, token)
        .then((newCard) => {
          setCards((prevState) =>  prevState.map((cardItem) => (cardItem._id === card._id ? newCard : cardItem))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id, token)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleChangeButtonText() {
    setIsLoading(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <ProtectedRoute exact path="/" loggedIn={loggedIn}>
          <Header
            loggedIn={loggedIn}
            pageLink=""
            linkTitle="Log out"
            headerEmail={headerEmail}
            onLogoutSubmit={handleLogoutSubmit}
          />
          <Main
            onCardClick={handleCardClick}
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
            cards={cards}
            onCardLike={handleCardLike}
            onDeleteCardClick={handleDeleteCardClick}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
            onRenderLoading={handleChangeButtonText}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
            isLoading={isLoading}
            onRenderLoading={handleChangeButtonText}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
            onRenderLoading={handleChangeButtonText}
          />
          <DeleteCardPopup
            cardToDelete={cardToDelete}
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onDeleteCardSubmit={handleCardDelete}
            isLoading={isLoading}
            onRenderLoading={handleChangeButtonText}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </ProtectedRoute>
        <Route path="/signin">
          <Login
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            onEmailChange={handleEmailChange}
            onPasswordChange={handlePasswordChange}
            onLoginSubmit={handleLoginSubmit}
            setIsInfoTooltipPopupOpen={setIsInfoTooltipPopupOpen}
          />
        </Route>
        <Route path="/signup">
          <Register
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            onEmailChange={handleEmailChange}
            onPasswordChange={handlePasswordChange}
            onRegisterSubmit={handleRegisterSubmit}
            setIsInfoTooltipPopupOpen={setIsInfoTooltipPopupOpen}
          />
        </Route>
      </Switch>
      <InfoTooltip
        isSuccess={isSuccess}
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
