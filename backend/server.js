const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;
const products = [
  {
    ind: 1,
    name: "julgran",
    price: 199.99,
    url: "../foto/julgran.jpg",
    imgs: [
      "../foto/julgran1.jpg",
      "../foto/julgran2.jpg",
      "../foto/julgran3.jpg"
    ]
  },
  {
    ind: 2,
    name: "glitter",
    price: 49.99,
    url: "../foto/glitter.jpg",
    imgs: [
      "../foto/glitter1.jpg",
      "../foto/glitter2.jpg",
      "../foto/glitter3.jpg"
    ]
  },
  {
    ind: 3,
    name: "julglass",
    price: 99.99,
    url: "../foto/julglass.jpg",
    imgs: [
      "../foto/julglass1.jpg",
      "../foto/julglass2.jpg",
      "../foto/julglass3.jpg"
    ]
  },
  {
    ind: 4,
    name: "julpyjamas",
    price: 399.99,
    url: "../foto/julpyjamas.jpg",
    imgs: [
      "../foto/julpyjamas1.jpg",
      "../foto/julpyjamas2.jpg",
      "../foto/julpyjamas3.jpg"
    ]
  },
  {
    ind: 5,
    name: "julgranskulor",
    price: 89.99,
    url: "../foto/julgranskulor.jpg",
    imgs: [
      "../foto/julgranskulor1.jpg",
      "../foto/julgranskulor2.jpg",
      "../foto/julgranskulor3.jpg"
    ]
  },
  {
    ind: 6,
    name: "julservetter",
    price: 49.99,
    url: "../foto/julservetter.jpg",
    imgs: [
      "../foto/julservetter1.jpg",
      "../foto/julservetter2.jpg",
      "../foto/julservetter3.jpg"
    ]
  },
  {
    ind: 7,
    name: "julstjärnor",
    price: 79.99,
    url: "../foto/julstjärnor.jpg",
    imgs: [
      "../foto/julstjärnor1.jpg",
      "../foto/julstjärnor2.jpg",
      "../foto/julstjärnor3.jpg"
    ]
  },
  {
    ind: 8,
    name: "jul ljuslinga",
    price: 129.99,
    url: "../foto/ljuslinga.jpg",
    imgs: [
      "../foto/ljuslinga1.jpg",
      "../foto/ljuslinga2.jpg",
      "../foto/ljuslinga3.jpg"
    ]
  },
  {
    ind: 9,
    name: "jul Tomtas",
    price: 150,
    url: "../foto/tomtar.jpg",
    imgs: ["../foto/tomtar1.jpg", "../foto/tomtar2.jpg", "../foto/tomtar3.jpg"]
  },
  {
    ind: 10,
    name: "jul Träkarusell",
    price: 20.2,
    url: "../foto/träkarusell.jpg",
    imgs: [
      ".../foto/träkarusell1.jpg",
      ".../foto/träkarusell2.jpg",
      ".../foto/träkarusell3.jpg"
    ]
  },
  {
    ind: 11,
    name: "jul dörrkrans",
    price: 90,
    url: "../foto/dörrkrans.jpg",
    imgs: [
      "../foto/dörrkrans1.jpg",
      "../foto/dörrkrans2.jpg",
      "../foto/dörrkrans3.jpg"
    ]
  },
  {
    ind: 12,
    name: "jul ljusstak",
    price: 159.99,
    url: "../foto/ljusstake.jpg",
    imgs: [
      "../foto/ljusstake1.jpg",
      "../foto/ljusstake2.jpg",
      "../foto/ljusstake3.jpg"
    ]
  }
];
let cart = [];

// Route to get all products
app.get("/products", (req, res) => {
  res.json({ products });
});

// Route to add product to cart
app.post("/addproduct", (req, res) => {
  try {
    const { name, price, counter, url, ind } = req.body;
    if (!name || !price || !counter || !url || !ind) {
      return res.status(400).json({ error: "Invalid product data" });
    }
    cart.push({ name, price, counter, url, ind });
    res.status(200).json({ cart });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to delete product from cart
app.delete("/deletecart/:id", (req, res) => {
  const { id } = req.params;
  try {
    const itemIndex = cart.findIndex((item) => item.ind === Number(id));
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Product not found" });
    }
    cart.splice(itemIndex, 1);
    res.status(200).json({ message: "Product successfully deleted", cart });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to get all items in cart
app.get("/cart", (req, res) => {
  res.json({ cart });
});

// Route to get product by ID
app.get("/product/:ind", (req, res) => {
  const { ind } = req.params;
  try {
    // Convert `ind` to a number before comparing
    const findItem = products.find((item) => item.ind === Number(ind));
    if (findItem) {
      res.status(200).json(findItem);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
