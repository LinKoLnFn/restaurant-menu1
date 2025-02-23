let order = [];

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

function addToOrder(itemName, price) {
    order.push({ name: itemName, price: price });
    updateCart();
}

function updateCart() {
    const total = order.reduce((sum, item) => sum + item.price, 0);
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.querySelector('#cart-total').textContent = `${total.toFixed(2)} €`;
    cartIcon.classList.add('visible');
}

function showOrder() {
    const modal = document.getElementById('order-modal');
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';

    order.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price.toFixed(2)} €`;
        orderList.appendChild(li);
    });

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
