import ProductModel from "../models/productModel.js";

class ProductsController {
  getProducts(req, res, next) {
    var products = ProductModel.getAll();
    res.render("products", { products });
  }

  getAddProduct(req, res, next) {
    res.render("newProduct", {
      errorMessage: null,
    });
  }

  postAddProduct(req, res, next) {
    const { name, desc, price } = req.body;
    const imageUrl = "images/" + req.file.filename;
    ProductModel.add(name, desc, price, imageUrl);
    var products = ProductModel.getAll();
    res.render("products", { products });
  }

  getUpdateProductView(req, res, next) {
    // 1. if product exists then return view
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (productFound) {
      res.render("updateProduct", {
        product: productFound,
        errorMessage: null,
      });
    }
    // 2. else return errors.
    else {
      res.status(401).send("Product not found");
    }
  }

  postUpdateProduct(req, res) {
    ProductModel.update(req.body);
    var products = ProductModel.getAll();
    res.render("products", { products });
  }

  deleteProduct(req, res) {
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (!productFound) {
      return res.status(401).send("Product not found");
    }
    ProductModel.delete(id);
    var products = ProductModel.getAll();
    res.render("products", { products });
  }
}

export default ProductsController;
