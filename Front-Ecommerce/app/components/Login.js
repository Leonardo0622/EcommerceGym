import React, {useState} from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { useRouter } from 'next/navigation';

const Login = ({setToken}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // State for error message
    const router = useRouter();

    const handlelogin = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {email, password});
            const { token, user } = response.data;
            
            // Guardar datos en localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("userName", user.name);
            localStorage.setItem("role", user.role);
            
            setToken(token); // Guardar el token en el estado global
            
            // Redirigir según el rol
            if (user.role === 'admin') {
                router.push('/dashboard');
            } else {
                router.push('/products');
            }
        } catch (error) {
            setError("Credenciales incorrectas");
        }
    }
    

    //TODO: Crear el componente de registro -> return y al HTML
return (
    <div>
        <h2>Iniciar sesion Admin</h2>
        <form onSubmit={handlelogin}>
            {/*Input for email*/}
            <div>
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

            {/*Input for password*/}
                <div>
                <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p>{error}</p>}
                {/*Button to submite the form*/}

                <button type="submit">Login</button>
        </form>
    </div>
);
};

export default Login;