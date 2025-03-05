let cart = [];
let total = 0;

function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
    } else {
        cart.push({ id: cart.length + 1, name, price, quantity: 1, totalPrice: price });
    }

    updateCart();
}

function updateCart() {
    let cartTable = document.getElementById("cart");
    let totalElement = document.getElementById("total");
    let gstElement = document.getElementById("gst");
    let grandTotalElement = document.getElementById("grand-total");

    cartTable.innerHTML = "";
    total = 0;

    cart.forEach((item, index) => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>
                <button onclick="decreaseQuantity('${item.name}')">-</button>
                ${item.quantity}
                <button onclick="increaseQuantity('${item.name}')">+</button>
            </td>
            <td>₹${item.totalPrice}</td>
        `;

        cartTable.appendChild(row);
        total += item.totalPrice;
    });

    let gst = (total * 0.05).toFixed(2);
    let grandTotal = (total + parseFloat(gst)).toFixed(2);

    totalElement.textContent = total;
    gstElement.textContent = gst;
    grandTotalElement.textContent = grandTotal;
}

function increaseQuantity(name) {
    let item = cart.find(item => item.name === name);
    if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.price;
    }
    updateCart();
}

function decreaseQuantity(name) {
    let item = cart.find(item => item.name === name);
    if (item && item.quantity > 1) {
        item.quantity--;
        item.totalPrice = item.quantity * item.price;
    } else {
        cart = cart.filter(cartItem => cartItem.name !== name);
    }
    updateCart();
}

function printInvoice() {
    let invoiceContent = "<h1>Invoice</h1><table border='1'><tr><th>ID</th><th>Item</th><th>Quantity</th><th>Price</th></tr>";

    cart.forEach((item, index) => {
        invoiceContent += `<tr><td>${index + 1}</td><td>${item.name}</td><td>${item.quantity}</td><td>₹${item.totalPrice}</td></tr>`;
    });

    let gst = (total * 0.05).toFixed(2);
    let grandTotal = (total + parseFloat(gst)).toFixed(2);

    invoiceContent += `</table><h3>Total: ₹${total}</h3>`;
    invoiceContent += `<h3>GST (5%): ₹${gst}</h3>`;
    invoiceContent += `<h3>Grand Total: ₹${grandTotal}</h3>`;

    let newWindow = window.open("", "_blank");
    newWindow.document.write(invoiceContent);
    newWindow.document.close();
    newWindow.print();
}
