document.addEventListener('DOMContentLoaded', () => {
    console.log('Script loaded! DOM is ready.');

    // --- Placeholder для данных о товарах ---
    // Здесь будет массив объектов с информацией о красной и черной икре
    // (название, цена, описание, путь к изображению и т.д.)
    // Мы заполним его на следующем шаге.
    const productsData = [
        // {
        //     id: 1,
        //     name: "Икра Красная Кеты, 500 гр",
        //     originalPrice: 7500,
        //     discountPrice: 5250, // -30%
        //     description: "Крупная, зернистая икра кеты обладает нежным вкусом и тонким ароматом. Идеально для бутербродов и закусок.",
        //     characteristics: "Вид: кета; Вес: 500 гр; Упаковка: стеклянная банка; Срок годности: 6 месяцев.",
        //     imageUrl: "images/red-caviar-keta-500g.jpg",
        //     type: "red"
        // },
        // {
        //     id: 2,
        //     name: "Икра Красная Горбуши, 500 гр",
        //     originalPrice: 6800,
        //     discountPrice: 4760, // -30%
        //     description: "Классическая икра горбуши. Средний размер зерна, яркий вкус. Отличный выбор для любого стола.",
        //     characteristics: "Вид: горбуша; Вес: 500 гр; Упаковка: жестяная банка; Срок годности: 6 месяцев.",
        //     imageUrl: "images/red-caviar-gorbusha-500g.jpg",
        //     type: "red"
        // },
        // {
        //     id: 3,
        //     name: "Икра Чёрная Осетра, 50 гр (подарочная)",
        //     originalPrice: 15000,
        //     discountPrice: 10500, // -30%
        //     description: "Настоящая осетровая икра с деликатным ореховым послевкусием. Элитный деликатес для особых случаев.",
        //     characteristics: "Вид: осетр; Вес: 50 гр; Упаковка: стеклянная баночка; Срок годности: 6 месяцев.",
        //     imageUrl: "images/black-caviar-osetr-50g.jpg",
        //     type: "black"
        // }
        // ... и так далее
    ];

    // --- Имитация корзины ---
    // Мы будем хранить элементы корзины в localStorage, чтобы они сохранялись при перезагрузке страницы.
    let cartItems = JSON.parse(localStorage.getItem('caviarCart')) || [];

    // --- Функция обновления сводки корзины в хедере ---
    function updateCartSummary() {
        const cartCountElement = document.getElementById('cart-count');
        const cartTotalElement = document.getElementById('cart-total');

        const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
              const totalPrice = cartItems.reduce((sum, item) => sum + (item.discountPrice * item.quantity), 0);

        if (cartCountElement) cartCountElement.textContent = totalCount;
        if (cartTotalElement) cartTotalElement.textContent = totalPrice.toLocaleString('ru-RU'); // Форматирование для рублей
    }

    // --- Функция рендеринга товаров ---
    // Эта функция будет принимать данные из productsData и динамически создавать HTML-карточки
    function renderProducts() {
        const productListDiv = document.getElementById('product-list');
        if (!productListDiv) return; // Если элемент не найден, выходим

        // Пока что просто очищаем, на следующем шаге будем добавлять карточки
        productListDiv.innerHTML = '';

        // Здесь будет логика для productsData.forEach(product => { ... добавить карточку ... });
        // Например:
        // productsData.forEach(product => {
        //     const productCard = document.createElement('div');
        //     productCard.className = 'product-card';
        //     productCard.innerHTML = `
        //         <img src="${product.imageUrl}" alt="${product.name}">
        //         <h4>${product.name}</h4>
        //         <p class="old-price">${product.originalPrice.toLocaleString('ru-RU')} руб.</p>
        //         <p class="new-price">${product.discountPrice.toLocaleString('ru-RU')} руб.</p>
        //         <button class="btn btn-add-to-cart" data-id="${product.id}">В корзину</button>
        //     `;
        //     productListDiv.appendChild(productCard);
        // });
        console.log('Product rendering placeholder executed.');
    }


    // --- Инициализация при загрузке страницы ---
    updateCartSummary(); // Обновляем данные корзины в шапке
    renderProducts();    // Рендерим товары (пока что ничего не произойдет, так как productsData пуст)

    // --- Обработчики событий (будут добавлены позже) ---
    // Например, для кнопок "Добавить в корзину"
    // document.getElementById('product-list').addEventListener('click', (event) => {
    //     if (event.target.classList.contains('btn-add-to-cart')) {
    //         const productId = parseInt(event.target.dataset.id);
    //         // Логика добавления в корзину
    //     }
    // });
});
