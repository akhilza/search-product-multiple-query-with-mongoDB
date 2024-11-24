import { addNewProduct, getAllProduct, searchProducts, addAllNewProduct } from "../controllers/productController";

const routes = (app) => {
    app.route("/product")
        .get(getAllProduct)

        .post(addNewProduct)

    app.route("/product/all")
        .post(addAllNewProduct)


     // Search by Name/Category and Price Range
     // GET /products/search?search=Smartphone&minPrice=500&maxPrice=1000

    //  Filter by Price Range Only
    // GET /products/search?minPrice=100&maxPrice=200

    // Search by Name/Category Only:
    // GET /products/search?search=Laptop

    app.route("/product/search")
        .get(searchProducts)
}

export default routes;