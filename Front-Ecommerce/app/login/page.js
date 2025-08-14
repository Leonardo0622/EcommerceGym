'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Form, Input, Button, Card, message } from 'antd';
import axios from 'axios';

function LoginComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [redirectPath, setRedirectPath] = useState('/');

  useEffect(() => {
    const redirect = searchParams.get('redirect');
    if (redirect) {
      setRedirectPath(redirect);
    }
  }, [searchParams]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('https://ecommercegym.onrender.com/api/auth/login', values);
      const { token, user } = response.data;
      
      // Guardar datos en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('user', JSON.stringify(user));
      message.success('Inicio de sesión exitoso');
      if (user.role === "admin") {
        router.push('/dashboard');
      } else {
        router.push(redirectPath);
      }
    } catch (error) {
      message.error('Credenciales incorrectas');
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #d3d3d3 0%, #f0f2f5 100%)',
      }}
    >
      <Card
        title={<div style={{ textAlign: 'center', fontSize: '1.5rem', color: '#4a4a4a' }}>Iniciar Sesión</div>}
        style={{
          width: 400,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          backgroundColor: '#ffffff',
          border: '1px solid #e0e0e0',
        }}
      >
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            label={<span style={{ color: '#555' }}>Email</span>}
            name="email"
            rules={[{ required: true, message: 'Por favor ingrese su email' }]}
          >
            <Input
              style={{
                backgroundColor: '#fafafa',
                borderColor: '#ccc',
                borderRadius: '6px',
              }}
            />
          </Form.Item>
  
          <Form.Item
            label={<span style={{ color: '#555' }}>Contraseña</span>}
            name="password"
            rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
          >
            <Input.Password
              style={{
                backgroundColor: '#fafafa',
                borderColor: '#ccc',
                borderRadius: '6px',
              }}
            />
          </Form.Item>
  
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{
                backgroundColor: '#4a90e2',
                borderColor: '#4a90e2',
                borderRadius: '6px',
                height: '40px',
                fontSize: '16px',
              }}
            >
              Iniciar Sesión
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <LoginComponent />
    </Suspense>
  );
}  