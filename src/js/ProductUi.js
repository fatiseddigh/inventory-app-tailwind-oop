import Storage from "./Storage.js";
const titleProduct = document.querySelector("#product-title");
const quantityProduct = document.querySelector("#product-quantity");
const categoryProduct = document.querySelector("#product-category");
const addProductBtn = document.querySelector("#add-new-product");
const searchInput = document.querySelector("#search-input");
const selectedSort = document.querySelector("#sort-products");

class ProductUi {
  constructor() {
    addProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    selectedSort.addEventListener("change", (e) => this.sortProducts(e));
    this.products = [];
  }
  setApp() {
    this.products = Storage.getAllProducts();
  }
  addNewProduct(e) {
    e.preventDefault();
    const title = titleProduct.value;
    const quantity = quantityProduct.value;
    const category = categoryProduct.value;
    if (!title || !quantity || !category) return;
    Storage.saveProduct({ title, quantity, category });
    this.products = Storage.getAllProducts();
    this.createProductList(this.products);
    titleProduct.value = "";
    quantityProduct.value = "";
    categoryProduct.value = "";
  }
  createProductList(products) {
    let result = "";
    products.forEach((item) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id == item.category
      );
      result += `  <div class="flex items-center justify-between mb-3">
            <span class="text-violet-950"> ${item.title} </span>
            <div class="flex items-center gap-x-3">
              <span class="text-violet-950">${new Date().toLocaleDateString(
                "fa-IR"
              )}</span>
              <span
                class="block px-3 py-0.5 border border-violet-950 text-sm rounded-2xl text-violet-950"
                >${selectedCategory.title}</span
              >
              <span
                class="flex justify-center items-center w-7 h-7 border-violet-950 rounded-full bg-violet-50 border-2 text-violet-950"
                >${item.quantity}</span
              >
              <button
                class="border px-2 py-0.5 rounded-2xl border-red-500 text-red-600" data-id=${
                  item.id
                }
              >
                delete
              </button>
            </div>
          </div>`;
    });
    const productDom = document.querySelector("#products-list");

    productDom.innerHTML = result;
  }
  searchProducts(e) {
    const value = e.target.value.trim().toLowerCase();
    const filteredProduct = this.products.filter((p) =>
      p.title.toLowerCase().includes(value)
    );
    this.createProductList(filteredProduct);
  }
  sortProducts(e) {
    const value = e.target.value;
    this.products = Storage.getAllProducts(value);
    this.createProductList(this.products);
  }
}
export default new ProductUi();
