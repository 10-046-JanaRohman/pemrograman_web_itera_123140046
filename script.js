"use strict";

const CART_STORAGE_KEY = "kantinku-pos-cart";
const DISCOUNT_THRESHOLD = 50000;
const DISCOUNT_RATE = 0.1;

const itemForm = document.getElementById("item-form");
const itemNameInput = document.getElementById("item-name");
const itemPriceInput = document.getElementById("item-price");
const itemQuantityInput = document.getElementById("item-quantity");
const cartBody = document.getElementById("cart-body");
const emptyState = document.getElementById("empty-state");
const itemCount = document.getElementById("item-count");
const subtotalValue = document.getElementById("subtotal-value");
const discountValue = document.getElementById("discount-value");
const discountCaption = document.getElementById("discount-caption");
const totalValue = document.getElementById("total-value");
const paymentInput = document.getElementById("payment");
const paymentStatus = document.getElementById("payment-status");
const changeValue = document.getElementById("change-value");
const resetButton = document.getElementById("reset-button");

let cart = loadCart();

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

function loadCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    return Array.isArray(savedCart) ? savedCart.filter(isValidCartItem) : [];
  } catch (error) {
    console.warn("Keranjang tersimpan tidak dapat dibaca.", error);
    return [];
  }
}

function isValidCartItem(item) {
  return typeof item?.id === "string"
    && typeof item?.name === "string"
    && item.name.length >= 3
    && Number.isFinite(item?.price)
    && item.price >= 500
    && Number.isInteger(item?.quantity)
    && item.quantity >= 1;
}

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function getCartSummary() {
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = subtotal >= DISCOUNT_THRESHOLD ? subtotal * DISCOUNT_RATE : 0;
  return { subtotal, discount, total: subtotal - discount };
}

function renderCart() {
  const { subtotal, discount, total } = getCartSummary();
  cartBody.innerHTML = cart.map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${escapeHtml(item.name)}</td>
      <td>${formatRupiah(item.price)}</td>
      <td>${item.quantity}</td>
      <td>${formatRupiah(item.price * item.quantity)}</td>
      <td><button class="delete-button" type="button" data-delete-id="${item.id}" aria-label="Hapus ${escapeHtml(item.name)}">Hapus</button></td>
    </tr>
  `).join("");

  emptyState.hidden = cart.length !== 0;
  itemCount.textContent = `${cart.length} ${cart.length === 1 ? "item" : "item"}`;
  subtotalValue.textContent = formatRupiah(subtotal);
  discountValue.textContent = `- ${formatRupiah(discount)}`;
  totalValue.textContent = formatRupiah(total);
  discountCaption.textContent = discount > 0 ? "(10%)" : "(min. Rp50.000)";
  updatePayment(total);
}

function updatePayment(total) {
  const payment = Number(paymentInput.value);
  paymentStatus.className = "payment-status";

  if (!paymentInput.value || Number.isNaN(payment) || payment < 0) {
    paymentStatus.textContent = "Masukkan uang bayar untuk menghitung kembalian.";
    changeValue.textContent = formatRupiah(0);
    return;
  }

  const difference = payment - total;
  if (difference < 0) {
    paymentStatus.classList.add("warning");
    paymentStatus.textContent = `Uang kurang ${formatRupiah(Math.abs(difference))}.`;
    changeValue.textContent = formatRupiah(0);
    return;
  }

  paymentStatus.classList.add("success");
  paymentStatus.textContent = "Pembayaran mencukupi. Transaksi siap diselesaikan.";
  changeValue.textContent = formatRupiah(difference);
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", "\"": "&quot;"
  })[character]);
}

function setFieldError(input, message) {
  const errorElement = document.getElementById(`${input.id}-error`);
  input.closest(".field-group").classList.toggle("has-error", Boolean(message));
  errorElement.textContent = message;
}

function validateItemForm() {
  const name = itemNameInput.value.trim();
  const price = Number(itemPriceInput.value);
  const quantity = Number(itemQuantityInput.value);
  const nameError = name.length < 3 ? "Nama barang wajib diisi minimal 3 karakter." : "";
  const priceError = !Number.isFinite(price) || price < 500 ? "Harga satuan minimal Rp500." : "";
  const quantityError = !Number.isInteger(quantity) || quantity < 1 ? "Jumlah harus berupa bilangan bulat minimal 1." : "";

  setFieldError(itemNameInput, nameError);
  setFieldError(itemPriceInput, priceError);
  setFieldError(itemQuantityInput, quantityError);
  return { isValid: !nameError && !priceError && !quantityError, name, price, quantity };
}

itemForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const item = validateItemForm();
  if (!item.isValid) return;

  cart.push({ id: crypto.randomUUID(), name: item.name, price: item.price, quantity: item.quantity });
  saveCart();
  itemForm.reset();
  itemQuantityInput.value = 1;
  renderCart();
  itemNameInput.focus();
});

[itemNameInput, itemPriceInput, itemQuantityInput].forEach((input) => {
  input.addEventListener("input", () => setFieldError(input, ""));
});

cartBody.addEventListener("click", (event) => {
  const deleteButton = event.target.closest("[data-delete-id]");
  if (!deleteButton) return;
  cart = cart.filter((item) => item.id !== deleteButton.dataset.deleteId);
  saveCart();
  renderCart();
});

paymentInput.addEventListener("input", () => updatePayment(getCartSummary().total));

resetButton.addEventListener("click", () => {
  if (cart.length && !window.confirm("Kosongkan seluruh keranjang dan mulai transaksi baru?")) return;
  cart = [];
  localStorage.removeItem(CART_STORAGE_KEY);
  paymentInput.value = "";
  renderCart();
  itemNameInput.focus();
});

renderCart();
