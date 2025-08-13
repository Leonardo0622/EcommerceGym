"use client"
import {useState, useEffect} from "react"
import Script from "next/script"
import styles from '../styles/Pasarelas.module.css'

export default function Pasarelas(){
  const [isClient, setIsclient] = useState(false);
  const [showPaypal, setSowPaypal] = useState(false);

  useEffect(()=>{
    // indicancion que el ocmponente se esta ejecuntando
    setIsclient(true);
  }, []);
  // La llaves vacias indidca que solo se ejecuta una vez al cargar el componente

  // Renderizar el script de Paypal solo si el cliente es verdadero
  useEffect(()=>{
    if(showPaypal && typeof window !== "undefined" && window.paypal){
      // Renderizar ñps botones de Paypal
      window.paypal.Buttons({
        createOrder: function(data, actions){
          //Crear la orden de Paypal
          return actions.order.create({
            purchase_units: [
              {
                // Monto por pagar/defecto
                amount: {
                  value: "10.00", // Precio
                },
              },
            ],
          });
        },

        onApprove: function(data, actions){
          // Manejar la aprobacin de la orden
          return actions.order.capture().then(function(details){
            const message = `¡Pago aprobado! Gracias ${details.payer.name.given_name} por su compra. `
            document.getElementById("result-message").innerText = message;
            document.getElementById("result-message").className = `${styles.resultMessage} ${styles.success}`;
          });
        },
        // Manehar el error
        onError: function(err){
          console.error("Error en Paypal: ",err );
          document.getElementById("result-message").innerText = "Error en el proceso de pago";
          document.getElementById("result-message").className = `${styles.resultMessage} ${styles.error}`;
        },
      }).render("#paypal-button-container");
    }
  },[showPaypal]); // Ejecutar cuando showPaypal cambie

  if(!isClient){
    // vitar renderizar el componente en el servidor
    return null;
  }

  // Estructura del componente HTML
  return(
    <div className={styles.container}>
      {/*Cargar el SDK de Paypa*/}
      <Script
        src="https://www.paypal.com/sdk/js?client-id=test&buyer-country=US&currency=USD&components=buttons&enable-funding=venmo,paylater,card"
        strategy="afterInteractive"
      />

      <h1 className={styles.title}>Pasarelas de pago</h1>
      <div className={styles.paymentGrid}>
        {/* OPcion de Paypal */}
        <div className={styles.paymentOption}
        onClick={()=> setSowPaypal(true)}>
          <img
          src="/img/paypal-logo.png"
          alt="Paypal"
          />
          <p>Pagar con Paypal</p>
        </div>

        {/* Opcion de PayU*/}
        <div className={styles.paymentOption}
        onClick={()=> (window.location.href= "/api/payments/payu-redirect")}>
          <img
          src="/img/payu-logo.png"
          alt="PayU"
          />
          <p>Pagar con PayU</p>
        </div>
      </div>
      {/*Contenedor para el botones de Paypal*/}
      {showPaypal && (
        <div className={styles.paypalContainer}>
          <div id="paypal-button-container"/>
          <p id="result-message" className={styles.resultMessage}></p>
        </div>
      )}
    </div>
  );
}