document.getElementById("appointment-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de manera tradicional

    // Mostrar mensaje "Your information was processed successfully, a PDF was sent to the phone number +17867955654 with your appointment information"
    alert("Your information is being processed");

    // Recoger los datos del formulario
    const insurance = document.getElementById("insurance").value;
    const memberId = document.getElementById("member-id").value;
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const dateOfBirth = document.getElementById("date-of-birth").value;
    const phone = document.getElementById("phone").value;

    // Validación de los campos requeridos
    const inputs = document.querySelectorAll("#appointment-form input[required], #appointment-form select[required]");
    let valid = true;
    inputs.forEach(input => {
        if (!input.value) {
            valid = false;
            alert(`Please fill in the required field: ${input.placeholder || input.name}`);
        }
    });

    if (!valid) return; // Si no es válido, detener el proceso

    // Crear el objeto de datos para la solicitud
    const data = {
        insurance,
        memberId,
        firstname,
        lastname,
        dateOfBirth,
        phone
    };

    try {
        // Enviar la solicitud POST al servidor
        const response = await fetch("http://localhost:3000/verify-insurance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data) // Enviar los datos como JSON
        });

        // Manejar la respuesta del servidor
        const result = await response.json();

        // Verificar si la verificación del seguro fue exitosa
        if (response.ok) {
            alert("Seguro verificado exitosamente: " + JSON.stringify(result.data));
        } else {
            alert("Error en la verificación del seguro: " + result.message);
        }

        // Generar el PDF con los campos del formulario
        generatePDF();
    } catch (error) {
        alert("Error en la conexión con el servidor: " + error.message);
    }
});

// Función para generar el PDF
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Obtener los valores del formulario
    const firstname = document.getElementById("firstname").value || "";
    const lastname = document.getElementById("lastname").value || "";
    const dateOfBirth = document.getElementById("date-of-birth").value || "";
    const phone = document.getElementById("phone").value || "";
    const insurance = document.getElementById("insurance").value || "";
    const memberId = document.getElementById("member-id").value || "";

    // Crear el contenido del PDF
    doc.text(`First Name: ${firstname}`, 10, 20);
    doc.text(`Last Name: ${lastname}`, 10, 30);
    doc.text(`Date of Birth: ${dateOfBirth}`, 10, 40);
    doc.text(`Phone Number: ${phone}`, 10, 50);
    doc.text(`Insurance: ${insurance}`, 10, 60);
    doc.text(`Member ID: ${memberId}`, 10, 70);

    // Guardar el PDF con un nombre
    doc.save('appointment_form.pdf');
}
