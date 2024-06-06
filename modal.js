const closeFirstModal = document.querySelector("#close-modal-1");
const goToSecondModale = document.querySelector(".addPicture");
const goBackToFirst = document.querySelector(".goBack");
const closeSecondModal = document.querySelector("#close-modal-2");
const trashCan = document.querySelector("#trash");
const imageInput = document.querySelector("#imageInput");
const imageContainer = document.querySelector(".image-container");
const imageForm = document.querySelector("#imageForm");
const formTitle = document.querySelector("#title");
const formCategory = document.querySelector("#category");
const submitBtn = document.querySelector(".submit-btn");
const imageLabel = document.querySelector(".image-label");
const imageText = document.querySelector(".text-modale");
const imageLogo = document.querySelector(".image-logo");

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

const deleteWork = async (id) => {
  return await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const postWork = async (data) => {
  return await fetch(`http://localhost:5678/api/works`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
};

imageInput.addEventListener("change", (e) => {
  // console.log(e.target.files[0]);
  const url = URL.createObjectURL(e.target.files[0]);
  const img = document.createElement("img");
  img.className = "preview";
  img.src = url;
  img.alt = "image temporaire";

  imageContainer.appendChild(img);
  imageText.style.display = "none";
  imageLogo.style.display = "none";
  imageLabel.style.display = "none";
});
imageForm.addEventListener("input", () => {
  console.log("in");
  if (
    imageInput.value.length > 0 &&
    formTitle.value.length > 0 &&
    formCategory.value.length > 0
  ) {
    submitBtn.removeAttribute("disabled");
    submitBtn.classList.add("cursor-on");
    submitBtn.classList.remove("cursor-off");
    submitBtn.classList.add("valid");
  } else {
    submitBtn.setAttribute("disabled", "disabled");
    submitBtn.classList.add("cursor-off");
    submitBtn.classList.remove("valid");
  }
});

async function submitForm() {
  // Récupérer les éléments du formulaire
  const form = document.getElementById("imageForm");
  const formData = new FormData(form);
  formData.forEach((value, key) => {});
  // Effectuer la requête POST

  const response = await postWork(formData);
  console.log(response);

  if (response.status === 201) {
    form.reset();
    imageText.style.display = "block";
    imageLogo.style.display = "block";
    imageLabel.style.display = "block";
    document.querySelector(".preview").remove();
    updateUi();
  }
}

imageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  submitForm();
  imageForm.reset();
});
