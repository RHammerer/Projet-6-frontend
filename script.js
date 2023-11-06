const gallery = document.querySelector(".gallery");
const categoriesElement = document.querySelector(".categories");

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
};

init();
