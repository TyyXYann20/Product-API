const db = require("../DB/db.connection");

class ProductController {
    async getAll(req, res) {
        try {
            const result = await db.query("SELECT * FROM product_testing");
            res.json({
                totalPhone: result.length,
                list: result
            });
        } catch (err) {
            res.json({ err: true, message: err });
        }
    }

    async getAlls(req, res) {
        try {
            const result = await db.query("SELECT * FROM products");
            res.json({
                totalPhone: result.length,
                list: result
            });
        } catch (err) {
            res.json({ err: true, message: err });
        }
    }

    async getOne(req, res) {
        const product_id = req.params.id;
        try {
            const result = await db.query("SELECT * FROM product_testing WHERE product_id=?", [product_id]);
            res.json({ product_info: result });
        } catch (err) {
            res.json({ err: true, message: err });
        }
    }

    async insertProduct(req, res) {
        const { product_name, stock, price, description } = req.body;
        try {
            const result = await db.query(
                "INSERT INTO product_testing (`product_name`, `price`, `stock`, `description`) VALUES (?,?,?,?)",
                [product_name, price, stock, description]
            );
            res.json({
                message: "Product has been inserted into the table.............!",
                data: result
            });
        } catch (err) {
            res.json({ err: true, message: err });
        }
    }

    async insertProductWithImage(req, res) {
        const { product_name, stock, price, description } = req.body;
        let image = req.body.image;
        if (req.file) {
            image = req.file.filename;
        }

        try {
            const result = await db.query(
                "INSERT INTO products (`product_name`, `price`, `stock`, `description`, `image`) VALUES (?,?,?,?,?)",
                [product_name, price, stock, description, image]
            );
            res.json({
                message: "Product with image has been inserted into the table.............!",
                data: result
            });
        } catch (err) {
            res.json({ err: true, message: err });
        }
    }

    async updateProduct(req, res) {
        const product_id = req.params.id;
        const { product_name, stock, price, description } = req.body;

        try {
            const result = await db.query(
                "UPDATE product_testing SET `product_name`=?, `price`=?, `stock`=?, `description`=? WHERE product_id=?",
                [product_name, price, stock, description, product_id]
            );
            res.json({
                message: `Product ${product_id} has been updated from the table`,
                data: result
            });
        } catch (err) {
            res.json({ err: true, message: err });
        }
    }

    async deleteProduct(req, res) {
        const product_id = req.params.id;

        try {
            const result = await db.query("DELETE FROM product_testing WHERE product_id = ?", [product_id]);
            res.json({
                message: `Record product_id: ${product_id} has been deleted from the table`,
                data: result
            });
        } catch (err) {
            res.json({ err: true, message: err });
        }
    }
}

module.exports = new ProductController();
