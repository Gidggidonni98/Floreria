const urlA = "http://localhost:5000";

const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            resolve(reader.result.split(',')[1]);
        }
    })
}


function buyArreglo() {
    let price = localStorage.getItem("price");
    let idArreglo = localStorage.getItem("idArreglo");
    let description = localStorage.getItem("description");

    contenido = "";
    contenido += `<label for="exampleInputPassword1">Precio Total</label>
                    <input type="text" value="${price}" class="form-control" disabled>`;
    $("#contenido > div").html(contenido);

    contenido2 = "";
    contenido2 += `<label for="exampleInputPassword1">Descripción</label>
                    <input type="text" value="${description}" class="form-control" disabled>`;
    $("#contenido2 > div").html(contenido2);
}

buyArreglo();



function getInfoSesion() {
    let nombre = localStorage.getItem("nombe");
    let idUser = localStorage.getItem("idUser");
    

    mostrar = "";
    mostrar += `<div>${nombre}</div> `;
    $("#mostrar > a").html(mostrar);

}
getInfoSesion();

//Crear un arreglo

const createArreglo = async() => {
    let name = document.getElementById('nombreArreglo').value;
    let description = document.getElementById('descripcionArreglo').value;
    let price = document.getElementById('precioArreglo').value;
    let quantity = document.getElementById('cantidadArreglo').value;
    let image = document.getElementById('imagenArreglo').files[0];

    if (name == "" || description == "" || price == "" || quantity == "" || image == null) {
        Swal.fire({
            title: "Rellena los campos faltantes",
            confirmButtonText: "Aceptar",
            icon: "error",
        })
    } else {

        const imagen = await blobToBase64(image);

        $.ajax({
            type: 'POST',
            headers: { "Accept": "application/json" },
            url: urlA + '/producto/create',
            data: { name, description, price, quantity, imagen }
        }).done(res => {
            if (res.status === 200) {

                Swal.fire({
                    title: "Se ha creado correctamente",
                    confirmButtonText: "Aceptar",
                    icon: "success",
                });
                findArreglo();
            } else {
                Swal.fire({
                    title: "Hubo un problema al registrar",
                    confirmButtonText: "Aceptar",
                    icon: "error",
                });
                findArreglo();
            }
        });
    }
};


const findArreglo = async() => {
    await $.ajax({
        method: 'GET',
        headers: { "Accept": "application/json" },
        url: urlA + '/producto'
    }).done(function(res) {
        content = "";
        res = res.listProducto;
        for (let i = 0; i < res.length; i++) {
            let array8 = new Uint8Array(res[i].imagen.data);
            var imagen = new TextDecoder().decode(array8);
            content += `
            <tr class="text-center">
                <td>${res[i].idArreglo}</td>
                <td>${res[i].name}</td>
                <td>${res[i].price}</td>
                <td>${res[i].status ==1?"Activo":"Inactivo"} </td>
                <td>${res[i].quantity}</td>
                <td>
                    <button class='btn btn-primary' data-toggle='modal' onclick='getInfoArreglo(${res[i].idArreglo})'  data-target='#detallesProducto'><i class='fas fa-info-circle'></i></button>
                </td>
                <td>
                    <button data-toggle='modal' onclick='getInfoUpdateArreglo(${res[i].idArreglo})' data-target='#update' class='btn btn-warning'><i class="fas fa-edit"></i></button>
                </td>
                <td>
                    <button class='btn btn-danger' data-toggle='modal' onclick='getId(${res[i].idArreglo})' data-target='#delete' ><i class="fas fa-trash"></i></button>
                </td>
            </tr>
                `;
        }
        $("#productos > tbody").html(content);

        contenido = "";
        for (let i = 0; i < res.length; i++) {
            let array8 = new Uint8Array(res[i].imagen.data);
            var imagen = new TextDecoder().decode(array8);
            contenido += ` 
                <div class="col-12 col-sm-3 col-md-3">
                    <figure>
                        <a href="./Pedido.html" onclick='getByIdF(${res[i].idArreglo})'>
                            <img  class="img-fluid rounded float-start" width="75%" height="75%" src= "data:image/*;base64,${imagen}" alt="">
                            <div class="text-warning mt-2">
                                <h6 style="color: black;">${res[i].name}</h6>
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                                <h3 style="color: black;" style="font-size: 22px;">$${res[i].price}<span style="font-size: 22px;">.00</span></h3>
                            </div>
                        </a>
                    </figure>
                </div>
              `;
        }
        $("#show > div").html(contenido);
    });
};
findArreglo();

//Obtener Id del arreglo seleccionado
//<td>
//<img src= "data:image/*;base64,${imagen}" class = "d-block w-100" alt="">
//</td>

const getByIdF = async id => {
    return await $.ajax({
        type: 'GET',
        url: urlA + '/producto/' + id
    }).done(res => {
        let price = res.arreglo[0].price;
        let idArreglo = res.arreglo[0].idArreglo;
        let descripcion = res.arreglo[0].description;
        localStorage.setItem("price", price);
        localStorage.setItem("idArreglo", idArreglo);
        localStorage.setItem("description", descripcion);

        console.log(res);
    });
};

//Obtener la información del arreglo

const getInfoArreglo = async id => {
    let arreglo = await getByIdF(id);
    document.getElementById('descripcionInfo').value = arreglo.arreglo[0].description;
    let idArreglo = arreglo.arreglo[0].price;
    localStorage.setItem("idArreglo", idArreglo)

}

//Obtener informacion para actualizar

const getInfoUpdateArreglo = async id => {
    let arreglo = await getByIdF(id);

    document.getElementById('id_update').value = id
    document.getElementById('name_update').value = arreglo.arreglo[0].name
    document.getElementById('descripcion_update').value = arreglo.arreglo[0].description
    document.getElementById('price_update').value = arreglo.arreglo[0].price
    document.getElementById('quantity_update').value = arreglo.arreglo[0].quantity
};

//Actualizar arreglo

const updateArreglo = async() => {
    let id = document.getElementById('id_update').value;
    let name = document.getElementById('name_update').value;
    let description = document.getElementById('descripcion_update').value;
    let price = document.getElementById('price_update').value;
    let quantity = document.getElementById('quantity_update').value;

    $.ajax({
        type: 'POST',
        url: urlA + '/producto/update/' + id,
        data: { name, description, price, quantity }
    }).done(function(res) {
        findArreglo();
    });
};

const deleteArreglo = async() => {
    let id = document.getElementById("id_delete").value;
    await $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/producto/delete/' + id
    }).done(res => {
        findArreglo();

    });
};


const getId = async id => {
    document.getElementById("id_delete").value = id;


};