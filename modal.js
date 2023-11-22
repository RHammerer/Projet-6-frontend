const closeFirstModal = document.querySelector("#close-modal-1");
const goToSecondModale = document.querySelector(".addPicture");
const goBackToFirst = document.querySelector(".goBack");
const closeSecondModal = document.querySelector("#close-modal-2");
const trashCan = document.querySelector("#trash");

closeFirstModal.addEventListener("click", () => {
  firstModal.style.display = "none";
});

closeSecondModal.addEventListener("click", () => {
  secondModal.style.display = "none";
});

goToSecondModale.addEventListener("click", () => {
  firstModal.style.display = "none";
  secondModal.style.display = "flex";
});

goBackToFirst.addEventListener("click", () => {
  secondModal.style.display = "none";
  firstModal.style.display = "flex";
});
