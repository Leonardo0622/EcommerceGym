const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const validateJWT = require("../middlewares/validatejWT");

// Middleware para verificar si es admin
const isAdmin = async (req, res, next) => {
    try {
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Acceso denegado. Se requieren permisos de administrador.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al verificar permisos' });
    }
};

// Obtener todos los usuarios (solo admin)
router.get("/users", validateJWT, isAdmin, async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
});

// Actualizar rol de usuario (solo admin)
router.patch("/users/:userId/role", validateJWT, isAdmin, async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Rol no válido' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (user.role === 'admin') {
            return res.status(403).json({ message: 'No se puede cambiar el rol de un administrador' });
        }

        user.role = role;
        await user.save();

        res.json({ message: 'Rol actualizado correctamente', user });
    } catch (error) {
        console.error('Error al actualizar rol:', error);
        res.status(500).json({ message: 'Error al actualizar rol' });
    }
});

// Eliminar usuario (solo admin)
router.delete("/users/:userId", validateJWT, isAdmin, async (req, res) => {
    try {
        const { userId } = req.params;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (user.role === 'admin') {
            return res.status(403).json({ message: 'No se puede eliminar un administrador' });
        }

        await User.findByIdAndDelete(userId);
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
});

module.exports = router;
