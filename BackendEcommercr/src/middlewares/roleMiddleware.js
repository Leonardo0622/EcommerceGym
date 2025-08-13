const checkRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if(!req.user) {
      return res.status(401).json({ message: "Acceso denegado. Usuario no autenticado" });
    }

    // Verificar el role
    if(!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Acceso denegado. No tienes permisos" });
    }
    // Si el role es válido, continuar con la siguiente función middleware
    next();
    
  };
};

module.exports = checkRole;

// const checkRole = (roles) => {
//     return (req, res, next) => {
//       console.log("Usuario autenticado:", req.user);  // Verifica si `role` está presente
        
//       if (!req.user || !roles.includes(req.user.role)) {
//         return res.status(403).json({ message: "Acceso denegado. No tienes permisos" });

//       }
//       next();
//     };
//   };
  

  