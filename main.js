const db = firebase.firestore();

const former = document.getElementById('formulario');

//CREATE
const crearCompi = (nombre, apellido1, apellido2, email) => {
    db.collection('Companeros').doc().set({
        nombre,
        apellido1,
        apellido2,
        email
    })
}


former.addEventListener('submit',async(e) => {
  e.preventDefault();
  let nombre = former['nombre'].value;
  let apellido1 = former['apellido1'].value;
  let apellido2 = former['apellido2'].value;
  let email = former['email'].value;

  await crearCompi(nombre, apellido1, apellido2, email);
  former.reset();
  
  alert("Registro creado correctamente");
});


// READ
const getCompaneros = () => db.collection('Companeros').get();

// Obtener los campos de entrada del formulario
let prenom2 = document.getElementById("nombre2");
let nom12 = document.getElementById("apellido1_2");
let nom22 = document.getElementById("apellido2_2");
let poster2 = document.getElementById("email2");

// Función para seleccionar un usuario y cargar sus datos en el formulario
let idSeleccionado;
function seleccionar(id, nombre, apellido1, apellido2, email) {
  idSeleccionado = id;
  // Establecer los valores de los campos de entrada del formulario con los datos del usuario seleccionado
  prenom2.value = nombre;
  nom12.value = apellido1;
  nom22.value = apellido2;
  poster2.value = email;

  // Habilitar los campos de entrada del formulario para permitir que el usuario los edite
  prenom2.removeAttribute('disabled');
  nom12.removeAttribute('disabled');
  nom22.removeAttribute('disabled');
  poster2.removeAttribute('disabled');
}

window.addEventListener('DOMContentLoaded', async(e) => {

    const querySnapshot = await getCompaneros();

    querySnapshot.forEach(doc => {
        tabla.innerHTML += `
        <tr>
            <th scope="row">${doc.id}</th>
            <td>${doc.data().nombre}</td>
            <td>${doc.data().apellido1}</td>
            <td>${doc.data().apellido2}</td>
            <td>${doc.data().email}</td>
            
            <!-- Agregar el botón de selección y llamar a la función "seleccionar()" -->
            <td><button class="btn btn-secondary" onclick="seleccionar('${doc.id}', '${doc.data().nombre}', '${doc.data().apellido1}', '${doc.data().apellido2}', '${doc.data().email}')">Select</button></td>
        </tr>
        `
    });
});


//UPDATE
// Obtener el botón "Modificar" y agregar un controlador de eventos que actualice el registro de la base de datos
let modifier = document.getElementById("modificar");
modifier.addEventListener("click", async(e) => {
    // Obtener los valores actualizados de los campos de entrada
    let nombre2 = prenom2.value;
    let apellido12 = nom12.value;
    let apellido22 = nom22.value;
    let email2 = poster2.value;
    // Actualizar el documento en la base de datos
    await db.collection('Companeros').doc(idSeleccionado).update({
        nombre: nombre2,
        apellido1: apellido12,
        apellido2: apellido22,
        email: email2
    });
    alert("Registro actualizado correctamente");
    location.reload(); // Recargar la página
});

//DELETE
// Obtener el botón "Eliminar" y agregar un controlador de eventos que elimine el registro de la base de datos
let eliminer = document.getElementById("eliminar");
eliminer.addEventListener("click", async(e) => {
    let id = idSeleccionado;
    await db.collection("Companeros").doc(id).delete();
    
    alert("El registro ha sido eliminado correctamente");
    location.reload(); // Recargar la página
});
        
