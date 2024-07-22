function showHome(){
    document.getElementById('home').style.display='block'
    document.getElementById('cart').style.display='none'
    document.getElementById('packages-user').style.display='none'
    document.getElementById('payment').style.display='none'
  }
  function showCart(){
    document.getElementById('cart').style.display='block'
    document.getElementById('home').style.display='none'
    document.getElementById('packages-user').style.display='none'
    document.getElementById('payment').style.display='none'
  }
  function showPayment(){
    document.getElementById('home').style.display='none'
    document.getElementById('cart').style.display='none'
    document.getElementById('packages-user').style.display='none'
    document.getElementById('payment').style.display='block'
  }
  function ShowPackages(){
    document.getElementById('home').style.display='none'
    document.getElementById('cart').style.display='none'
    document.getElementById('payment').style.display='none'
    document.getElementById('packages-user').style.display='block'
  }
  
  function showOrderPopup(fotourl, via, harga, id) {
    document.getElementById('order-img').src = fotourl;
    document.getElementById('order-title').innerText = "Via " + via;
    document.getElementById('order-price').innerText = harga;
    document.getElementById('order-id').value = id;
    document.getElementById('cart-id').value = id;
    document.getElementById('order-add').style.display = 'block';
  }
  
  function updatePaymentMethod() {
    var paymentOption = document.getElementById("payment-option").value;
    document.getElementById("payment-input").value = paymentOption;
    document.getElementById("payment-method").innerText = paymentOption;
  }
  
  function inputDataPayment(orderId, harga, formatedHarga){
    document.getElementById('payment-right').style.display='flex';
    document.getElementById('order-id-input').value = orderId;
    document.getElementById('show-harga').innerText = formatedHarga;
    document.getElementById('harga-input').value = harga;
  
    console.log(orderId, harga)
  } 