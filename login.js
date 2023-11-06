const loginForm = document.querySelector("#login");

const getLogin = async (data) => {
  const user = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response;
};

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(loginForm);

  const response = await getLogin(data);
  const user = await response.json();
  console.log(response);

  if (response.status === 200) {
    console.log(user);
    sessionStorage.setItem("token", user.token);
  }

  if (response.status === 404 || response.status === 401) {
  }
});
