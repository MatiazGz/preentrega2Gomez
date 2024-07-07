document.addEventListener("keyup", (e) => {
    if (e.target.matches("#buscador")) {
      document.querySelectorAll(".item").forEach((item) => {
        item.textContent
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
          ? item.classList.remove("filtro")
          : item.classList.add("filtro");
      });
    }
  });
  