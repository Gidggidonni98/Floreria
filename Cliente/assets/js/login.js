const login = async () => {
      let password = document.getElementById("password").value;
      let email = document.getElementById("email").value;
      let data = { email, password };
      if (password !== "" || email !== "") {
            await $.ajax({
            method: "POST",
            url: "http://localhost:5000/cliente/login",
            data: data
            }).done(res => {
            
                if (res.status === '200') {
                  
                        if(res.roleUser === "1"){
                              location.href = "./IndexAdmin.html";
            
                              console.log(res);
                        }else{
                              localStorage.setItem('name', res.name);
                              location.href = "./IndexUser.html";
                              
                        }
                        
                } else if (res.message ==='No') {
                  Swal.fire({
                        title: "No has ingresado ninguna contraseña",
                        confirmButtonText: "Aceptar",
                        icon: "error",
                        }) 
                }else if(res.message === 'Invalid password or email'){
                      console.log(res)
                  Swal.fire({
                        title: "Correo o contraseña incorrecta",
                        confirmButtonText: "Aceptar",
                        icon: "error",
                        })  
                }
            });
      } else {
            Swal.fire({
            title: "Rellena los campos primero",
            confirmButtonText: "Aceptar",
            icon: "error",
            })
      }
    }
    