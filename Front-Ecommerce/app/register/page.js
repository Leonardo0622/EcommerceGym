"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";  // Asegúrate de tener esta importación
import styles from "../styles/register.module.css";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter(); // Para poder redirigir

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      setMessage({ type: "success", text: res.data.message || "¡Registro exitoso!" });
      // Redirigir según el rol
      if (form.role === "admin") {
        setTimeout(() => router.push("/dashboard"), 1200);
      } else {
        setTimeout(() => router.push("/"), 1200);
      }
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "Error al registrar. Intenta con otro correo." });
    }
    setLoading(false);
  };

  const handleLoginRedirect = () => {
    router.push("/login"); // Redirige a la página de login
  };

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.title}>Registro de Usuario</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Tu nombre"
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="correo@ejemplo.com"
        />
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="********"
        />
        {/* Campo oculto para el rol */}
        <input type="hidden" name="role" value="user" />
        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
        {message && (
          <div className={message.type === "success" ? styles.success : styles.error}>
            {message.text}
          </div>
        )}
      </form>
      <button className={styles.loginRedirectButton} onClick={handleLoginRedirect}>
        ¿Ya tienes cuenta? Logueate
      </button>
    </div>
  );
}
