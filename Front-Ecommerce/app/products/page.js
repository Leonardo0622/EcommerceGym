"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Spinner,
  ButtonGroup,
} from "react-bootstrap";
import axios from 'axios';
import styles from '../styles/products.module.css';

const API_URL = 'http://localhost:5000/api/products';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const { addToCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calcular productos actuales
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = products.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className={styles.productsContainer}>
      <h1 className={styles.title}>Nuestros Productos</h1>
      <div className={styles.productGrid}>
        {loading ? (
          <Spinner animation="border" />
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          currentProducts.map((product) => (
            <div key={product._id} className={styles.productCard}>
              <div className={styles.productImage}>
                <img
                  src={product.image || 'https://via.placeholder.com/200'}
                  alt={product.name}
                />
              </div>
              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <div className={styles.price}>${product.price}</div>
                <div className={styles.stock}>Stock: {product.stock}</div>
                <div className={styles.description}>{product.description}</div>
                <Button variant="success" size="sm" onClick={() => addToCart(product)}>
                  Agregar 🛒
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Botones de paginación numerados */}
      <div className="d-flex justify-content-center mt-4">
        <ButtonGroup>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={i + 1 === currentPage ? "primary" : "outline-primary"}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ProductsPage;
