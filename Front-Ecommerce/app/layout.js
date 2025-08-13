import Navbar from "./components/Navbar"; // Importar el componente Navbar
import React from "react";
import Home from "./components/Home"; // Importar el componente Home

// Import Bootstrap and CartProvider
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "../context/CartContext"; // Asegúrate de que CartProvider esté correctamente importado

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>

        {/* Envuelve la aplicación con CartProvider */}
        <CartProvider>
          <header>
            <Navbar />
          </header>

          <main className="mainContent">{children}</main>
          <footer>
            <p>2025 - Todos los derechos reservados</p>
          </footer>
        </CartProvider>

      </body>
    </html>
  );
}
