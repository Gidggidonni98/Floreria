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
                    <button class='btn btn-primary' data-toggle='modal'  data-target='#detalles'><i class='fas fa-info-circle'></i></button>
                </td>
                <td>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#modalModificarAuto" class="btn btn-outline-warning"><i class="fas fa-edit"></i></button>
                </td>
                <td>
                    <button class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                </td>
            /tr>
                `;
        }
        $("#table2 > tbody").html(content);
    });
};
findCliente();


const getById = async id => {
    return await $.ajax({
        type: 'GET',
        url: url + '/cliente/' + id
    }).done(res => {
        console.log(res);
    });
};


const registerArreglo = async() => {
    let name = document.getElementById('name').value;
    let lastName = document.getElementById('primerApellido').value;
    let secondName = document.getElementById('segundoApellido').value;
    let phone = document.getElementById('telefono').value;
    let address = document.getElementById('direccion').value;
    let usuario = document.getElementById('correoElectronico').value;
    let password = document.getElementById('password').value;

    console.log(name, lastName, secondName, phone, address, usuario, password);
    await $.ajax({
        type: "POST",
        url: url + "/cliente/create/",
        data: { name, lastName, secondName, phone, address, usuario, password }
    }).done(function(res) {
        console.log(res);
    });
};