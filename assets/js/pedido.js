
const createPedido = async() => {
    let place = document.getElementById('autocomplete').value;
    let price = localStorage.getItem("price");
    let idUser = localStorage.getItem("idUser");
    let idArreglo = localStorage.getItem("idArreglo");

    if (place == "") {
        Swal.fire({
            title: "Rellena los campos faltantes",
            confirmButtonText: "Aceptar",
            icon: "error",
        })
    } else {

        $.ajax({
            type: 'POST',
            headers: { "Accept": "application/json" },
            url: 'http://localhost:5000/pedido/create',
            data: { place, price, idUser, idArreglo }
        }).done(res => {
            if (res.status === 200) {

                Swal.fire({
                    title: "Se realizo la compra correctamente",
                    confirmButtonText: "Aceptar",
                    icon: "success",
                });
            } else {
                Swal.fire({
                    title: "Hubo un problema al registrar",
                    confirmButtonText: "Aceptar",
                    icon: "error",
                });
            }
        });
    }
};


const nop = function () {
    Swal.fire({
        title: "El pedido aun no ha sido enviado",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
  };

  const nop2 = function () {
    Swal.fire({
        title: "No se puede desactivar mientras está en enviado/entregado",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
  };

  const nop3 = function () {
    Swal.fire({
        title: "El producto aun no ha sido entregado",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
  };



const findPedidos = async id => {
    await $.ajax({
        method: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:5000/pedido/user/' + localStorage.getItem("idUser")
    }).done(function(res) {
        
        content = "";
        res = res.arreglo;


        for (let i = 0; i < res.length; i++) {
            var tmp2 = res[i].status;
            var estado2 = "";
        var entregado= "";
        switch(tmp2){
            case 0:
                estado2 = "Cancelado";
                entregado = `El pedido esta descativado`
                enviado = `El pedido esta descativado`
                break;
            case 1:
                estado2 = "Pendiente";
                entregado =` <button class='btn btn-success' data-toggle='modal' onclick='nop()'  ><i class="fas fa-check-circle"></i></button>`

                break;
            case 2:
                    estado2 = "Enviado";
                    entregado =` <button class='btn btn-success' data-toggle='modal' onclick='nop3()' data-target='#enviar' ><i class="fas fa-check-circle"></i></button>`

                    break;
            case 3:
                    estado2 = "Entregado";
                    entregado =` <button class='btn btn-success' data-toggle='modal' onclick='getId2(${res[i].idPedido})'  data-target='#entregado' ><i class="fas fa-check-circle"></i></button>`
                    console.log(tmp2);

                    break;
            case 4:
                estado2 = "Confirmado";
                entregado =`Ya se ha entregado`
                break;
            default:
                estado2 = "No hay actualización / Desactivado"
                break
        };
        var f = new Date(res[0].orderDate).toLocaleDateString();
            if (res[0].deadLine == null) {
                var h = "No ha habido actualización";
            } else {
                var h = new Date(res[0].deadLine).toLocaleDateString();
            };

            content += `
            <tr class="text-center">
                <td>${estado2}</td>
                <td>${res[i].price}</td>
                <td>${res[i].place} </td>
                <td>${f} </td>
                <td>${h}</td>
                <td>${entregado}</td>
                
            </tr>
                `;
        };
        $("#pedido > tbody").html(content)
    });
};
findPedidos();


const getIdCompra = async idPedido => {
    console.log(idPedido);
    document.getElementById("id_delete").value = idPedido;
    document.getElementById('id_enviar').value = idPedido;


};
const getId2 = async idPedido2 => {
    
    document.getElementById('id_entregado').value = idPedido2;

};
const getIdE = async idPedido3 => {
    
    document.getElementById('id_entregado2').value = idPedido3;

};

const deletePedido = async() => {
    let id = document.getElementById("id_delete").value;
    await $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/pedido/delete/' + id
    }).done(res => {
        findPedidosAll();

    });
};

const enviarPedido = async() => {
    let id = document.getElementById("id_enviar").value;
    await $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/pedido/enviar/' + id
    }).done(res => {
        Swal.fire({
            title: "Se ha enviado el pedido",
            confirmButtonText: "Aceptar",
            icon: "success",
        })
        findPedidosAll();
        

    });
};

const entregado = async() => {
    let id = document.getElementById("id_entregado").value;
    await $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/pedido/entregado/' + id
    }).done(res => {
        Swal.fire({
            title: "Gracias por preferirnos",
            confirmButtonText: "Aceptar",
            icon: "success",
        })
        findPedidos();
        
        

    });
};

const entregado2 = async() => {
    let id = document.getElementById("id_entregado2").value;
    await $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/pedido/entregadoAdmin/' + id
    }).done(res => {
        Swal.fire({
            title: "Se ha entregado",
            confirmButtonText: "Aceptar",
            icon: "success",
        })
        findPedidosAll();
        
        

    });
};


const findPedidosAll = async id => {
    await $.ajax({
        method: 'GET',
        headers: { "Accept": "application/json" },
        url:'http://localhost:5000/pedido'
    }).done(function(res) {
        content = "";
        res = res.listPedidos;
        for (let i = 0; i < res.length; i++) {
        var tmp = res[i].status;
        var estado = "";
        var enviar= "";
        var entregado = "";
        var desactivar= "";
        switch(tmp){
            case 0:
                estado = "Cancelado";
                enviar = `El pedido esta descativado`
                desactivar = `El pedido esta desactivado`
                entregado = `El pedido esta desactivado`

                break;
            case 1:
                estado = "Pendiente de envío";
                enviar =` <button class='btn btn-success' data-toggle='modal' onclick='getIdCompra(${res[i].idPedido})' data-target='#enviar' ><i class="fas fa-paper-plane"></i></button>`
                entregado= `Pendiente de envío`
                desactivar = `<button class='btn btn-danger' data-toggle='modal' onclick='getIdCompra(${res[i].idPedido})' data-target='#delete' ><i class="fas fa-trash"></i></button>`

                break;
            case 2:
                    estado = "Enviado";
                    enviar =`Se ha enviado el pedido`
                    desactivar = `<button class='btn btn-danger' data-toggle='modal' onclick='nop2()'' ><i class="fas fa-trash"></i></button>`
                    entregado =`<button class='btn btn-success' data-toggle='modal' onclick='getIdE(${res[i].idPedido})' data-target='#entregado2' ><i class="fas fa-check-circle"></i></button>`
                    break;
            case 3:
                    estado = "Entregado";
                enviar =`Se ha enviado el pedido`
                desactivar = `<button class='btn btn-danger' data-toggle='modal' onclick='nop2()'  ><i class="fas fa-trash"></i></button>`
                entregado =`A la espera de la confirmación de entrega`


                    break;
            case 4:
                estado = "Confirmado";
                enviar =` Se ha entregado el pedido`
                break;
            default:
                estado = "No hay actualización"
                break
        };
            content += `
            <tr class="text-center">
                <td>${estado}</td>
                <td>${res[i].price}</td>
                <td>${res[i].place} </td>
                <td>${res[i].orderDate} </td>
                <td>${res[i].deadLine}</td>
                <td>${res[i].idUser ==1?"Kemish":"Thayli"}</td>
                <td>
                ${enviar}
                </td>
                <td>
                ${entregado}
                </td>
                <td>
                ${desactivar}
                </td>
            </tr>
                `;
        };
        $("#admon > tbody").html(content)
    });
};
findPedidosAll();