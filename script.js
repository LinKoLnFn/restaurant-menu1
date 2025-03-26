let order = {};

document.querySelectorAll(".tab-link").forEach(tab => {
    tab.addEventListener("click", function() {
        document.querySelectorAll(".tab-link").forEach(t => t.classList.remove("active"));
        this.classList.add("active");

        document.querySelectorAll(".menu-category").forEach(menu => menu.style.display = "none");
        document.getElementById(this.dataset.category).style.display = "block";
    });
});

function toggleDescription(element) {
    const description = element.nextElementSibling;
    if (description.style.display === "block") {
        description.style.display = "none";
    } else {
        document.querySelectorAll(".item-description").forEach(desc => desc.style.display = "none");
        description.style.display = "block";
    }
}

function addFirstItem(itemName, price) {
    if (!order[itemName]) {
        order[itemName] = { quantity: 0, price: price };
    }

    order[itemName].quantity = 1; // Устанавливаем количество 1 при первом добавлении
    updateQuantityDisplay(itemName);
    updateCart();

    // Скрываем кнопку "+Lisää" и показываем контролы количества
    const itemElement = document.querySelector(`.menu-item .add-btn[onclick="addFirstItem('${itemName}', ${price})"]`).parentElement;
    const addBtn = itemElement.querySelector('.add-btn');
    const quantityControls = itemElement.querySelector('.quantity-controls');
    addBtn.classList.add('hidden');
    quantityControls.style.display = 'flex';
}

function updateQuantity(itemName, price, change) {
    if (!order[itemName]) {
        order[itemName] = { quantity: 0, price: price };
    }

    order[itemName].quantity += change;

    if (order[itemName].quantity < 1) {
        order[itemName].quantity = 0;
    }

    if (order[itemName].quantity === 0) {
        delete order[itemName];
        // Возвращаем кнопку "+Lisää" и скрываем контролы количества
        const itemElement = document.querySelector(`#quantity-${itemName}`).parentElement.parentElement;
        itemElement.querySelector('.add-btn').classList.remove('hidden');
        itemElement.querySelector('.quantity-controls').style.display = 'none';
    }

    updateQuantityDisplay(itemName);
    updateCart();
}

function updateQuantityDisplay(itemName) {
    const quantityElement = document.getElementById(`quantity-${itemName}`);
    if (quantityElement) {
        quantityElement.textContent = order[itemName]?.quantity || 0;
    }
}

function updateCart() {
    let total = 0;
    for (let item in order) {
        total += order[item].price * order[item].quantity;
    }
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.querySelector('#cart-total').textContent = `${total.toFixed(2)} €`;
    cartIcon.classList.toggle('visible', total > 0);
}

function showOrder() {
    const modal = document.getElementById('order-modal');
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';

    for (let item in order) {
        if (order[item].quantity > 0) {
            const li = document.createElement('li');
            li.textContent = `${item} x${order[item].quantity} - ${(order[item].price * order[item].quantity).toFixed(2)} €`;
            orderList.appendChild(li);
        }
    }

    modal.style.display = 'block';
}

document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('order-modal').style.display = 'none';
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', (event) => {
    const modal = document.getElementById('order-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
