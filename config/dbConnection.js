var mongodb = require('mongodb');

var connMongoDB = function() {
    console.log('Entrou na função de conexão');
    var db = new mongodb.Db(
        'instagram',
        new mongodb.Server(
            'localhost',
            27017,
            {}
        ),
        {}
    );

    return db;
}

module.exports = function() {
    return connMongoDB;
}