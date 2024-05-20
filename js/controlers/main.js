import { servicesProducts } from "../service/products-service.js";


const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard (name, price, image, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
    <div class="img-container">
        <img src="${image}" alt="${name}">
    </div>

    <div class="card-container--info">
        <p>${name}</p>
        <div class="card-container--value">
            <p>$ ${price}</p>
            <button class="delete-button" data-id="${id}">
                <img src="" alt="Eliminar">
            </button>
        </div>
    </div>
    `;

    card.querySelector(".delete-button").addEventListener("click", (event) => {
        const id = event.target.closest(".delete-button").dataset.id;
        servicesProducts.deleteProducts(id)
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
            createCard(product.name, product.price, product.image, product.id);
        });
    } catch (error) {
        console.error(error);
    }
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    servicesProducts.createProducts(name, price, image)
        .then(() => {
            // Aquí puedes agregar código para actualizar la vista o manejar la respuesta
            console.log('Producto creado con éxito');
            render(); // Esto volverá a renderizar la lista de productos con el nuevo producto añadido
        })
        .catch((err) => console.error(err));
});

render();
    /*
    productContainer.appendChild(card);
    return card;

}

const render = async () => {
    try {
        const listProducts = await servicesProducts.productList();
        
        listProducts.forEach(product => {
            productContainer.appendChild(
                createCard(product.name, product.price, product.image, product.id)
                
            )
            });
    } catch (error) {
        console.log(error)
        
    }

};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    servicesProducts
    .createProducts(name, price, image)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
})
render();
*/
