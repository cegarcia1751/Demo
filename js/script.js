document.addEventListener("DOMContentLoaded", function() {
    // Obtener los campos del formulario
    var dateOfBirthInput = document.getElementById("date-of-birth");
    var appointmentDateInput = document.getElementById("appointment-date");
    var appointmentTimeInput = document.getElementById("appointment-time");
    var insuranceInput = document.getElementById("insurance"); // Obtener el campo de seguro
    var memberIdInput = document.getElementById("member-id"); // Obtener el campo de ID del miembro

    // Función para manejar la habilitación/deshabilitación del campo Member ID
    function toggleMemberIdField() {
        if (insuranceInput.value === "i_do_not_have_insurance") {
            memberIdInput.disabled = true; // Deshabilitar el campo Member ID
            memberIdInput.value = ""; // Limpiar el valor si está deshabilitado
        } else {
            memberIdInput.disabled = false; // Habilitar el campo Member ID
        }
    }

    // Llamar a la función inicialmente para ajustar el estado del campo Member ID según la selección actual
    toggleMemberIdField();

    // Agregar un evento de cambio al campo de seguro para detectar cuando se selecciona "I do not have insurance"
    insuranceInput.addEventListener("change", toggleMemberIdField);

    // Función para validar el campo de Member ID (solo letras y números, sin símbolos)
    memberIdInput.addEventListener("input", function() {
        var regex = /^[A-Za-z0-9]+$/; // Expresión regular para aceptar solo letras y números
        if (!regex.test(memberIdInput.value)) {
            // Si el valor no cumple con la expresión regular, eliminamos el último carácter ingresado
            memberIdInput.setCustomValidity("Member ID must contain only letters and numbers, no symbols.");
        } else {
            // Si el valor cumple con la expresión regular, permitimos el envío
            memberIdInput.setCustomValidity("");
        }
    });

    // Obtener la fecha actual
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
    var yyyy = today.getFullYear();

    // Formatear la fecha en formato yyyy-mm-dd para el valor máximo (fecha de ayer) para el campo de fecha de nacimiento
    var yesterday = yyyy + '-' + mm + '-' + (String(today.getDate() - 1).padStart(2, '0'));

    // Formatear la fecha en formato yyyy-mm-dd para el valor mínimo (fecha de hoy) para el campo de la cita
    var todayDate = yyyy + '-' + mm + '-' + dd;

    // Establecer el valor máximo para el campo de fecha de nacimiento (no permitir la fecha de hoy ni futuras)
    dateOfBirthInput.setAttribute("max", yesterday);

    // Establecer el valor mínimo para el campo de fecha de la cita (no permitir una fecha anterior al día de hoy)
    appointmentDateInput.setAttribute("min", todayDate);

    // Inicializar flatpickr en el campo de fecha de nacimiento con restricciones
    flatpickr(dateOfBirthInput, {
        maxDate: yesterday,  // Limitar la fecha máxima (no permitir fechas futuras)
        dateFormat: "Y-m-d", // Formato de la fecha en el calendario
        placeholder: "Enter your Date of Birth", // Placeholder personalizado
        onOpen: function() {
            dateOfBirthInput.setAttribute("placeholder", "Select your Date of Birth");
        },
        onClose: function() {
            dateOfBirthInput.setAttribute("placeholder", "Enter your Date of Birth");
        }
    });

    // Inicializar flatpickr en el campo de fecha de cita con restricciones
    flatpickr(appointmentDateInput, {
        minDate: todayDate, // Limitar la fecha mínima (no permitir fechas anteriores al día de hoy)
        dateFormat: "Y-m-d", // Formato de la fecha en el calendario
        placeholder: "Enter your Appointment Date", // Placeholder personalizado
        onOpen: function() {
            appointmentDateInput.setAttribute("placeholder", "Appointment Date");
        },
        onClose: function() {
            appointmentDateInput.setAttribute("placeholder", "Appointment Date");
        }
    });

    // Inicializar flatpickr en el campo de hora de la cita con restricciones
    flatpickr(appointmentTimeInput, {
        enableTime: true, // Habilitar la selección de tiempo
        noCalendar: true, // Deshabilitar la selección de fecha
        dateFormat: "H:i", // Formato de la hora
        minTime: "08:00", // Hora mínima (08:00 AM)
        maxTime: "17:00", // Hora máxima (05:00 PM)
        minuteIncrement: 30, // Permitir intervalos de 30 minutos
        placeholder: "Enter your Appointment Time", // Placeholder personalizado
        onOpen: function() {
            appointmentTimeInput.setAttribute("placeholder", "Appointment Time");
        },
        onClose: function() {
            appointmentTimeInput.setAttribute("placeholder", "Enter your Appointment Time");
        }
    });

    // Validación del formulario al enviarlo
    var appointmentForm = document.getElementById("appointment-form");

    appointmentForm.addEventListener("submit", function(event) {
        var dateOfBirthValue = dateOfBirthInput.value;
        var appointmentDateValue = appointmentDateInput.value;
        var appointmentTimeValue = appointmentTimeInput.value;
        
        // Validar si se ha ingresado la fecha de nacimiento
        if (!dateOfBirthValue) {
            event.preventDefault(); // Prevenir el envío si no se ha ingresado la fecha de nacimiento
            alert("Please select your date of birth.");
            return;
        }

        // Validar si se ha ingresado la fecha de cita
        if (!appointmentDateValue) {
            event.preventDefault(); // Prevenir el envío si no se ha ingresado la fecha de cita
            alert("Please select your appointment date.");
            return;
        }

        // Validar si se ha ingresado la hora de cita
        if (!appointmentTimeValue) {
            event.preventDefault(); // Prevenir el envío si no se ha ingresado la hora de cita
            alert("Please select your appointment time.");
            return;
        }

        // Si todo es válido, continuar con el envío del formulario
        console.log("Formulario enviado correctamente.");
    });
});
