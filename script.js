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
    const dipSelect = document.getElementById(`dip-${itemName}`);
    const dip = dipSelect ? dipSelect.value : null;
    const fullItemName = dip ? `${itemName} (${dip})` : itemName;

    if (!order[fullItemName]) {
        order[fullItemName] = { quantity: 0, price: price };
    }

    order[fullItemName].quantity = 1;
    updateQuantityDisplay(itemName);
    updateCart();

    const itemElement = document.querySelector(`.menu-item .add-btn[onclick="addFirstItem('${itemName}', ${price})"]`).parentElement;
    itemElement.querySelector('.add-btn').classList.add('hidden');
    itemElement.querySelector('.quantity-controls').style.display = 'flex';
}

function updateQuantity(itemName, price, change) {
    const dipSelect = document.getElementById(`dip-${itemName}`);
    const dip = dipSelect ? dipSelect.value : null;
    const fullItemName = dip ? `${itemName} (${dip})` : itemName;

    if (!order[fullItemName]) {
        order[fullItemName] = { quantity: 0, price: price };
    }

    order[fullItemName].quantity += change;

    if (order[fullItemName].quantity < 1) {
        order[fullItemName].quantity = 0;
    }

    if (order[fullItemName].quantity === 0) {
        delete order[fullItemName];
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
        const dipSelect = document.getElementById(`dip-${itemName}`);
        const dip = dipSelect ? dipSelect.value : null;
        const fullItemName = dip ? `${itemName} (${dip})` : itemName;
        quantityElement.textContent = order[fullItemName]?.quantity || 0;
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

document.getElementById('submit-order').addEventListener('click', () => {
    const tableNumber = document.getElementById('table-number').value;
    if (!tableNumber) {
        alert('Syötä pöydän numero!');
        return;
    }

    const orderDetails = {
        table: tableNumber,
        items: order,
        total: Object.values(order).reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2),
        timestamp: new Date().toISOString()
    };

    console.log('Lähetetty tilaus:', orderDetails); // Для теста
    alert(`Tilaus lähetetty pöytään ${tableNumber}!`);
    document.getElementById('order-modal').style.display = 'none';
    order = {};
    updateCart();
    document.querySelectorAll('.quantity-controls').forEach(control => control.style.display = 'none');
    document.querySelectorAll('.add-btn').forEach(btn => btn.classList.remove('hidden'));
});

window.addEventListener('click', (event) => {
    const modal = document.getElementById('order-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
