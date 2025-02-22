const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Erlaubt Verbindungen von überall (für Entwicklung)
    },
});

io.on("connection", (socket) => {
    console.log("Neuer Benutzer verbunden:", socket.id);

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg); // Nachricht an alle Clients senden
    });

    socket.on("disconnect", () => {
        console.log("Benutzer getrennt:", socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
