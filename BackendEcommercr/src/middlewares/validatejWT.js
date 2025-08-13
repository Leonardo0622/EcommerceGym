const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    // Leer el token del header Authorization: Bearer <token>
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No hay token en la petición" });
    }
    const token = authHeader.split(" ")[1];

    try {
        // Puedes guardar más datos si los pones en el token (ej: role)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id, role: decoded.role }; // id y role del usuario
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Token no válido" });
    }
};

module.exports = validateJWT;