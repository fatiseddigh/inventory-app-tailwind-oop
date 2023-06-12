const products = [
  {
    id: 1,
    title: "React.js",
    category: "frontend",
    createdAt: "2022-06-12T07:58:37.594Z",
  },
  {
    id: 2,
    title: "Node.js",
    category: "backend",
    createdAt: "2018-08-12T07:58:37.594Z",
  },
  {
    id: 3,
    title: "Vue.js",
    category: "backend",
    createdAt: "2021-06-12T07:58:37.594Z",
  },
];
const categories = [
  {
    id: 1,
    title: "frontend",
    description: "this is frontend",
    createdAt: "2021-06-12T07:58:37.594Z",
  },
  {
    id: 2,
    title: "backend",
    description: "this is backend",
    createdAt: "2019-08-12T07:58:37.594Z",
  },
  {
    id: 3,
    title: "ui",
    description: "this is ui",
    createdAt: "2023-06-12T07:58:37.594Z",
  },
];
export default class Storage {
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];
    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
    return sortedCategories;
  }
  static saveCategory(categorySaved) {
    const savedCategories = Storage.getAllCategories();
    // exist or not
    const existedCategory = savedCategories.find(
      (cate) => cate.id === categorySaved.id
    );
    if (existedCategory) {
      // edit
      existedCategory.title = categorySaved.title;
      existedCategory.description = categorySaved.description;
    } else {
      //new
      categorySaved.id = new Date().getTime();
      categorySaved.createdAt = new Date().toISOString();
      savedCategories.push(categorySaved);
    }
    localStorage.setItem("category", JSON.stringify(categorySaved));
  }
  static getAllProducts() {
    const savedProducts = JSON.parse(localStorage.getItem("all-product")) || [];
    const sortedProduct = savedProducts.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
    return sortedProduct;
  }
  static saveProduct(productToSave) {
    const savedProduct = Storage.getAllProducts();
    const isExisted = savedProduct.find((p) => p.id === productToSave.id);
    if (isExisted) {
      isExisted.title = categorySaved.title;
      isExisted.category = categorySaved.category;
      isExisted.quantity = categorySaved.quantity;
    } else {
      productToSave.id = new Date().getTime();
      productToSave.createdAt = new Date().toISOString();
      savedProduct.push(productToSave);
    }
    localStorage.setItem("all-product", JSON.stringify(productToSave));
  }
}
