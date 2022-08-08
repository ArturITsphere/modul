"use strict";
document.body.onload = initProducts;

function init() {    
    // document.body.addEventListener("load", (e) => {
    //     alert('load event listener');
    //     initProducts();
    // }, true);
}

function initProducts() {
    const productsElement = document.getElementById("productId");
    console.debug(productsElement);
    
    for (let i = 0; i < items.length; i++) {
        let htmlElementString = `
            <div data-product-id="${items[i].id}" class="product">
                <img class="product-img" src="img/${items[i].imgUrl}"/>
                <div class="product-name">${items[i].name}</div>
                <div>Price: ${items[i].price}$</div>
                <div>${items[i].orderInfo.inStock} left in stock</div>
                <input type="button" value="Add to cart" class="add-to-cart-button" onclick="addToCart(${items[i].id})"/>
                <div>${items[i].orderInfo.reviews}% Positive reviews</div>
            </div>
        `;

        productsElement.insertAdjacentHTML(
            "beforeend",
            htmlElementString
        );
    }
}