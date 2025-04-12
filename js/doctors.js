document.addEventListener("DOMContentLoaded", function() {
    var serviceInput = document.getElementById("service");
    var officeInput = document.getElementById("office");
    var doctorInput = document.getElementById("doctor");

    // Función para deshabilitar doctores que no están en la lista de habilitados
    function disableDoctorsExcept(enabledDoctors) {
        var doctorOptions = Array.from(doctorInput.options);
        doctorOptions.forEach(function(option) {
            option.disabled = !enabledDoctors.includes(option.value);
        });
    }

    // Función para manejar la habilitación/deshabilitación de los doctores según oficina y servicio
    function toggleDoctorField() {
        var selectedService = serviceInput.value;
        var selectedOffice = officeInput.value;

        // Primero, habilitar todos los doctores
        disableDoctorsExcept([]);

        // Lógica de habilitación/deshabilitación según oficina y servicio
        if (selectedOffice === "key_west") {
            if (selectedService === "home_visits") {
                // En Key West: Solo habilitar el doctor 2 para "Home Visits"
                disableDoctorsExcept(["doctor2"]);
            } else {
                // En Key West: Solo habilitar el doctor 1 para otros servicios, deshabilitar doctor 2
                disableDoctorsExcept(["doctor1"]);
            }
        } else if (selectedOffice === "coral_gables") {
            // En Coral Gables: Solo habilitar doctor 3 para todos los servicios
            disableDoctorsExcept(["doctor3"]);
        } else if (selectedOffice === "homestead") {
            // En Homestead: Inicialmente habilitamos doctores 3 y 4
            var enabledDoctors = ["doctor3", "doctor4"];  

            if (selectedService === "home_visits") {
                // En Homestead: Solo habilitar doctor 2 para "Home Visits"
                enabledDoctors = ["doctor2"];
            } else if (selectedService === "diabetic_foot_care") {
                // En Homestead: Habilitar doctores 2, 3 y 4 para "Diabetic Foot Care"
                enabledDoctors = ["doctor2", "doctor3", "doctor4"];
            }

            // Si no es "Home Visits" ni "Diabetic Foot Care", solo habilitamos doctores 3 y 4
            if (selectedService !== "home_visits" && selectedService !== "diabetic_foot_care") {
                enabledDoctors = ["doctor3", "doctor4"];
            }

            disableDoctorsExcept(enabledDoctors);
        }

        // Limpiar la selección si el doctor está deshabilitado
        if (doctorInput.value === "doctor2" && doctorInput.options.find(option => option.value === "doctor2").disabled) {
            doctorInput.value = "";  // Limpia la selección si el doctor está deshabilitado
        }
    }

    // Llamar a la función cada vez que cambien los valores de oficina o servicio
    officeInput.addEventListener("change", toggleDoctorField);
    serviceInput.addEventListener("change", toggleDoctorField);

    // Llamar a la función para inicializar el estado de los doctores al cargar la página
    toggleDoctorField();
});
