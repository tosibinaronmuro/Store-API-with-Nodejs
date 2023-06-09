const Products = require("../Models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Products.find({}).select('name price')
  res.status(200).json({ products, nbHits: products.length });
};
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort,keys,numericFilters ,greaterThanFilters,lessThanFilters } = req.query;
  //   search query
  const queryObj = {};
  if (featured) {
    queryObj.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObj.company = company;
  }
  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }
  if(numericFilters){
    const operatorMap={
      '>':"$gt",
      '<':"$lt",
      '>=':"$gte",
      '<=':"$lte",
      '=':'$eq ',
    }
  
    const regEx=/\b(<|>|>=|=|<=)\b/g
    let filters=numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
    const options=['price','rating' ]
    filters=filters.split(',').forEach((item)=>{
      const [field,operator,value]=item.split('-')
      if(options.includes(field)){
  queryObj[field]={[operator]:Number(value)}
      }
    })
    console.log(queryObj)
  
  }
  let result = Products.find(queryObj);
  if (sort) {
    const sortList = sort.split(",").join(' ');
    // console.log(sort, sortList);
    result = result.sort(sortList)
  }
  else{
    result= result.sort('createdAt')
  }

  if(keys){
    const keyList = keys.split(",").join(' ');
    result=result.select(keyList)
  }
   const page=Number(req.query.page) || 1
    const limit=Number(req.query.limit) || 10
    const skip= (page-1)*limit;
    
 result=result.skip(skip).limit(limit)

console.log(req.query)
 if(greaterThanFilters){
  result=result.where({ price: { $gt:greaterThanFilters}});
}
 if(lessThanFilters){
  result=result.where({ price: { $lt:lessThanFilters}});
}


  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
