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
cardsSection.innerHTML = '<ul class="cards__list"></ul>'; // Cria a seção de cartões e adiciona a estrutura HTML necessária
document.querySelector(".profile").after(cardsSection); // Adiciona a seção de cartões após o perfil
const cardsWrap = document.querySelector(".cards__list"); // Seletor para o contêiner onde os cartões serão renderizados

const closeImagePopupButton = document.querySelector(
  "#image-popup .popup__close",
); // Seletor para o botão de fechar do popup de imagem

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
} // Função para preencher o formulário de edição de perfil com os valores atuais do perfil

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editButtonModal);
} // Função para lidar com a abertura do modal de edição de perfil, preenchendo o formulário com os valores atuais do perfil antes de abrir o modal

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
} // Função para lidar com a submissão do formulário de edição de perfil, atualizando o título e a descrição do perfil com os valores inseridos no formulário e fechando o modal

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
  }); // Adiciona um evento de clique ao botão de curtir para alternar a classe que indica se o cartão está curtido ou não

  cardImage.addEventListener("click", function () {
    const popupImage = document.querySelector("#image-popup");
    const popupImageElement = popupImage.querySelector(".popup__image");
    const popupCaption = popupImage.querySelector(".popup__caption");
    popupImageElement.src = link;
    popupImageElement.alt = name;
    popupCaption.textContent = name;
    openModal(popupImage);
  }); // Adiciona um evento de clique à imagem do cartão para abrir um popup com a imagem em tamanho maior e a legenda correspondente

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  return cardElement;
}

function renderCard(item, element) {
  element.prepend(getCardElement(item.name, item.link));
} // Função para renderizar um cartão, criando o elemento do cartão usando a função getCardElement e adicionando-o ao início do contêiner especificado

initialCards.forEach((item) => {
  renderCard(item, cardsWrap);
}); // Itera sobre o array de cartões iniciais e renderiza cada cartão usando a função renderCard, passando o item do cartão e o contêiner onde os cartões devem ser adicionados

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector(".popup__input_type_card-name");
  const linkInput = document.querySelector(".popup__input_type_url");

  renderCard({ name: nameInput.value, link: linkInput.value }, cardsWrap);
  closeModal(newCardPopup);
} // Função para lidar com a submissão do formulário de criação de novo cartão, criando um novo cartão com os valores inseridos no formulário, renderizando-o na página e fechando o modal de criação de cartão

formElement.addEventListener("submit", handleCardFormSubmit);
