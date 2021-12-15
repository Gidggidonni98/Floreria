const url = "http://localhost:5000";

const findCliente = async() => {
    await $.ajax({
        method: 'GET',
        headers: { "Accept": "application/json" },
        url: url + '/cliente'
    }).done(function(res) {
        content = "";
        res = res.listClientes;


        for (let i = 0; i < res.length; i++) {
            content += `
            <tr class="text-center">
                <td>${res[i].idCliente}</td>
                <td>${res[i].usuario}</td>
                <td>${res[i].status ==1?"Activo":"Inactivo"} </td>
                <td>${res[i].rol ==1?"Administrador":"Cliente"}</td>
                <td>
                    <button class='btn btn-primary' data-toggle='modal' onclick='getInfoClient(${res[i].idCliente})' data-target='#detallesCliente'><i class='fas fa-info-circle'></i></button>
                </td>
                <td>
                    <button class='btn btn-danger' data-toggle='modal' onclick='getIdUser(${res[i].idCliente})' data-target='#eliminar'><i class="fas fa-trash"></i></button>
                </td>
            </tr>
                `;
        };
        $("#table2 > tbody").html(content)
    });
};
findCliente();


const getByIdClient = async id => {
    return await $.ajax({
        type: 'GET',
        url: url + '/cliente/' + id
    }).done(res => {
        console.log(res);
    });
};


const getInfoClient = async id => {
    let cliente = await getByIdClient(id);

    document.getElementById('nameInfo').value = cliente.cliente[0].name;
    document.getElementById('lastNameInfo').value = cliente.cliente[0].lastName;
    document.getElementById('secondNameInfo').value = cliente.cliente[0].secondName;
    document.getElementById('phoneInfo').value = cliente.cliente[0].phone;
    document.getElementById('addressInfo').value = cliente.cliente[0].address;
}


const registerClient = async() => {
    let name = document.getElementById('name').value;
    let lastName = document.getElementById('primerApellido').value;
    let secondName = document.getElementById('segundoApellido').value;
    let phone = document.getElementById('telefono').value;
    let address = document.getElementById('direccion').value;
    let usuario = document.getElementById('correoElectronico').value;
    let password = document.getElementById('password').value;
    if (name != "" || lastName != "" || secondName != "" || phone != "" || address != "" || usuario != "" || password != "") {
        await $.ajax({
            type: 'POST',
            headers: { "Accept": "application/json" },
            url: url + "/cliente/create/",
            data: { name, lastName, secondName, phone, address, usuario, password }
        }).done(res => {
            if (res.status === 200) {
                Swal.fire({
                    title: "Hubo un error al registrar",
                    confirmButtonText: "Aceptar",
                    icon: "error",
                });
                findCliente();
            } else {
                Swal.fire({
                    title: "Se ha creado correctamente",
                    confirmButtonText: "Aceptar",
                    icon: "success",
                });
                findCliente();
            }
        });
    } else {
        Swal.fire({
            title: "Rellena los campos primero",
            confirmButtonText: "Aceptar",
            icon: "error",
        })
    }
};




const downClient = async() => {
    let id = document.getElementById('id_deleteUser').value;
    await $.ajax({
        type: 'POST',
        url: url + '/usuario/delete/' + id
    }).done(res => {
        console.log(res);
        findCliente();
    });
};

const getIdUser = async id => {
    document.getElementById("id_deleteUser").value = id;
};