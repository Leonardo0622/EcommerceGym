'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Input, InputNumber, message, Image, Row, Col, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import styles from '../styles/admin.module.css';
import AdminNavbar from "../components/AdminNavbar"; // Importamos el navbar

const API_URL = 'http://localhost:5000/api/products';

const handleFormError = () => {
  message.error('Todos los campos deben estar llenos');
};

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Estado para saber si es admin

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); // Obtener el usuario completo de localStorage
    if (user && user.role === 'admin') {
      setIsAdmin(true); // Verificar si es admin
    } else {
      window.location.href = "/login"; // Redirigir a login si no es admin
    }
    fetchProducts();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: getAuthHeaders()
      });
      setProducts(response.data);
    } catch (error) {
      message.error('Error al cargar los productos');
    }
  };

  const handleAddProduct = async (values) => {
    setLoading(true);
    try {
      if (editingProduct) {
        await axios.put(`${API_URL}/${editingProduct._id}`, values, {
          headers: getAuthHeaders()
        });
        message.success('Producto actualizado exitosamente');
      } else {
        await axios.post(API_URL, values, {
          headers: getAuthHeaders()
        });
        message.success('Producto agregado exitosamente');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      message.error('Error al guardar el producto');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: getAuthHeaders()
      });
      message.success('Producto eliminado exitosamente');
      fetchProducts();
    } catch (error) {
      message.error('Error al eliminar el producto');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingProduct(null);
  };

  return (
    <div className={styles.adminContainer}>
      {/* Mostrar solo si el usuario es admin */}
      
      
      <h1 className={styles['adminContainer h1']}>Dashboard de Productos</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
          className={styles.submitButton}
        >
          Agregar Producto 
        </Button>
      </div>
      <div className={styles.productGrid}>
        {products.map(product => (
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
            </div>
            <div className={styles.actions}>
              <Button
                icon={<EditOutlined />}
                onClick={() => handleEdit(product)}
                className={styles.downloadButton}
              />
              <Button
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(product._id)}
                className={styles.deleteButton}
              />
            </div>
          </div>
        ))}
      </div>

      <Modal
        title={editingProduct ? "Editar Producto" : "Agregar Nuevo Producto"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleAddProduct}
          onFinishFailed={handleFormError}
          layout="vertical"
          className={styles.customForm}
        >
          <Form.Item
            name="name"
            label="Nombre del Producto "
            rules={[{ required: true, message: 'Por favor ingrese el nombre del producto' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Precio"
            rules={[{ required: true, message: 'Por favor ingrese el precio' }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: 'Por favor ingrese el stock' }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Descripción"
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="image"
            label="URL de la Imagen"
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editingProduct ? "Actualizar" : "Agregar"} Producto
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard;
