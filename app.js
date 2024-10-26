import express from "express";
import ProductsController from "./controllers/productController.js";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import validationMiddleware from "./middlewares/validateMiddleware.js";
import { uploadFile } from "./middlewares/fileUploadMiddleware.js";
import UserController from "./controllers/userController.js";
import session from "express-session";
import { auth } from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";
import { setLastVisited } from "./middlewares/lastVisitedMiddleware.js";

const app = express();

app.use(express.static("public"));

const productsController = new ProductsController();
const usersController = new UserController();

app.use(cookieParser());
app.use(setLastVisited);
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

app.get("/", auth, productsController.getProducts);
app.get("/add-product", auth, productsController.getAddProduct);
app.get("/update-product/:id", auth, productsController.getUpdateProductView);
app.post("/delete-product/:id", auth, productsController.deleteProduct);
app.post(
  "/",
  auth,
  uploadFile.single("imageUrl"),
  validationMiddleware,
  productsController.postAddProduct
);
app.post("/update-product", auth, productsController.postUpdateProduct);

app.get("/login", usersController.getLogin);
app.get("/register", usersController.getRegister);
app.post("/login", usersController.postLogin);
app.post("/register", usersController.postRegister);
app.get("/logout", usersController.getLogout);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
