var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productImage = document.getElementById("productImage");
var searchInput = document.getElementById("searchInput");
var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");
var productList = [];
var indexUpdate = 0;
if (localStorage.getItem("productsStore") !== null) {
  productList = JSON.parse(localStorage.getItem("productsStore"));
  displayData();
}
function addProduct() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
    image: productImage.files[0]?.name
      ? `images/${productImage.files[0].name}`
      : "images/no.png",
  };
  productList.push(product);
  localStorage.setItem("productsStore", JSON.stringify(productList));
  displayData();
  clear();
}
function clear() {
  productName.value = null;
  productPrice.value = null;
  productDescription.value = null;
  productCategory.value = null;
  productImage.value = null;
  productName.classList.remove("is-valid");
  productPrice.classList.remove("is-valid");
  productDescription.classList.remove("is-valid");
  productCategory.classList.remove("is-valid");
  productImage.classList.remove("is-valid");
}
function displayData() {
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    cartona += `
            <tr>
          <td>${i}</td>
          <td>${productList[i].name}</td>
          <td>${productList[i].price}</td>
          <td>${productList[i].category}</td>
          <td>${productList[i].description}</td>
          <td>
            <img
              style="width: 100px"
              src="${productList[i].image}"
              alt="product"
            />
          </td>
          <td>
            <button onClick="(setFormUpdate(${i}))" class="btn btn-outline-warning btn-sm">Update</button>
            <button onclick="deleteItem(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
          </td>
        </tr>
    `;
  }
  document.getElementById("tableData").innerHTML = cartona;
}
function deleteItem(index) {
  productList.splice(index, 1);
  localStorage.setItem("productsStore", JSON.stringify(productList));
  displayData();
}
function search() {
  var word = searchInput.value;
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(word.toLowerCase())) {
      cartona += `
              <tr>
            <td>${i}</td>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].category}</td>
            <td>${productList[i].description}</td>
            <td>
              <img
                style="width: 100px"
                src="${productList[i].image}"
                alt="product"
              />
            </td>
            <td>
              <button onClick="(setFormUpdate(${i}))" class="btn btn-outline-warning btn-sm">Update</button>
              <button onclick="deleteItem(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
            </td>
          </tr>
      `;
    }
  }
  document.getElementById("tableData").innerHTML = cartona;
}
function validation(element) {
  var regex = {
    productName: /^[A-Z]\w{2,}/,
    productPrice: /^[1-9]\d{2,5}$/,
    productDescription: /^.{2,}$/m,
    productCategory: /^(Screen|Mobile|Laptop|Electronics|Others)$/i,
  };
  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.replace("d-block", "d-none");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.replace("d-none", "d-block");
  }
}
function setFormUpdate(index) {
  productName.value = productList[index].name;
  productPrice.value = productList[index].price;
  productCategory.value = productList[index].category;
  productDescription.value = productList[index].description;

  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
  indexUpdate = index;
}
function updateProduct() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
    image: productImage.files[0]?.name
      ? `images/${productImage.files[0].name}`
      : "images/no.png",
  };
  productList.splice(indexUpdate, 1, product);
  displayData();
  clear();
  btnAdd.classList.remove("d-none");
  btnUpdate.classList.add("d-none");
  localStorage.setItem("productsStore", JSON.stringify(productList));
}
