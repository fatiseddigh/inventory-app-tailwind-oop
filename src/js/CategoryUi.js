import Storage from "./Storage.js";
const titleCategory = document.querySelector("#category-title");
const descriptionCategory = document.querySelector("#category-description");
const addCategoryBtn = document.querySelector("#add-new-category");
const toggleAddCategoryBtn = document.querySelector("#toggle-add-category");
const categoryWrapper = document.querySelector("#category-wrapper");
const cancelAddCategory = document.querySelector("#cancel-add-category");

class CategoryUi {
  constructor() {
    addCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    toggleAddCategoryBtn.addEventListener("click", (e) =>
      this.toggleAddCategory(e)
    );
    cancelAddCategory.addEventListener("click", (e) =>
      this.toggleAddCategory(e)
    );
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
    categoryWrapper.classList.add("hidden");
    toggleAddCategoryBtn.classList.hidden("hidden");
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
  toggleAddCategory(e) {
    categoryWrapper.classList.remove("hidden");
    toggleAddCategoryBtn.classList.add("hidden");
  }
}
export default new CategoryUi();
