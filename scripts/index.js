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

initialCards.forEach(function (item) {
  console.log(item.name);
});

const editButtonProfile = document.querySelector(".profile__edit-button");
const editButtonModal = document.querySelector("#edit-popup");
const closeButtonModal = editButtonModal.querySelector(".popup__close");

function openModal() {
  editButtonModal.classList.add("popup_is-opened");
}

function closeModal() {
  editButtonModal.classList.remove("popup_is-opened");
}

closeButtonModal.addEventListener("click", closeModal);

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal();
}
editButtonProfile.addEventListener("click", handleOpenEditModal);

let formElement = document.querySelector(".popup");

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
