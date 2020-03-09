let socket_io = require("socket.io");
var io = socket_io();
var socketApi = {};

const Mongolib = require("./db/Mongolib");

socketApi.io = io;

io.on('connection', function (socket) {

    Mongolib.getDatabase(db => {
        Mongolib.findDocuments(db, docs => {
            io.sockets.emit('offers', docs);
        });
    })

    socket.on("new-offer", data => {
        Mongolib.getDatabase(db => {
            Mongolib.insertDocuments(db, () => {
                socketApi.sendNotification()
            }, data);
        })
    })
    socket.on("new-user", data => {
        Mongolib.getDatabase(db => {
            Mongolib.insertDocuments(db, () => {
                socketApi.sendNotification()
            }, data);
        })
    })
    socket.on("reinicio",data => {
        Mongolib.getDatabase(db => {
            Mongolib.reset(db, () => {io.sockets.emit('reiniciar')}, data);
        })
    })
});

socketApi.sendNotification = () => {
    Mongolib.getDatabase(db => {
        Mongolib.findDocuments(db, docs => {
            io.sockets.emit('offers', docs);
        });
    })
}

module.exports = socketApi;
