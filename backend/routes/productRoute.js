import express from "express"
import * as productC from "../controllers/productController.js"

const router = express.Router()

router.get('/products',productC.getAllProduct)
router.get('/products/three',productC.getThreeProduct)
router.get('/products/:id',productC.getProductById)
router.post('/products',productC.postProduct)
router.put('/products/:id',productC.putProduct)
router.delete('/products/:id',productC.deleteProduct)
router.get('/products/brands/:id',productC.getProductByBrandId)

export default router