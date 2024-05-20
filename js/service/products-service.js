const productList = () => {
    return fetch("http://localhost")
        .then((res) => res.json())
        .catch((err) => console.log(err));
}

const createProducts = (name, price, Image) => {
    return fetch("http://localhost", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            name,
            price,
            Image,
        })
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
/*
const deleteProducts = (id) => {
    return fetch("http://localhost", {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",

        }
        
}

export const servicesProducts = {
    productList,
    createProducts,
};
*/
const deleteProducts = (id) => {
    return fetch(\`http://localhost/products/\${id}\`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
        }
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error('Error al eliminar el producto');
        }
        return res.json();
    })
    .catch((err) => console.log(err));
}

export const servicesProducts = {
    productList,
    createProducts,
    deleteProducts, // Asegúrate de exportar también el método deleteProducts
};