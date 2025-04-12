// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

// Configura tus credenciales de Twilio
const accountSid = 'TU_ACCOUNT_SID';
const authToken = 'TU_AUTH_TOKEN';
const twilioNumber = '+1XXXXXXXXXX'; // Tu número de Twilio

const client = twilio(accountSid, authToken);
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Endpoint para enviar el SMS
app.post('/send-sms', async (req, res) => {
  const { phone, firstname, appointmentDate, appointmentTime } = req.body;

  const smsBody = `Hi ${firstname}, your appointment is confirmed for ${appointmentDate} at ${appointmentTime}.`;

  try {
    await client.messages.create({
      body: smsBody,
      from: twilioNumber,
      to: `+1${phone}` // Asegúrate que el número tenga el código de país
    });

    res.json({ status: 'SMS enviado correctamente ✅' });
  } catch (error) {
    res.status(500).json({ status: `Error al enviar SMS: ${error.message}` });
  }
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
