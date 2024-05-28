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
const preview = document.querySelector(".image-label");

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

  preview.style.display = "none";
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

// function onClickSendImageButton(event) {
//   const fileInput = document.getElementById("imageInput").files[0];
//   const imageNameInput = document.getElementById("title").value;
//   const categoryInput = 0;

//   // // Vérifier si une image et un nom d'image ont été fournis
//   // if (fileInput.files.length === 0 || !imageNameInput.value.trim()) {
//   //   alert('Veuillez sélectionner une image et donner un nom.');
//   //   return;
//   // }

//   const jsonObject = {
//     image: fileInput,
//     title: imageNameInput,
//     category: categoryInput,
//   };
//   console.log(jsonObject);
//   fetch(`http://localhost:5678/api/works`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(jsonObject),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json(); // Parse the response as JSON
//     })
//     .then((data) => {
//       console.log("POST request successful:", data);
//       // Handle the response data as needed
//     })
//     .catch((error) => {
//       console.error("Error making POST request:", error);
//       // Handle errors
//     });
// }

async function submitForm() {
  // Récupérer les éléments du formulaire
  const form = document.getElementById("imageForm");
  const formData = new FormData(form);
  console.log(formData);
  // const fileInput = document.getElementById("imageInput").files[0];
  // const imageNameInput = document.getElementById("title").value;
  // const categoryInput = 0;
  // formData.append("image", fileInput);
  // formData.append("title", imageNameInput);
  // formData.append("category", categoryInput);
  console.log(formData);
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
  // Effectuer la requête POST

  const response = await postWork(formData);
  console.log(response);

  if (response.status === 201) {
    updateUi();
  }
  // fetch(`http://localhost:5678/api/works/`, {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  //   body: formData,
  // })
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     return response.json(); // Vous pouvez ajuster cela en fonction de la réponse du serveur
  //   })
  //   .then((data) => {
  //     console.log("POST request successful:", data);
  //     // Traiter les données de la réponse si nécessaire
  //   })
  //   .catch((error) => {
  //     console.error("Error making POST request:", error);
  //     // Gérer les erreurs
  //   });
}

imageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  submitForm();
  imageForm.reset();
});
