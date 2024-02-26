function filterUsers() {
  const searchQuery = document.getElementById("input").value.toLowerCase();
  const xhr = new XMLHttpRequest();
  const API = "https://jsonplaceholder.typicode.com/users";
  xhr.open("GET", API);
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const res = xhr.response;
      const container = document.getElementById("card-container");
      container.innerHTML = "";
      res
        .filter(
          shagufta =>
            shagufta.name.toLowerCase().includes(searchQuery) ||
            shagufta.email.toLowerCase().includes(searchQuery)
        )
        .forEach(u => {
          const card = document.createElement("div");
          card.classList.add("user-card");
          card.innerHTML = `
      <h2>${u.name}</h2>
            <p>${u.email}</p>
      `;
          container.appendChild(card);
        });
    } else {
      throw new Error(`Resquest failed: ${xhr.status}`);
    }
  };
}
document.getElementById("input").addEventListener("input", filterUsers);
filterUsers();
