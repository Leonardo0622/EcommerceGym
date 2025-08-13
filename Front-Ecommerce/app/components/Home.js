"use client";
import Image from "next/image";  
import styles from "../styles/home.module.css"; 
import { useEffect, useState } from "react";


export default function Home() {
  const [products, setProducts] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/api/products") 
    .then((res) => res.json())
    .then((data) => {
      console.log('Productos cargados:', data);
      // Tomar solo los primeros 10 productos
      setProducts(data.slice(0, 8));
    })
    .catch((error) => console.error("Error cargando productos:", error));
}, []);

  return (
    <main>

      {/* Hero Section */}
      <section className={styles.hero}>
        <img 
          src="/img/fondo.jpg" 
          alt="Imagen Hero" 
          className={styles.heroImage} 
        />
        <div className={styles.heroContent}>
          <h1>Entrena con estilo</h1>
          <p>Explora nuestra colección de ropa deportiva para llevar tu rendimiento al siguiente nivel.</p>
          <a ref={null} href="/products" className={styles.link}>
          <button className={styles.btn}>Explorar</button>
          </a>
        </div>
      </section>

      {/* Sección de productos de gym */}
      <section className={styles.productsContainer}>
        <h2 className={styles.sectionTitle}>Productos destacados</h2>
        {products.length === 0 ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Cargando productos...</p>
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <div key={product._id} className={styles.product}>
                <div className={styles.productImageContainer}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productTitle}>{product.name}</h3>
                  <p className={styles.productDesc}>${product.price}</p>
                  <button className={styles.addToCartBtn}>Agregar al carrito</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>


      {/* Sección informativa */}
      <section className={styles.infoSection}>
        <div className={styles.infoWrapper}>
          <div className={styles.infoImage}>
            <img src="/img/info.jpg" alt="Mujer entrenando" />
          </div>
          <div className={styles.infoText}>
            <h2>¿Por qué usar ropa deportiva adecuada?</h2>
            <p>
              Elegir la ropa deportiva correcta no solo mejora tu rendimiento físico, 
              sino que también te brinda comodidad, libertad de movimiento y te ayuda a mantenerte fresco durante tus entrenamientos.
            </p>
            <p>
              Nuestra colección está diseñada para acompañarte en cada movimiento, 
              combinando tecnología, estilo y funcionalidad.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de accesorios para gym */}
      <section className={styles.accessoriesSection}>
        <h2 className={styles.sectionTitle}>Accesorios que completan tu estilo</h2>
        <div className={styles.accessoriesGrid}>
          <div className={styles.accessoryCard}>
            <div className={styles.accessoryImageContainer}>
              <img src="/img/gorra.jpg" alt="Gorra deportiva" className={styles.accessoryImage} />
            </div>
            <div className={styles.accessoryInfo}>
              <h3 className={styles.accessoryTitle}>Gorra FitStyle</h3>
              <p className={styles.accessoryDesc}>Protección y estilo en cada entrenamiento</p>
              <button className={styles.viewDetailsBtn}>Ver detalles</button>
            </div>
          </div>

          <div className={styles.accessoryCard}>
            <div className={styles.accessoryImageContainer}>
              <img src="/img/accesorio.jpg" alt="Set de accesorios deportivos" className={styles.accessoryImage} />
            </div>
            <div className={styles.accessoryInfo}>
              <h3 className={styles.accessoryTitle}>PowerPack Pro</h3>
              <p className={styles.accessoryDesc}>Todo lo que necesitas para entrenar al máximo</p>
              <button className={styles.viewDetailsBtn}>Ver detalles</button>
            </div>
          </div>

          <div className={styles.accessoryCard}>
            <div className={styles.accessoryImageContainer}>
              <img src="/img/bolso.jpg" alt="Bolso deportivo" className={styles.accessoryImage} />
            </div>
            <div className={styles.accessoryInfo}>
              <h3 className={styles.accessoryTitle}>Bolso IronCarry</h3>
              <p className={styles.accessoryDesc}>Diseño resistente y amplio para tus rutinas</p>
              <button className={styles.viewDetailsBtn}>Ver detalles</button>
            </div>
          </div>

          <div className={styles.accessoryCard}>
            <div className={styles.accessoryImageContainer}>
              <img src="/img/botella.jpg" alt="Botella deportiva" className={styles.accessoryImage} />
            </div>
            <div className={styles.accessoryInfo}>
              <h3 className={styles.accessoryTitle}>Botella SmartHydro</h3>
              <p className={styles.accessoryDesc}>Hidratación inteligente en cada sesión</p>
              <button className={styles.viewDetailsBtn}>Ver detalles</button>
            </div>
          </div>
        </div>
      </section>

      {/* Frase motivacional final */}
      <section className={styles.motivationalSection}>
        
        <p className={styles.motivationalText}>
          "La disciplina supera al talento cuando el talento no se disciplina. ¡Entrena con propósito!"
        </p>
      </section>

    </main>
  );
}
