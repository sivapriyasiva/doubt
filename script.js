document.addEventListener("DOMContentLoaded", function () {
  var productsContainer = document.getElementById("products");
  var productListContainer = document.querySelector(".product-list");
  var costListContainer = document.querySelector(".product-list1");
  var totalContainer = document.querySelector(".total");
  var totalAmount = 0;

  function addToCart(productName, productPrice) {
    var stockInfo = document.querySelector(".card .name[data-name='" + productName + "'] + .price + .stock-info .num");
    if (stockInfo) {
      var stockCount = parseInt(stockInfo.textContent);
      if (stockCount <= 0) {
        return; // Do not add to cart if stock is zero or negative
      }
    } 

    var productItem = document.createElement("div");
    productItem.textContent = productName;
    productListContainer.appendChild(productItem);

    var costItem = document.createElement("div");
    var cleanedPrice = parseFloat(productPrice.replace(/[^\d.]/g, ""));
    costItem.textContent = "₹ " + cleanedPrice.toLocaleString();
    totalAmount += cleanedPrice;
    totalContainer.textContent = "₹ " + totalAmount.toLocaleString();
    costListContainer.appendChild(costItem);

    // delete icon
    var deleteIcon = document.createElement("span");
    deleteIcon.classList.add("material-symbols-outlined", "delete-icon");
    deleteIcon.textContent = "delete";
    deleteIcon.style.cursor = "pointer";
    deleteIcon.style.color = "gray";
    deleteIcon.style.fontSize = "16px";

    costItem.appendChild(deleteIcon);

    // when click delete icon then specific row is deleted
    deleteIcon.addEventListener("click", function () {
      totalAmount -= cleanedPrice;
      totalContainer.textContent = "₹ " + totalAmount.toLocaleString();
      costItem.remove();
      productItem.remove();
      if (stockInfo) {
        var stockCount = parseInt(stockInfo.textContent);
        stockCount++;
        stockInfo.textContent = stockCount;
        
      }
    });

    // Decrease stock count
    stockCount--;
    stockInfo.textContent = stockCount;

    // when stock is 0 then add to card is changed out of stock.
    if (stockCount == 0) {
      var addButton = document.querySelector(".card .name[data-name='" + productName + "'] + .price + .stock-info + div .add_cart");
      addButton.textContent = "Out of Stock";
      addButton.style.backgroundColor="gray";
      addButton.style.color="white";
      addButton.style.cursor="not-allowed";
      addButton.disabled = true;
    }
    
    // Add blinking effect 
    var stockInfoContainer = stockInfo.closest('.stock-info');
    if (stockCount < 5) {
      stockInfoContainer.classList.add('blink-red');
    } else {
      stockInfoContainer.classList.remove('blink-red');
    }
    
  }

  // User can add html code and create new cards
  var coffeeTable =
    '<div class="card">' +
    '<div class="product-name">' +
    '<div class="name" data-name="Coffee Tables">Coffee Tables</div>' +
    '<div class="price"> ₹ 4,000 </div>' +
    '<div class="stock-info">Stock only <span class="num">7</span> pieces</div>' +
    '</div>' +
    '<div>' +
    '<div class="add_cart">Add to Cart</div>' +
    '</div>' +
    '</div>';
  var tv =
    '<div class="card">' +
    '<div class="product-name">' +
    '<div class="name" data-name="Tv">Tv</div>' +
    '<div class="price"> ₹ 8,000 </div>' +
    '<div class="stock-info">Stock only <span class="num">7</span> pieces</div>' +
    "</div>" +
    "<div>" +
    '<div class="add_cart"> Add to Cart</div>' +
    "</div>" +
    "</div>";

  var ac =
    '<div class="card">' +
    '<div class="product-name">' +
    '<div class="name" data-name="Ac">Ac</div>' +
    '<div class="price"> ₹ 10,000 </div>' +
    '<div class="stock-info">Stock only <span class="num">7</span> pieces</div>' +
    "</div>" +
    "<div>" +
    '<div class="add_cart"> Add to Cart</div>' +
    "</div>" +
    "</div>";

  var bed =
    '<div class="card">' +
    '<div class="product-name">' +
    '<div class="name" data-name="Bed">Bed</div>' +
    '<div class="price"> ₹ 70,000 </div>' +
    '<div class="stock-info">Stock only <span class="num">7</span> pieces</div>' +
    "</div>" +
    "<div>" +
    '<div class="add_cart"> Add to Cart</div>' +
    "</div>" +
    "</div>";

  var fan =
    '<div class="card">' +
    '<div class="product-name">' +
    '<div class="name" data-name="Fan">Fan</div>' +
    '<div class="price"> ₹ 13,000 </div>' +
    '<div class="stock-info">Stock only <span class="num">7</span> pieces</div>' +
    "</div>" +
    "<div>" +
    '<div class="add_cart"> Add to Cart</div>' +
    "</div>" +
    "</div>";

  var cobord =
    '<div class="card">' +
    '<div class="product-name">' +
    '<div class="name" data-name="Cobord">Cobord</div>' +
    '<div class="price"> ₹ 40,00,000 </div>' +
    '<div class="stock-info">Stock only <span class="num">7</span> pieces</div>' +
    "</div>" +
    "<div>" +
    '<div class="add_cart"> Add to Cart</div>' +
    "</div>" +
    "</div>";

  
  productsContainer.insertAdjacentHTML("beforeend", coffeeTable);
  productsContainer.insertAdjacentHTML("beforeend", tv);
  productsContainer.insertAdjacentHTML("beforeend", ac);
  productsContainer.insertAdjacentHTML("beforeend", bed);
  productsContainer.insertAdjacentHTML("beforeend", fan);
  productsContainer.insertAdjacentHTML("beforeend", cobord);

  // Add to Cart function
  document.querySelectorAll(".add_cart").forEach(function (button) {
    button.addEventListener("click", function () {
      var productName =
        this.closest(".card").querySelector(".name").textContent;
      var productPrice =
        this.closest(".card").querySelector(".price").textContent;

      addToCart(productName, productPrice);
    });
  });

  // function to filter products based on search input
  function filterProducts() {
    var searchBoxValue = document
      .getElementById("searchBox")
      .value.toLowerCase();

    document
      .querySelectorAll(".product-name")
      .forEach(function (productNameElement) {
        var productName = productNameElement.textContent.toLowerCase();
        var productCard = productNameElement.closest(".card");

        if (productName.includes(searchBoxValue)) {
          productCard.style.display = "flex";
        } else {
          productCard.style.display = "none";
        }
      });
  }

  document
    .getElementById("searchBox")
    .addEventListener("input", filterProducts);
});

