const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  // Root - Show all products
  index: (req, res) => {
    res.render("products", { products: products });
    //puede ser también  o {producto: products}
    // Do the magic
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    let id = req.params.id;
    let product = products.find((product) => product.id == id);
    res.render("detail", {
      product,
    });
  },

  // Create - Form to create
  create: (req, res) => {
    res.render("product-create-form");
  },

  // Create -  Method to store
  store: (req, res) => {
    //lo siguiente es un destructuring:
    const { name, price, discount, category, description } = req.body;

    const nuevoProducto = {
      id: products[products.length - 1].id + 1,
      name: name,
      price: price,
      discount: discount,
      category: category,
      description: description,
      image: req.file.fieldname,
    };
    /* OTRA FORMA CON SPREAD OPERATOR:  
		    const nuevoProducto = {
			id: products[products.length -1].id + 1,
			...req.body, 
			image:req.file.filename
		  } */

    products.push(nuevoProducto); // let newProducts = [...products, nuevoProducto];
    let productJSON = JSON.stringify(products);
    fs.writeFileSync(productsFilePath, productJSON);

    res.redirect("/");
  },

  // Update - Form to edit
  edit: (req, res) => {
    let id = req.params.id;
    let productToEdit = products.find((product) => product.id == id);
    res.render("product-edit-form", { productToEdit });
  },
  // Update - Method to update
  update: (req, res) => {
    let id = req.params.id;
    let productToEdit = products.find((product) => product.id == id);

    /* 
	let image;
    if (req.files[0] != undefined) {
      image = req.files[0].fieldname;
    } else {
      image = productToEdit.image;
    } */

    productToEdit = {
      id: productToEdit.id,
      ...req.body,
      image: req.file ? req.file.fieldname : productToEdit.image,
    };
    let newProducts = products.map((product) => {
      if (product.id == productToEdit.id) {
        return (product = { ...productToEdit });
      }
      return product;
    });
    let productJSON = JSON.stringify(newProducts);
    fs.writeFileSync(productsFilePath, productJSON);
    res.redirect("/");
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    let id = req.params.id;
    let finalProducts = products.filter((product) => product.id != id);
    let productJSON = JSON.stringify(finalProducts);
    fs.writeFileSync(productsFilePath, productJSON);
    res.redirect("/");
    //Recarga la pagina para que se actualice despues de borrar el
  },
};

module.exports = controller;
