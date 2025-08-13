"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MetodosPago from '../components/MetodosPago';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [showMetodosPago, setShowMetodosPago] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (!cart || cart.length === 0) {
    return (
      <Container className="mt-4">
        <h2 className="text-center">Tu carrito está vacío</h2>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Carrito de Compras</h2>
      <Row>
        <Col md={8}>
          {cart.map((product) => (
            <Card key={product._id} className="mb-3">
              <Row className="g-0">
                <Col md={4}>
                  <img
                    src={product.image || 'https://via.placeholder.com/200'}
                    alt={product.name}
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title style={{ fontSize: "1rem" }}>
                      {product.name?.length > 40
                        ? product.name.slice(0, 40) + "..."
                        : product.name}
                    </Card.Title>
                    <Card.Text>
                      <strong>Precio: ${product.price}</strong>
                    </Card.Text>
                    <div className="d-flex align-items-center mb-2">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(product._id, product.quantity - 1)}
                        disabled={product.quantity <= 1}
                      >
                        -
                      </Button>
                      <span className="mx-2">{product.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(product._id, product.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(product._id)}
                    >
                      Eliminar
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Resumen del Pedido</Card.Title>
              <Card.Text>
                <strong>Total: ${calculateTotal().toFixed(2)}</strong>
              </Card.Text>
              <Button 
                variant="success" 
                className="w-100" 
                onClick={() => {
                  if (!isLoggedIn) {
                    router.push('/login?redirect=/cart');
                  } else {
                    setShowMetodosPago(true);
                  }
                }}
              >
                {isLoggedIn ? 'Proceder al Pago' : 'Iniciar Sesión para Pagar'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <MetodosPago show={showMetodosPago} onClose={() => setShowMetodosPago(false)} />
    </Container>
  );
}
