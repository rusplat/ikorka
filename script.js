const products = [
    { id: 1, name: "Икра черная осетр (500г)", price: 21000, oldPrice: 30000, img: "black.jpg.webp" },
    { id: 2, name: "Икра красная кета (500г)", price: 4500, oldPrice: 6500, img: "red.jpg" },
    { id: 3, name: "Икра красная горбуша (500г)", price: 3800, oldPrice: 5500, img: "red2.jpg" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || {};

function updateCart() {
    let count = 0;
    let sum = 0;
    for (let id in cart) {
        count += cart[id].qty;
        sum += cart[id].qty * cart[id].price;
    }
    if(document.getElementById('cart-count')) {
        document.getElementById('cart-count').textContent = count;
        document.getElementById('cart-sum').textContent = sum;
    }
    localStorage.setItem('totalPrice', sum);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(id) {
    const p = products.find(x => x.id === id);
    if (!cart[id]) cart[id] = { price: p.price, qty: 0 };
    cart[id].qty++;
    updateCart();
}

if (document.getElementById('catalog')) {
    const grid = document.createElement('div');
    grid.className = 'product-grid';
    products.forEach(p => {
        grid.innerHTML += `
            <div class="card">
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p class="old-price">${p.oldPrice} р.</p>
                <p class="new-price">${p.price} р.</p>
                <button onclick="addToCart(${p.id})" class="btn-large" style="width:auto">Добавить</button>
            </div>
        `;
    });
    document.getElementById('catalog').appendChild(grid);
    updateCart();
}
