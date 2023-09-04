import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useCallback, useEffect, useState } from "react";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { auth, authorization } from "../utils/auth";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import SendContext from "../contexts/SendContext";
import { getUserData } from "../utils/auth.js";

export default function App() {
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setImagePopup] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isProcess, setIsProcess] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);
  const [deleteCardId, setDeleteCardId] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [dataUser, setDataUser] = useState("");

  const isOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isDeletePopupOpen ||
    isImagePopup ||
    isSuccessful ||
    isError;

  const closeAllPopups = useCallback(() => {
    setIsAddPlacPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopup(false);
    setIsDeletePopupOpen(false);
    setIsError(false);
    setIsSuccessful(false);
  }, []);

  useEffect(() => {
    function closePopupsByEsc(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closePopupsByEsc);
      return () => {
        document.removeEventListener("keydown", closePopupsByEsc);
      };
    }
  }, [isOpen, closeAllPopups]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacPopupOpen(true);
  }

  function handleCardDelete(cardId) {
    setIsDeletePopupOpen(true);
    setDeleteCardId(cardId);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopup(true);
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(localStorage.jwt), api.getInitialCards(localStorage.jwt)])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (localStorage.jwt) {
      getUserData(localStorage.jwt)
        .then((res) => {
          setDataUser(res.email);
          setLoggedIn(true);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }, [navigate]);

  function handleCardDeleteSubmit(evt) {
    evt.preventDefault();
    setIsProcess(true);
    api
      .deleteCard(deleteCardId, localStorage.jwt)
      .then(() => {
        setCards(
          cards.filter((item) => {
            return item._id !== deleteCardId;
          })
        );
        closeAllPopups();
        setIsProcess(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(userData, reset) {
    setIsProcess(true);
    api
      .sendUserData(userData, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
        setIsProcess(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(userData, reset) {
    setIsProcess(true);
    api
      .sendNewAvatar(userData, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
        setIsProcess(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(cardData, reset) {
    setIsProcess(true);
    api
      .sendNewCard(cardData, localStorage.jwt)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        reset();
        setIsProcess(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(password, email) {
    setIsSend(true);
    authorization(password, email)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        setIsError(true);
        console.error(err);
      })
      .finally(() => setIsSend(false));
  }

  function handleRegister(password, email) {
    setIsSend(true);
    auth(password, email)
      .then(() => {
        setIsSuccessful(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        setIsError(true);
        console.error(err);
      })
      .finally(() => setIsSend(false));
  }

  const location = useLocation();

  const [headerInfo, setHeaderInfo] = useState({});

  useEffect(() => {
    if (location) {
      if (location.pathname === "/sign-in") {
        setHeaderInfo({ name: "signin" });
      }
      if (location.pathname === "/sign-up") {
        setHeaderInfo({ name: "signup" });
      }
      if (location.pathname === "/") {
        setHeaderInfo({ name: "" });
      }
    }
  }, [location]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SendContext.Provider value={isSend}>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isProcess={isProcess}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          isProcess={isProcess}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isProcess={isProcess}
        />

        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          titleButton="Да"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDeleteSubmit}
          isProcess={isProcess}
        />
      </SendContext.Provider>

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopup}
        onClose={closeAllPopups}
      />

      <InfoTooltip
        name="successful"
        isOpen={isSuccessful}
        onClose={closeAllPopups}
      />

      <InfoTooltip name="error" isOpen={isError} onClose={closeAllPopups} />

      <SendContext.Provider value={isSend}>
        <Header name={headerInfo.name} dataUser={dataUser} />
        <Routes>
          <Route
            path="*"
            element={
              <ProtectedRoute
                path="/"
                element={Main}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
                cards={cards}
                dataUser={dataUser}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/sign-in"
            element={<Login onLogin={handleLogin} />}
          ></Route>
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          ></Route>
        </Routes>
      </SendContext.Provider>
      <Footer />
    </CurrentUserContext.Provider>
  );
}
