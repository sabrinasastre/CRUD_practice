const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("products", {products:products})
		//puede ser también  o {producto: products}
		// Do the magic
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
	},

	// Create - Form to create
	create: (req, res) => {
		res.render ("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const {name, price, discount, category, description}= req.body
		const nuevoProducto = {
			id: products [products.length -1].id + 1,
			name: name,
			price: price,
			discount: discount,
			category: category,
			description: description
		}
		products.push (nuevoProducto);
		let productJSON = JSON.stringify (products);
		fs.writeFileSync(productsFilePath, productJSON);

		res.redirect("/"); 
	},

	// Update - Form to edit
	edit: (req, res) => {
		let id = req.params.id
		let productToEdit = products.find(product=>product.id == id)
		res.render ("product-edit-form", {productToEdit})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;