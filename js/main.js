const db = {
    methods: {
      find: (id) => {
        return db.products.find((item) => item.id == id);
      },
      remove: (products) => {
        products.forEach((item) => {
          const product = db.methods.find(item.id);
          product.cant = product.cant - item.cant;
        });
      },
    },
    //cambio el array products por uno vacio en donde importar la info desde el archivo Json
    products: [],
    loadProducts: async () => {
      try {
        const response = await fetch("./js/db.json");
        if (!response.ok) {
          throw new Error("Failed to load product data");
        }
        const data = await response.json();
        db.products = data;
      } catch (error) {
        console.error(error);
      }
    },
  };
  // funciones del carrito usando metodos
  const cart = {
    products: JSON.parse(localStorage.getItem("key-carrito")) || [],
    methods: {
      add: (id, cant) => {
        const cartItem = cart.methods.get(id);
        if (cartItem) {
          if (cart.methods.stock(id, cant + cartItem.cant)) {
            cartItem.cant += cant;
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No queda stock de ese producto!",
            });
          }
        } else {
          cart.products.push({ id, cant });
        }
        saveLocal();
      },
      remove: (id, cant) => {
        const cartItem = cart.methods.get(id);
        if (cartItem.cant - cant > 0) {
          cartItem.cant -= cant;
        } else {
          cart.products = cart.products.filter((item) => item.id !== id);
        }
        saveLocal();
      },
      count: () => {
        return cart.products.reduce((acc, item) => acc + item.cant, 0);
      },
      get: (id) => {
        const index = cart.products.findIndex((item) => item.id == id);
        return index >= 0 ? cart.products[index] : null;
      },
      getTotal: () => {
        const total = cart.products.reduce((acc, item) => {
          const found = db.methods.find(item.id);
          return acc + found.precio * item.cant;
        }, 0);
        return total;
      },
      stock: (id, cant) => {
        return db.products.find((item) => item.id == id).cant - cant >= 0;
      },
      purchase: () => {
        db.methods.remove(cart.products);
        cart.products = [];
      },
    },
  };
  // ahora el stores se renderiza cargando la informacion desde el archivo Json simulando una api
  db.loadProducts().then(() => {
    renderStore();
  });
  function renderStore() {
    const html = db.products.map((item) => {
      return `
        <div class="item">
          <div class="nombre">${item.nombre}</div>
          <div class="precio">${numberToCurrency(item.precio)}</div>
          <div class="cant">${item.cant} unidades</div>
          <div class="actions">
          <button class="add" data-id="${item.id}">Agregar al carrito</button>
          </div>
        
        </div>
      
      `;
    });
    document.querySelector("#store-container").innerHTML = html.join("");
  
    document.querySelectorAll(".item .actions .add").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = button.getAttribute("data-id");
        const item = db.methods.find(id);
  
        if (item && item.cant - 1 > 0) {
          cart.methods.add(id, 1);
          console.log(cart);
          renderCart();
        } else {
          console.log("Ya no queda stock");
        }
      });
    });
  }
  function renderCart() {
    const html = cart.products.map((item) => {
      const dbItem = db.methods.find(item.id);
      return `
      <div class="item">
        <div class="nombre">${dbItem.nombre}</div>
        <div class="precio">${numberToCurrency(dbItem.precio)}</div>
        <div class="cant">${item.cant} unidades</div>
        <div class="subtotal">Subtotal:${numberToCurrency(
          item.cant * dbItem.precio
        )}</div>
        <div class="actions">
          <button class="addOne" data-id="${item.id}">+</button>
          <button class="removeOne" data-id="${item.id}">-</button>
      </div>
      `;
    });
  
    const closeButton = `
      <div class="cart-header">
          <button class="bClose">Cerrar</button>
      </div>
    `;
    const purchaseButton =
      cart.products.length > 0
        ? `
      <div class="cart-actions">
        <button id="bPurchase">Comprar</button>  
      </div>
    `
        : "";
    const total = cart.methods.getTotal();
    const totalContainer = `<div class="total">Total:${numberToCurrency(
      total
    )}</div>`;
  
    const cartContainer = document.querySelector("#shopping-cart-container");
    cartContainer.classList.remove("hide");
    cartContainer.classList.add("show");
    cartContainer.innerHTML =
      closeButton + html.join("") + totalContainer + purchaseButton;
  
    document.querySelectorAll(".addOne").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = parseInt(button.getAttribute("data-id"));
        cart.methods.add(id, 1);
        renderCart();
      });
    });
    document.querySelectorAll(".removeOne").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = parseInt(button.getAttribute("data-id"));
        cart.methods.remove(id, 1);
        renderCart();
      });
    });
    document.querySelector(".bClose").addEventListener("click", (e) => {
      cartContainer.classList.remove("show");
      cartContainer.classList.add("hide");
    });
    const bPurchase = document.querySelector("#bPurchase");
    if (bPurchase) {
      bPurchase.addEventListener("click", (e) => {
        cart.methods.purchase();
        renderStore();
        renderCart();
        
      Toastify({
        text: "Compra relizada!! total:" + total,
        diration: 2000,
        gravity: "top",
        className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
      });
    }
  }
  // api para que aparezca el simbolo de $
  function numberToCurrency(n) {
    return new Intl.NumberFormat("en-US", {
      maximumSignificantDigits: 2,
      style: "currency",
      currency: "USD",
    }).format(n);
  }
  
  //funcion para guardar en storage
  const saveLocal = () => {
    localStorage.setItem("key-carrito", JSON.stringify(cart.products));
  };
  