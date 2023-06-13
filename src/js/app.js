import CategoryUi from "./CategoryUi.js";
import ProductUi from "./ProductUi.js";
document.addEventListener("DOMContentLoaded", () => {
  CategoryUi.setApp();
  ProductUi.setApp();
  CategoryUi.createCategoryList();
  ProductUi.createProductList(ProductUi.products);
});
