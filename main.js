const {Client, LocalAuth} = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const client = new Client({authStrategy: new LocalAuth(),});
const http = require('http');

client.on("qr", (qr) => {
    qrcode.generate(qr, {small: true});
    console.log("Escanea el código");
});

client.on('ready', () => {
    console.log("El bot está listo");
});

client.on('message', message => {
    console.log("NEW MESSAGE: ", message);
    const opcion = message.body.trim(); 
    let respuestaDetalle = '';
    
    // Define el menú principal
    const menuPrincipal = `Escribe el número correspondiente según tu locación:
1. Vistas de las Mitras - Acceso 7.
2. Vistas de las Mitras - Acceso 8.
3. UHM.`;

    // --- LÓGICA DE PROCESAMIENTO ---
    
    // 1. CHEQUEO DE OPCIONES VÁLIDAS (1, 2, 3)
    if (opcion === '1') {
        // Opción 1: Vistas de las Mitras-Acceso 7
        respuestaDetalle = `📍 Vistas de las Mitras - Acceso 7
✅ Servicio:
- Internet residencial 100 MB - Vía Fibra Óptica.
- Sin costo de instalación.
- Contrato a 36 meses.
✅ Requisitos:
- Carta de entrega de la vivienda.
- Identificación oficial (INE).
- Comprobante de domicilio.
📌 Costo mensual: $500 MXN.
📌 Enviar requisitos por este medio.`;
        
    } else if (opcion === '2') {
        // Opción 2: Vistas de las Mitras-Acceso 8
        respuestaDetalle = `📍 Vistas de las Mitas - Acceso 8
✅ Servicio:
- Internet residencial 100 MB - Vía microondas (Antena).
- Sin costo de instalación.
- Contrato a 36 meses.
✅ Requisitos:
- Carta de entrega de la vivienda.
- Identificación oficial (INE).
- Comprobante de domicilio.
📌 Costo mensual: $500 MXN.
📌 Enviar requisitos por este medio.`;
        
    } else if (opcion === '3') {
        // Opción 3: UHM
        respuestaDetalle = `📍 UHM
✅ Servicio:
- Internet residencial 100 MB Simétricos - Vía Fibra Óptica.
- Sin costo de instalación.
- Firma de contrato.
✅ Requisitos:
- Recibo del arrendamiento.
- Identificación oficial (INE).
📌 Costo mensual: $500 MXN.
📌 Enviar requisitos por este medio.`;
        
    } else {
        // 2. CATCH-ALL: Cualquier otra cosa que NO sea 1, 2, o 3
        
        // **ÚNICO CAMBIO:** Ahora solo se asigna el contenido del menú principal.
        respuestaDetalle = menuPrincipal;
    }

    // Enviamos la respuesta
    message.reply(respuestaDetalle);
});

client.initialize();

// --- CÓDIGO AÑADIDO PARA RENDER ---
const port = process.env.PORT || 10000;

// Crea un servidor HTTP básico que responde OK a cualquier solicitud
http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Bot está vivo!\n');
}).listen(port, () => {
    console.log(`Servidor de mantenimiento escuchando en el puerto ${port}`);
});