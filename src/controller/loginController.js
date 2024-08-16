const db = require('../db/database');


function logear(limiter,req,res){
    db.query(queryString,[usuario,clave],(error,results,fields)=>{
        if(error){
          console.error("error al ejecutar la consulta",error)
        }else{
          console.log("Consulta ejecutada con exito")
        }
      });
      const { usuario, clave } = req.body;

      try {
        const queryString = 'SELECT * FROM usuarios WHERE nombre = ?';
        connection.query(queryString, [usuario], (error, results, fields) => {
          if (error) {
            console.error('Error al buscar el usuario:', error);
            res.status(500).send('Error interno del servidor');
            return;
          }
    
          if (results.length > 0) {
            const user = results[0];
    
            // Verificar la contraseña sin bcrypt (no recomendado para producción)
            if (clave === user.contrasena) {
              // Credenciales válidas
              req.session.loggedin = true;
              req.session.usuario = usuario;
              // Reiniciar el contador de intentos después de un inicio de sesión exitoso
              req.session.loginAttempts = 0;
              res.redirect('/grilla.html');
            } else {
              // Credenciales inválidas
              handleInvalidLogin(req, res);
            }
          } else {
            // Usuario no encontrado
            handleInvalidLogin(req, res);
          }
        });
      } catch (error) {
        console.error('Error al buscar el usuario:', error);
        res.status(500).send('Error interno del servidor');
      }
    };
    function handleInvalidLogin(req, res) {
        // Incrementar el contador de intentos de inicio de sesión
        req.session.loginAttempts = (req.session.loginAttempts || 0) + 1;
      
        // Verificar si se superó el número máximo de intentos permitidos
        if (req.session.loginAttempts >= limiter.max) {
          res.status(429).send(limiter.message); // Devolver código 429 Too Many Requests
        } else {
          // Credenciales inválidas
          res.redirect('/login?error=invalid_credentials');
        }
      }