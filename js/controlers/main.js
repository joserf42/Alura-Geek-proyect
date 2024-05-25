import { servicesProducts } from "../services/products-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

// Función createCard crea una nueva tarjeta de producto

function createCard (name, price, image, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
    <div class="img-container">
        <img src="${image}" alt="${name}"> 
    </div>

    <div class="card-container--info">
        <div class="card-container--parrafo"
        <p>${name}</p>
        <p>$ ${price}</p>
        </div>
        <div class="card-container--value">
            
            <button type="button" class="delete-button" data-id="${id}">
                <img class="img-delete" src="./assets/btnDelete.png" alt="Eliminar">
            </button>
        </div>
    </div>
    ` 
    card.querySelector(".delete-button").addEventListener("click", (event) => {
        const id = event.target.closest(".delete-button").dataset.id;
        servicesProducts.deleteProducts(id) //eliminar el producto
            .then(() => {
                card.remove();
                console.log(`Producto con id \${id} eliminado`);
            })
            .catch((err) => console.log(err));
    });

    productContainer.appendChild(card);
    return card;
}

const render = async () => {
    try {
        const listProducts = await servicesProducts.productList();
        listProducts.forEach(product => {
            productContainer.appendChild(
                createCard(
                    product.name, 
                    product.price, 
                    product.image, 
                    product.id
                )
            )        
        });
    } catch (error) {
        console.log(error);
    }
};

render();

// formulario

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    servicesProducts.createProducts(name, price, image)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
        render(); // Esto volverá a renderizar la lista de productos con el nuevo producto añadido
});