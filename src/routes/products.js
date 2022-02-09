// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require ("multer"); 
const path = require ("path"); 

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************ MULTER ************

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
        cb(null, 'products' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer ({storage: storage})

/*** GET ALL PRODUCTS ***/ 
router.get ('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get ('/create', productsController.create); 
router.post ('/', productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get ('/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get ('/:id/edit', productsController.edit); 
router.put ('/:id', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
