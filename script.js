const gallery = document.querySelector(".gallery");
const categoriesElement = document.querySelector(".categories");
const adminPanel = document.querySelector(".admin-panel");
const buttonFirstModal = document.querySelector("#display-modal-1");
const firstModal = document.querySelector("#modal-1");
const secondModal = document.querySelector("#modal-2");
const login = document.querySelector(".login");
const logout = document.querySelector(".logout");
const modalContent = document.querySelector(".modal-content");
const filtres = document.querySelector(".categories");

let works = [];

const token = sessionStorage.getItem("token");

const getImagesData = async () => {
  //   return fetch("http://localhost:5678/api/works")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json(); // Assuming the response is in JSON format
  //     })
  //     .then((data) => {
  //       // Do something with the data
  //       console.log(data);
  //       return data;
  //     })
  //     .catch((error) => {
  //       // Handle any errors
  //       console.error("Fetch error:", error);
  //     });

  const response = await fetch("http://localhost:5678/api/works");
  const data = await response.json();

  return data;
};

const getCategories = async () => {
  const response = await fetch("http://localhost:5678/api/categories");
  const data = await response.json();

  return data;
};

// const injectDataHtml = async () => {
//   array = await getImagesData();
//   let gallery = document.querySelector(".gallery");
//   array.forEach((element) => {
//     const imageContainer = document.createElement("figure");
//     figure.classListe.add("imagesContainer");
//   });
// };

const injectDataHtml = (works) => {
  works.forEach((work) => {
    const figure = document.createElement("figure");
    const figcaption = document.createElement("figcaption");
    const image = document.createElement("img");

    figcaption.textContent = work.title;
    image.src = work.imageUrl;

    figure.appendChild(image);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
};

const removeAllImages = () => {
  while (gallery.firstChild) {
    gallery.removeChild(gallery.firstChild);
  }
};

const createButtonCategory = (category) => {
  const button = document.createElement("button");
  button.textContent = category.name;

  button.addEventListener("click", async () => {
    console.log(category.id);

    //Récupérer toutes les images
    let imagesData = await getImagesData();
    console.log(imagesData);

    //Obtenir les imaes correspondznt au catégorie id
    let filtredCategories;
    if (category.id === 0) {
      filtredCategories = imagesData;
    } else {
      filtredCategories = imagesData.filter(
        (obj) => obj.categoryId === category.id
      );
    }

    // const filtredCategories =
    //   category.id === 0
    //     ? imagesData
    //     : (filtredCategories = imagesData.filter(
    //         (obj) => obj.categoryId === category.id
    //       ));

    //Supprimer les images déjà affichée
    removeAllImages();

    //Afficher les images selectionnées
    injectDataHtml(filtredCategories);

    console.log(filtredCategories);
  });

  categoriesElement.appendChild(button);
  button.classList.add("filtre");
};

const createCategories = (categories) => {
  createButtonCategory({ id: 0, name: "Tous" });
  categories.forEach((category) => {
    createButtonCategory(category);
  });
};

const init = async () => {
  const works = await getImagesData();

  const categories = await getCategories();

  injectDataHtml(works);
  createCategories(categories);
  injectWorksModal(works);
};

init();

if (token !== null) {
  adminPanel.style.display = "flex";

  buttonFirstModal.addEventListener("click", (event) => {
    event.preventDefault();
    firstModal.style.display = "flex";
  });

  login.style.display = "none";
  logout.style.display = "flex";
  filtres.style.display = "none";
  buttonFirstModal.style.display = "flex";
  filtres.style.display = "none";

  logout.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.reload();
    console.log("sessionStorage vidé avec succès !");
  });
}
const injectWorksModal = (works) => {
  works.forEach((work) => {
    const figure = document.createElement("figure");
    const figcaption = document.createElement("figcaption");
    const image = document.createElement("img");
    const icon = document.createElement("img");

    icon.src = "./assets/images/trash-can-solid.svg";
    icon.alt = "icone poubelle";

    figcaption.appendChild(icon);
    image.src = work.imageUrl;

    figcaption.addEventListener("click", async () => {
      console.log(work.id);
      const response = await deleteWork(work.id);
      console.log(response);
      if (response.status === 204) {
        updateUi();
      }
    });

    figure.appendChild(image);
    figure.appendChild(figcaption);
    modalContent.appendChild(figure);
  });
};

const updateUi = async () => {
  removeAllImages();
  modalContent.innerHTML = "";
  const works = await getImagesData();
  injectDataHtml(works);
  injectWorksModal(works);
};
