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
let formElement = document.querySelector(".popup");
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

function openModal(popup) {
  popup.classList.add("popup_is-opened");
}

editButtonProfile.addEventListener("click", function () {
  openModal(editButtonModal);
});

newCardButton.addEventListener("click", function () {
  openModal(newCardPopup);
});

function closeModal() {
  editButtonModal.classList.remove("popup_is-opened");
}

closeNewButton.addEventListener("click", function () {
  newCardPopup.classList.remove("popup_is-opened");
});
closeButtonModal.addEventListener("click", closeModal);

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal();
}
editButtonProfile.addEventListener("click", handleOpenEditModal);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let profileTitle = document.querySelector(".profile__title");
  let profileDescription = document.querySelector(".profile__description");
  let nameInput = document.querySelector(".popup__input_type_name");
  let jobInput = document.querySelector(".popup__input_type_description");

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal();
}

formElement.addEventListener("submit", handleProfileFormSubmit);

function getCardElement(
  name = "Lugar sem nome",
  link = "./images/placeholder.jpg",
) {
  const cardElement = cardTemplate.cloneNode(true);
  console.log("Valor de card element:", cardElement);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_active");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  console.log("valor de card element:", cardElement);

  return cardElement;
}

function renderCard(item, element) {
  console.log("Valor de cardList:", element);
  // let cardElement = getCardElement(name, link);
  // cardList.push(cardElement);
  element.prepend(getCardElement(item.name, item.link));
}

initialCards.forEach((item) => {
  renderCard(item, cardsWrap);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  let newcardname = cardTemplate.querySelector(".card__title");
  let newcardlink = cardTemplate.querySelector(".card__image");
  let nameInput = cardTemplate.querySelector(".popup__input_type_card-name");
  let linkInput = cardTemplate.querySelector(".popup__input_type_card-link");
  newcardname.textContent = nameInput.value;
  newcardlink.src.textContent = linkInput.value;
  newcardlink.alt.textContent = nameInput.value;
  renderCard(nameInput.value, linkInput.value, cardList);
  closeModal();
}

formElement.addEventListener("submit", handleCardFormSubmit);
