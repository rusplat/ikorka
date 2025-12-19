// Данные о товарах
const products = [
    { id: 1, name: "Икра черная осетр (500г)", price: 21000, oldPrice: 30000, img: "black.jpg.webp" },
    { id: 2, name: "Икра красная кета (500г)", price: 4500, oldPrice: 6500, img: "red.jpg" },
    { id: 3, name: "Икра красная горбуша (500г)", price: 3800, oldPrice: 5500, img: "red2.jpg" }
 ];

// Корзина, загружаем из LocalStorage или создаем пустую
let cart = JSON.parse(localStorage.getItem('cart')) || {}; // Структура: {productId: {name: "...", price: N, qty: M}}

// Сохраняет корзину в LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Обновляет сводку корзины в шапке и отрисовывает детальную корзину
function updateCart() {
    let totalCount = 0;
    let totalPrice = 0;
    for (let id in cart) {
        totalCount += cart[id].qty;
        totalPrice += cart[id].qty * cart[id].price;
    }

    // Обновляем шапку
    if (document.getElementById('cart-count')) {
        document.getElementById('cart-count').textContent = totalCount;
        document.getElementById('cart-sum').textContent = totalPrice.toLocaleString('ru-RU');
    }

    localStorage.setItem('totalPrice', totalPrice); // Сохраняем для страницы оплаты
    
    renderCartDetails(); // Отрисовываем детальный вид корзины
    toggleCheckoutButton(totalCount > 0); // Показываем/скрываем кнопку "Оформить заказ"
    
    saveCart(); // Сохраняем состояние корзины
}

// Добавляет товар в корзину
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    if (!cart[id]) {
        cart[id] = { 
            name: product.name, 
            price: product.price, 
            qty: 0 
        };
    }
    cart[id].qty++;
    updateCart();
}

// Изменяет количество товара в корзине (change: +1 или -1)
function changeQuantity(id, change) {
    if (cart[id]) {
        cart[id].qty += change;
        if (cart[id].qty <= 0) {
            delete cart[id]; // Удалить товар, если количество <= 0
        }
    }
    updateCart();
}

// Удаляет товар полностью из корзины
function removeItemFromCart(id) {
    delete cart[id];
    updateCart();
}

// Отрисовывает детальный вид корзины
function renderCartDetails() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalBottom = document.getElementById('cart-total-bottom');
    if (!cartItemsDiv || !cartTotalBottom) return;

    cartItemsDiv.innerHTML = ''; // Очищаем предыдущее содержимое
    let currentTotal = 0;

    const itemsInCart = Object.keys(cart).length;

    if (itemsInCart === 0) {
        cartItemsDiv.innerHTML = '<p>Ваша корзина пуста.</p>';
        document.getElementById('cart-details-section').style.display = 'none'; // Скрываем детальную корзину, если она пуста
    } else {
        for (let id in cart) {
            const item = cart[id];
            currentTotal += item.qty * item.price;
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span class="item-name">${item.name}</span>
                <div class="quantity-controls">
                    <button onclick="changeQuantity(${id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQuantity(${id}, 1)">+</button>
                </div>
                <span class="item-price">${(item.qty * item.price).toLocaleString('ru-RU')} руб.</span>
                <button onclick="removeItemFromCart(${id})" class="remove-item-btn">X</button>
            `;
            cartItemsDiv.appendChild(itemElement);
        }
        document.getElementById('cart-details-section').style.display = 'block'; // Показываем детальную корзину
    }
    cartTotalBottom.textContent = currentTotal.toLocaleString('ru-RU');
}

// Переключает видимость главной кнопки "Оформить заказ"
function toggleCheckoutButton(show) {
    const checkoutButton = document.getElementById('main-checkout-btn');
    if (checkoutButton) {
        checkoutButton.style.display = show ? 'block' : 'none';
    }
}

// Очищает всю корзину
function clearCart() {
    cart = {};
    updateCart();
}

// --- Обработчики событий и первоначальная загрузка ---
document.addEventListener('DOMContentLoaded', () => {
    console.log('Script loaded! DOM is ready.');

    // Рендер товаров на главной странице (index.html)
    if (document.getElementById('catalog')) {
        const grid = document.createElement('div');
        grid.className = 'product-grid';
        products.forEach(p => {
            grid.innerHTML += `
                <div class="card">
                    <img src="${p.img}" alt="${p.name}">
                    <h3>${p.name}</h3>
                    <p class="old-price">${p.oldPrice.toLocaleString('ru-RU')} р.</p>
                    <p class="new-price">${p.price.toLocaleString('ru-RU')} р.</p>
                    <button onclick="addToCart(${p.id})" class="btn-add-to-cart" style="width:auto">В корзину</button>
                </div>
            `;
        });
        document.getElementById('catalog').appendChild(grid);
    }
    
    // Изначальное обновление корзины при загрузке любой страницы, где подключен скрипт
    updateCart();

    // Обработчик для кнопки "Очистить корзину"
    const clearCartBtn = document.getElementById('clear-cart-button');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
    
    // Обработчик для клика по сводке корзины в шапке (показать/скрыть детальный вид)
    const cartStatusHeader = document.getElementById('cart-status');
    if (cartStatusHeader) {
        cartStatusHeader.addEventListener('click', () => {
            const cartDetailsSection = document.getElementById('cart-details-section');
            if (cartDetailsSection) {
                cartDetailsSection.style.display = cartDetailsSection.style.display === 'none' ? 'block' : 'none';
            }
        });
    }
});

// Делаем функции доступными глобально для onclick атрибутов в HTML
window.addToCart = addToCart;
window.changeQuantity = changeQuantity;
window.removeItemFromCart = removeItemFromCart;
window.clearCart = clearCart;
