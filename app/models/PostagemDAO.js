var ObjectID = require('mongodb').ObjectId;

function PostagemDAO(connection) {
	this._connection = connection();
}

PostagemDAO.prototype.insert = function (postagem, response) {
	this._connection.open(function (erro, mongodbclient) {
		console.log("Abrindo  conexao com o banco!");
		mongodbclient.collection('postagem', function (erro, collection) {
			collection.insert(postagem, function (erro, records) {
				if (erro) {
					response.json({ 'status': erro });
				} else {
					response.json({ 'status': 'inclusao realizada com sucesso' });
				}
				mongodbclient.close(function () {
					console.log("Fechando conexao com o banco!");
				});
			});
		});
	});
}
PostagemDAO.prototype.find = function (response) {
	this._connection.open(function (erro, mongodbclient) {
		console.log("Abrindo  conexao com o banco!");
		mongodbclient.collection('postagem', function (erro, collection) {
			collection.find().toArray(function (erro, resultado) {
				if (erro) {
					response.json(erro);
				} else {
					response.json(resultado);
				}
				mongodbclient.close(function () {
					console.log("Fechando conexao com o banco!");
				});
			});
		});
	});

}
PostagemDAO.prototype.findById = function (response, id) {

	this._connection.open(function (erro, mongodbclient) {
		console.log("Abrindo  conexao com o banco!");
		mongodbclient.collection('postagem', function (erro, collection) {
			collection.find(ObjectID(id)).toArray(function (erro, resultado) {
				if (erro) {
					response.json(erro);
				} else {
					response.json(resultado);
				}
				mongodbclient.close(function () {
					console.log("Fechando conexao com o banco!");
				});
			});
		});
	});
}

module.exports = function () {
	return PostagemDAO;
}