const express=require('express')
const router=express.Router()


const {getAllProducts,getAllProductsStatic}=require('../Controller/products')

router.route('/').get(getAllProducts)
router.route('/static').get(getAllProductsStatic)



module.exports=router