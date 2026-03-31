let initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const editButtonProfile = document.querySelector(".profile__edit-button");
const editButtonModal = document.querySelector("#edit-popup");
const closeButtonModal = editButtonModal.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
let formElement = document.querySelector("#new-card-form");
const profileForm = document.querySelector("#edit-profile-form");
const newCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const newCardForm = document.querySelector("#new-card-form");
const closeNewButton = newCardPopup.querySelector(".popup__close");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsSection = document.createElement("section");
cardsSection.className = "cards page__section";
cardsSection.innerHTML = '<ul class="cards__list"></ul>';
document.querySelector(".profile").after(cardsSection);
const cardList = [];
const cardsWrap = document.querySelector(".cards__list");
const closeImagePopupButton = document.querySelector(
  "#image-popup .popup__close",
);

function openModal(popup) {
  popup.classList.add("popup_is-opened");
}

editButtonProfile.addEventListener("click", function () {
  openModal(editButtonModal);
});

newCardButton.addEventListener("click", function () {
  openModal(newCardPopup);
});

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

closeNewButton.addEventListener("click", function () {
  closeModal(newCardPopup);
});

closeButtonModal.addEventListener("click", function () {
  closeModal(editButtonModal);
});

closeImagePopupButton.addEventListener("click", function () {
  const popupImage = document.querySelector("#image-popup");
  closeModal(popupImage);
});

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editButtonModal);
}
editButtonProfile.addEventListener("click", handleOpenEditModal);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const nameInput = document.querySelector(".popup__input_type_name");
  const jobInput = document.querySelector(".popup__input_type_description");

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editButtonModal);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

function getCardElement(
  name = "Lugar sem nome",
  link = "./images/placeholder.jpg",
) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  cardImage.addEventListener("click", function () {
    const popupImage = document.querySelector("#image-popup");
    const popupImageElement = popupImage.querySelector(".popup__image");
    const popupCaption = popupImage.querySelector(".popup__caption");
    popupImageElement.src = link;
    popupImageElement.alt = name;
    popupCaption.textContent = name;
    openModal(popupImage);
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  return cardElement;
}

function renderCard(item, element) {
  element.prepend(getCardElement(item.name, item.link));
}

initialCards.forEach((item) => {
  renderCard(item, cardsWrap);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector(".popup__input_type_card-name");
  const linkInput = document.querySelector(".popup__input_type_url");

  renderCard({ name: nameInput.value, link: linkInput.value }, cardsWrap);
  closeModal(newCardPopup);
}

formElement.addEventListener("submit", handleCardFormSubmit);
