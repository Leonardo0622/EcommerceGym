// const Product = require("../models/product.model");


// // Obtener todos los productos
// const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Error al obtener productos", error });
//   }
// };

// // Obtener un producto por ID
// const getProductById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const product = await Product.findById(id);
//     if (!product) {
//       return res.status(404).json({ message: "Producto no encontrado" });
//     }
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: "Error al buscar producto", error });
//   }
// };

// // Crear un nuevo producto
// const createProduct = async (req, res) => {
//   try {
//     const { name, price } = req.body;

//     if (!name || price === undefined) {
//       return res.status(400).json({ message: "Nombre y precio son obligatorios" });
//     }

//     const newProduct = new Product({ name, price });
//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(400).json({ message: "Error al crear producto", error });
//   }
// };

// module.exports = { getProducts, getProductById, createProduct };
const Product = require("../models/product.model");


// Obtener todos los productos

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar productos", error });
  }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar producto", error });
  }
};


// Crear producto
const createProduct = async (req, res) => {
  const { name, price, description, image, stock } = req.body;

if (!name || !price || !description || !image || !stock) {
  return res.status(400).json({ message: "Todos los campos son obligatorios" });
}

  // try
  try {
    const newProduct = new Product(
      {
        name,
        price,
        description,
        image,
        stock
      }
    );
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto", error });
  }
};

// Actualizar producto
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image, stock } = req.body;
  try {
    const updated = await Product.findByIdAndUpdate(
      id,
      { name, price, description, image, stock },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto", error });
  }
};

// Eliminar producto
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error });
  }
};


module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
