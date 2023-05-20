const Products=require('../Models/product')

const getAllProductsStatic=async (req,res)=>{
     const products = await Products.find({featured:true })
    res.status(200).json({products, nbHits:products.length})
}
const getAllProducts =async (req,res)=>{
    const {featured}= req.query
    const queryObj={}
if (featured){
    queryObj.featured=featured ==='true'? true : false
}

    const products = await Products.find(queryObj )
    res.status(200).json({products, nbHits:products.length})
}


module.exports={getAllProducts,getAllProductsStatic}