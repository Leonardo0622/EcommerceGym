// app/components/MetodosPago.js
"use client";
import { useState, useEffect } from "react";
import Script from "next/script";
import styles from "../styles/Pasarelas.module.css";

export default function MetodosPago({ show, onClose }) {
  const [isClient, setIsClient] = useState(false);
  const [showPaypal, setShowPaypal] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (showPaypal && typeof window !== "undefined" && window.paypal) {
      window.paypal.Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: "10.00" },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            const message = `¡Pago aprobado! Gracias ${details.payer.name.given_name} por su compra. `;
            document.getElementById("result-message").innerText = message;
            document.getElementById("result-message").className = `${styles.resultMessage} ${styles.success}`;
          });
        },
        onError: function (err) {
          document.getElementById("result-message").innerText = "Error en el proceso de pago";
          document.getElementById("result-message").className = `${styles.resultMessage} ${styles.error}`;
        },
      }).render("#paypal-button-container");
    }
  }, [showPaypal]);

  if (!show || !isClient) return null;

  return (
    <div className={styles.paypalContainer} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.3)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Script
        src="https://www.paypal.com/sdk/js?client-id=test&buyer-country=US&currency=USD&components=buttons&enable-funding=venmo,paylater,card"
        strategy="afterInteractive"
      />
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 32,
          minWidth: 320,
          maxWidth: 400,
          width: "90vw",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)"
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            fontSize: 22,
            background: "none",
            border: "none",
            cursor: "pointer",
            zIndex: 10
          }}
          aria-label="Cerrar"
        >
          ×
        </button>
        <h2 className={styles.title} style={{ fontSize: "1.5rem", marginBottom: 24 }}>Elige tu método de pago</h2>
        <div className={styles.paymentGrid} style={{ margin: 0 }}>
          <div className={styles.paymentOption} onClick={() => setShowPaypal(true)}>
            <img src="/img/paypal-logo.png" alt="Paypal" />
            <p>Pagar con Paypal</p>
          </div>
          <div className={styles.paymentOption} onClick={() => window.location.href = "/api/payments/payu-redirect"}>
            <img src="/img/payu-logo.png" alt="PayU" />
            <p>Pagar con PayU</p>
          </div>
        </div>
        {showPaypal && (
          <div className={styles.paypalContainer}>
            <div id="paypal-button-container" />
            <p id="result-message" className={styles.resultMessage}></p>
          </div>
        )}
      </div>
    </div>
  );
}