const Product = require('../model/ProductSchema');

/*const findAllProducts = (request,response) => {
  const product = new Product({
    {
        description:,
        qty:,
        images:,
        spec:,
        unitprice:,
        productCategory:
    }
  });
}*/

const findAllProducts = (request, response) => {
    Product.find().then(result => {
        response.status(200).json(result);
    })
}

module.exports = {
    findAllProducts
}