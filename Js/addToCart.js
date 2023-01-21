import { foodItems } from "./foodItems.js";

function displayItems() {
  var curries = document.getElementById("curries");
  var rice = document.getElementById("rice");
  var bread = document.getElementById("bread");

  const curriesItems = foodItems.filter((item) => item.category == "curries");
  const riceItems = foodItems.filter((item) => item.category == "rice");
  const breadItems = foodItems.filter((item) => item.category == "bread");

  curriesItems.map((item) => {
    var itemCard = document.createElement("div");
    itemCard.setAttribute("id", "item-card");

    var img = document.createElement("img");
    img.src = item.image;

    var itemName = document.createElement("p");
    itemName.setAttribute("id", "item-name");
    itemName.innerText = item.title;

    var itemPrice = document.createElement("p");
    itemPrice.setAttribute("id", "item-price");
    itemPrice.innerText = "Price :" + item.price;

    var outerDiv = document.createElement("button");
    outerDiv.setAttribute("class", "addbutton add-to-cart");
    outerDiv.setAttribute("id", item.id);
    outerDiv.innerHTML = "Add to Cart";

    itemCard.appendChild(img);
    itemCard.appendChild(itemName);
    itemCard.appendChild(itemPrice);
    itemCard.appendChild(outerDiv);

    curries.appendChild(itemCard);
  });
  riceItems.map((item) => {
    var itemCard = document.createElement("div");
    itemCard.setAttribute("id", "item-card");

    var img = document.createElement("img");
    img.src = item.image;

    var itemName = document.createElement("p");
    itemName.setAttribute("id", "item-name");
    itemName.innerText = item.title;

    var itemPrice = document.createElement("p");
    itemPrice.setAttribute("id", "item-price");
    itemPrice.innerText = "Price :" + item.price;

    var outerDiv = document.createElement("button");
    outerDiv.setAttribute("class", "addbutton add-to-cart");
    outerDiv.setAttribute("id", item.id);
    outerDiv.innerHTML = "Add to Cart";

    itemCard.appendChild(img);
    itemCard.appendChild(itemName);
    itemCard.appendChild(itemPrice);
    itemCard.appendChild(outerDiv);

    rice.appendChild(itemCard);
  });
  breadItems.map((item) => {
    var itemCard = document.createElement("div");
    itemCard.setAttribute("id", "item-card");

    var img = document.createElement("img");
    img.src = item.image;

    var itemName = document.createElement("p");
    itemName.setAttribute("id", "item-name");
    itemName.innerText = item.title;

    var itemPrice = document.createElement("p");
    itemPrice.setAttribute("id", "item-price");
    itemPrice.innerText = "Price :" + item.price;

    var outerDiv = document.createElement("button");
    outerDiv.setAttribute("class", "addbutton add-to-cart");
    outerDiv.setAttribute("id", item.id);
    outerDiv.innerHTML = "Add to Cart";

    itemCard.appendChild(img);
    itemCard.appendChild(itemName);
    itemCard.appendChild(itemPrice);
    itemCard.appendChild(outerDiv);

    bread.appendChild(itemCard);
  });
}
displayItems();

document.querySelectorAll(".add-to-cart").forEach((item) => {
  item.addEventListener("click", addToCart);
});

var cartData = [];

function addToCart() {
  var itemToAdd = this.parentNode.childNodes[1].innerText;
  var itemObj = foodItems.find((element) => element.title == itemToAdd);

  var index = cartData.indexOf(itemObj);
  if (index === -1) {
    cartData = [...cartData, itemObj];
  } else if (index > -1) {
    alert("Added to cart!");
  }
  document.getElementById("orderCount").innerText = cartData.length;
  totalAmount();
  cartItems();
}

function cartItems() {
  var tableBody = document.getElementById("cardItem");
  tableBody.innerHTML = "";
  cartData.map((item) => {
    var tableRow = document.createElement("tr");

    var rowData1 = document.createElement("td");
    var img = document.createElement("img");
    img.src = item.image;
    rowData1.appendChild(img);

    var rowData2 = document.createElement("td");
    rowData2.innerText = item.title;

    var rowData3 = document.createElement("td");
    var btn1 = document.createElement("button");
    btn1.setAttribute("class", "decrease-item");
    btn1.innerText = "-";
    var span = document.createElement("span");
    span.innerText = item.quantity;
    var btn2 = document.createElement("button");
    btn2.setAttribute("class", "increase-item");
    btn2.innerText = "+";

    rowData3.appendChild(btn1);
    rowData3.appendChild(span);
    rowData3.appendChild(btn2);

    var rowData4 = document.createElement("td");
    rowData4.innerText = item.price;

    tableRow.appendChild(rowData1);
    tableRow.appendChild(rowData2);
    tableRow.appendChild(rowData3);
    tableRow.appendChild(rowData4);

    tableBody.appendChild(tableRow);
  });

  document.querySelectorAll(".increase-item").forEach((item) => {
    item.addEventListener("click", incrementItem);
  });

  document.querySelectorAll(".decrease-item").forEach((item) => {
    item.addEventListener("click", decrementItem);
  });
}

function incrementItem() {
  let itemToInc = this.parentNode.previousElementSibling.innerText;
  console.log(itemToInc);
  var incObj = cartData.find((element) => element.title == itemToInc);
  incObj.quantity += 1;

  currPrice =
    (incObj.price * incObj.quantity - incObj.price * (incObj.quantity - 1)) /
    (incObj.quantity - 1);
  incObj.price = currPrice * incObj.quantity;
  totalAmount();
  cartItems();
}

var currPrice = 0;
function decrementItem() {
  let itemToInc = this.parentNode.previousElementSibling.innerText;
  let decObj = cartData.find((element) => element.title == itemToInc);
  let ind = cartData.indexOf(decObj);
  if (decObj.quantity > 1) {
    currPrice =
      (decObj.price * decObj.quantity - decObj.price * (decObj.quantity - 1)) /
      decObj.quantity;
    decObj.quantity -= 1;
    decObj.price = currPrice * decObj.quantity;
  } else {
    cartData.splice(ind, 1);
    document.getElementById("orderCount").innerText = cartData.length;

    if (cartData.length < 1 && flag) {
      alert("Currently no item in cart!");
      document.getElementById("curries").classList.toggle("display-none");
      document.getElementById("rice").classList.toggle("display-none");
      document.getElementById("bread").classList.toggle("display-none");
      document.getElementById("cartDetails").classList.toggle("display-none");
      document.getElementById("totalPayment").classList.toggle("display-none");

      flag = false;
    }
  }
  totalAmount();
  cartItems();
}

function totalAmount() {
  var sum = 0;
  cartData.map((item) => {
    sum += item.price;
  });
  document.getElementById("total-item").innerText =
    "Total Item : " + cartData.length;
  document.getElementById("total-price").innerText = "Total Price : Rs." + sum;
}

document.getElementById("orderCount").addEventListener("click", cartToggle);

var flag = false;
function cartToggle() {
  if (cartData.length > 0) {
    document.getElementById("curries").classList.toggle('display-none');
    document.getElementById("rice").classList.toggle('display-none');
    document.getElementById("bread").classList.toggle('display-none');
    document.getElementById("cartDetails").classList.toggle('display-none');
    document.getElementById("totalPayment").classList.toggle('display-none');

    flag = true;
  } else {
    alert("Currently no item in cart!");
  }
}
