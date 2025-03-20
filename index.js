const express = require("express");
const app = express();

app.use(express.json());

let products = [
    { id: 1, name: "Laptop", price: 1500 },
    { id: 2, name: "Mouse", price: 50 },
    { id: 3, name: "Keyboard", price: 100 },
    { id: 4, name: "Monitor", price: 700 },
    { id: 5, name: "Headphones", price: 120 },
    { id: 6, name: "Smartphone", price: 2000 },
    { id: 7, name: "Tablet", price: 900 },
    { id: 8, name: "Smartwatch", price: 300 }
];

app.get("/api/products", (req, res) => {
    res.json(products);
});

app.get("/api/products/:id", (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
});

app.post("/api/products", (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) return res.status(400).json({ msg: "Invalid data" });

    const newProduct = { id: products.length + 1, name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.put("/api/products/:id", (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ msg: "Product not found" });

    const { name, price } = req.body;
    if (!name || !price) return res.status(400).json({ msg: "Invalid data" });

    product.name = name;
    product.price = price;
    res.json(product);
});

app.patch("/api/products/:id", (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ msg: "Product not found" });

    const { name, price } = req.body;
    if (name) product.name = name;
    if (price) product.price = price;

    res.json(product);
});

app.delete("/api/products/:id", (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ msg: "Product not found" });

    products.splice(index, 1);
    res.json({ msg: "Product deleted" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
