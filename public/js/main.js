$(document).ready(function () {
  $("#owl-demo").owlCarousel({
    loop: true,
    items: 5, //10 items above 1000px browser width
    itemsDesktop: [1000, 4], //5 items between 1000px and 901px
    itemsDesktopSmall: [900, 2], // betweem 900px and 601px
    itemsTablet: [600, 2], //2 items between 600 and 0;
    itemsMobile: false, // itemsMobile disabled - inherit from itemsTablet option
    responsiveClass: true,
    responsive: {
      0: {
        items: 2,
        nav: true,
      },
      600: {
        items: 3,
        nav: false,
      },
      1000: {
        items: 3,
        nav: false,
        loop: true,
      },
    },
  });
});
function showWarning(id) {
  document.getElementById("delete-id").value = id;
  document.getElementById("warning").style.display = "block";
}
function showTable(id) {
  document.getElementById("update").value = id;
  document.getElementById("edit").style.display = "block";
}
function ShowWarningDelete(id) {
  document.getElementById("delete-id").value = id;
  document.getElementById("warning").style.display = "block";
}

function updateOrderDate() {
  const orderDate = document.getElementById("order-date").value;
  document.getElementById("add-order-date").value = orderDate;
  document.getElementById("add-cart-date").value = orderDate;
}

function showHome() {
  document.getElementById("home").style.display = "block";
  document.getElementById("cart").style.display = "none";
  document.getElementById("packages-user").style.display = "none";
  document.getElementById("payment").style.display = "none";
}
function showCart() {
  document.getElementById("cart").style.display = "block";
  document.getElementById("home").style.display = "none";
  document.getElementById("packages-user").style.display = "none";
  document.getElementById("payment").style.display = "none";
}
function showPayment() {
  document.getElementById("home").style.display = "none";
  document.getElementById("cart").style.display = "none";
  document.getElementById("packages-user").style.display = "none";
  document.getElementById("payment").style.display = "block";
}
function ShowPackages() {
  document.getElementById("home").style.display = "none";
  document.getElementById("cart").style.display = "none";
  document.getElementById("payment").style.display = "none";
  document.getElementById("packages-user").style.display = "block";
}

function showOrderPopup(fotourl, via, harga, id) {
  document.getElementById("order-img").src = fotourl;
  document.getElementById("order-title").innerText = "Via " + via;
  document.getElementById("order-price").innerText = harga;
  document.getElementById("order-id").value = id;
  document.getElementById("cart-id").value = id;
  document.getElementById("order-add").style.display = "block";
}

function updatePaymentMethod() {
  var paymentOption = document.getElementById("payment-option").value;
  document.getElementById("payment-input").value = paymentOption;
  document.getElementById("payment-method").innerText = paymentOption;
}

function inputDataPayment(orderId, harga, formatedHarga) {
  document.getElementById("payment-right").style.display = "flex";
  document.getElementById("order-id-input").value = orderId;
  document.getElementById("show-harga").innerText = formatedHarga;
  document.getElementById("harga-input").value = harga;

  console.log(orderId, harga);
}
  


