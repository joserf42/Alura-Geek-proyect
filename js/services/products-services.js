const productList = () => {
    return fetch("http://localhost:3000/product")
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

//funcion createProducts crear productos

const createProducts = (name, price, Image) => {
    return fetch("http://localhost:3000/product", {
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

//funcion deleteProducts-borrar productos

const deleteProducts = (id) => {
    return fetch(`http://localhost:3000/product/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",

        }
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
        
}

export const servicesProducts = {
    productList,
    createProducts,
    deleteProducts,
};



