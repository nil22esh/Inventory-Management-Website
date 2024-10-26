import UserModel from "../models/userModel.js";
import ProductModel from "../models/productModel.js";

export default class UserController {
  getRegister(req, res) {
    res.render("register");
  }

  getLogin(req, res) {
    res.render("login", { errorMessage: null });
  }

  postRegister(req, res) {
    const { name, email, password } = req.body;
    // console.log("---->", req.body);
    UserModel.add(name, email, password);
    res.render("login", { errorMessage: null });
  }

  postLogin(req, res) {
    const { email, password } = req.body;
    const user = UserModel.isValidUser(email, password);
    if (!user) {
      return res.render("login", { errorMessage: "Invalid Credentials!" });
    }
    req.session.userEmail = email;
    var products = ProductModel.getAll();
    return res.render("products", {
      products,
      userEmail: req.session.userEmail,
    });
  }

  getLogout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/login");
      }
    });
    res.clearCookie("lastVisit");
  }
}
