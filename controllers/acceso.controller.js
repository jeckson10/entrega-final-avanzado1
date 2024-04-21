const { response, request } = require('express');


const viewAcceso = async (req = request, res = response) => {
    res.json({
      'msg': 'exito'
    });
  }; 


//codigo para validar un login
const login = (req, res) => {
    try {
        // Lista de usuarios simulados
        const users = [
            { username: 'camilo', password: 'camilo1999' },
            { username: 'jeckson', password: 'jeckson1999' },
            // se agragan más usuarios según sea necesario
        ];

        // Extraer nombre de usuario y contraseña de la solicitud
        const { username, password } = req.body;

        // Validar la contraseña
        if (!isValidPassword(password)) {
            return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres y ser alfanumérica' });
        }
        
        // Buscar el usuario en la lista simulada
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            return res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } else {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
          console.error('Error en la autenticación:', error);
        return res.status(500).json({ message: 'Error en la autenticación' });
    }
};

// Función para validar la contraseña
const isValidPassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);



};


//codigo para realizar un CRUD


module.exports = {
    login,
    viewAcceso,
    
};