// Función para abrir el formulario de citas al hacer clic en el botón "Comencemos"
function openAppointmentForm() {
    window.location.href = 'Podiatry.html'; // Redirige al archivo de citas "Podiatry.html"
}

// Agregar el evento al botón "Comencemos"
document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.querySelector('.start-button');
    
    if (startButton) {
        startButton.addEventListener('click', openAppointmentForm);
    }
});
