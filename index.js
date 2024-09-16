const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 8090;
const productController = require("./controllers/productController");

const {uploadImage} = require("./util/services")

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

// Define routes
app.get("/api/phone/getAll", productController.getAll);
app.get("/api/phone/getAlls", productController.getAlls);
app.get("/api/phone/getOne/:id", productController.getOne);
app.post("/api/phone/testInsert", productController.insertProduct);
app.post("/api/phone/insertProduct", uploadImage.single("upload-img"), productController.insertProductWithImage);
app.put("/api/phone/update/:id", productController.updateProduct);
app.delete("/api/phone/delete/:id", productController.deleteProduct);


// Start Web server
app.listen(PORT, () => {
    console.log(`Web server running on: http://localhost:${PORT}`);
});
