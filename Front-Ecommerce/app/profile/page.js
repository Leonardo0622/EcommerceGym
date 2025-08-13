'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/Perfil.module.css';

export default function Perfil() {
  const [perfil, setPerfil] = useState({
    name: '',
    email: '',
    newPassword: '',
    profileImage: ''
  });
  const [imagePreview, setImagePreview] = useState(null);

  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(true);

  // Cargar perfil al inicio
  useEffect(() => {
    console.log('Iniciando fetchPerfil...');
    const fetchPerfil = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          console.log('Profile data received:', data);
          console.log('Profile image path:', data.profileImage);
          setPerfil(data);
          
          // Verificar si la imagen existe
          if (data.profileImage) {
            const imgUrl = `http://localhost:5000/uploads/${data.profileImage}`;
            console.log('Trying to load image from:', imgUrl);
            
            // Intentar cargar la imagen
            const img = new Image();
            img.onload = () => {
              console.log('Image loaded successfully from:', imgUrl);
              setImagePreview(imgUrl);
            };
            img.onerror = (e) => {
              console.error('Error loading image:', e);
              console.error('Failed URL:', imgUrl);
            };
            img.src = imgUrl;
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'profileImage') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
        setPerfil({
          ...perfil,
          profileImage: file
        });
      }
    } else {
      setPerfil({
        ...perfil,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Enviando datos del formulario:', perfil);
      const formData = new FormData();
      formData.append('name', perfil.name);
      formData.append('email', perfil.email);
      
      // Debug: Mostrar qué archivo se está enviando
      if (perfil.profileImage instanceof File) {
        console.log('Archivo a subir:', {
          nombre: perfil.profileImage.name,
          tipo: perfil.profileImage.type,
          tamaño: perfil.profileImage.size
        });
      }
      
      if (perfil.newPassword) {
        formData.append('password', perfil.newPassword);
      }

      if (perfil.profileImage instanceof File) {
        formData.append('profileImage', perfil.profileImage);
        console.log('Imagen adjuntada al FormData');
      }

      const res = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (res.ok) {
        const updatedData = await res.json();
        console.log('Profile update response:', updatedData); // Debug log
        setPerfil(prev => ({
          ...prev,
          ...updatedData
        }));
        setMensaje('✅ Perfil actualizado correctamente');
      } else {
        setMensaje('❌ Error al actualizar perfil');
      }
    } catch (err) {
      console.error('Error al actualizar perfil:', err);
      setMensaje('❌ Error al actualizar perfil');
    }
  };

  if (loading) return <p>Cargando perfil...</p>;

  return (
    <div className={styles.container}>
      <h1>Mi Perfil</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <img
              src={
                imagePreview ||
                (perfil.profileImage
                  ? `http://localhost:5000/uploads/${perfil.profileImage}`
                  : 'https://via.placeholder.com/150')
              }
              alt="Profile"
              className={styles.profileImage}
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '50%',
                border: '3px solid #2563eb'
              }}
              onError={(e) => {
                console.error('Error loading image, details:', {
                  src: e.target.src,
                  naturalWidth: e.target.naturalWidth,
                  naturalHeight: e.target.naturalHeight,
                  error: e.error
                });
                e.target.src = 'https://via.placeholder.com/150';
              }}
            />
          </div>
          {/* Debug info */}
          <div style={{ fontSize: '12px', color: '#666' }}>
            Current image source: {imagePreview ? 'Preview' : perfil.profileImage ? `http://localhost:5000/uploads/${perfil.profileImage}` : 'Placeholder'}
          </div>
          {/* Debug info */}
          <div style={{ fontSize: '12px', color: '#666' }}>
            Ruta de imagen: {perfil.profileImage ? `http://localhost:5000/uploads/${perfil.profileImage}` : 'No hay imagen'}
          </div>
          {/* Debug info */}
          <div style={{ fontSize: '12px', color: '#666' }}>
            {perfil.profileImage ? `Image path: ${perfil.profileImage}` : 'No image path'}
          </div>
          <input
            type="file"
            name="profileImage"
            onChange={handleChange}
            accept="image/*"
            className={styles.fileInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Nombre</label>
          <input
            type="text"
            name="name"
            value={perfil.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={perfil.email}
            onChange={handleChange}
            className={`${styles.input} ${styles.disabled}`}
            disabled
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Nueva Contraseña (opcional)</label>
          <input
            type="password"
            name="newPassword"
            value={perfil.newPassword}
            onChange={handleChange}
            className={styles.input}
            placeholder="Dejar en blanco para mantener la actual"
          />
        </div>
        <button type="submit" className={styles.button}>
          Guardar cambios
        </button>
        {mensaje && <p className={styles.message}>{mensaje}</p>}
      </form>
    </div>
  );
}
