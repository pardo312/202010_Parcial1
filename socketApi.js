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
                socketApi.sendNotification(data)
            }, data);
        })
    })
    socket.on("new-user", data => {
        Mongolib.getDatabase(db => {
            Mongolib.insertDocuments(db, () => {
                socketApi.sendNotificationUser(data)
            }, data);
        })
    })
});

socketApi.sendNotification = (data) => {
    Mongolib.getDatabase(db => {
        Mongolib.findDocuments(() => {
            io.sockets.emit('offers', data);
        });
    })
}

socketApi.sendNotificationUser = (data) => {
    Mongolib.getDatabase(db => {
        Mongolib.findDocumentsUsers( () => {
            io.sockets.emit('users', data);
        });
    })
}

module.exports = socketApi;
