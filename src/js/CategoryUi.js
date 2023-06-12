import Storage from "./Storage.js";
const titleCategory = document.querySelector("#category-title");
const descriptionCategory = document.querySelector("#category-description");
const addCategoryBtn = document.querySelector("#add-new-category");

class CategoryUi {
  constructor() {
    addCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    this.categories = [];
  }
  setApp() {
    this.categories = Storage.getAllCategories();
  }
  addNewCategory(e) {
    e.preventDefault();
    const title = titleCategory.value;
    const description = descriptionCategory.value;

    if (!title || !description) return;
    Storage.saveCategory({ title, description });
    this.categories = Storage.getAllCategories();
    this.createCategoryList();
    titleCategory.value = "";
    descriptionCategory.value = "";
  }
  createCategoryList() {
    let result = `<option class="bg-violet-200 text-violet-950" value="">
                  select category
                </option>`;
    this.categories.forEach((element) => {
      result += ` <option class="bg-violet-200 text-violet-950" value=${element.id}>
                 ${element.title}
                </option>`;
    });
    const categoryDom = document.getElementById("product-category");

    categoryDom.innerHTML = result;
  }
}
export default new CategoryUi();
