var express = require('express');
var bodyParser = require('body-parser');
var consign = require('consign');
var listenServerCallback = require('./app/utils/listenServerCallback');

var port = 8080;

var application = express();

application.use(bodyParser.urlencoded({ extended: true }));
application.use(bodyParser.json());


consign().include('app/models')
    .then('config/dbConnection.js').into(application);

application.listen(port, listenServerCallback);
/*GET raiz da aplicacao */
application.get('/', function (request, response) {
    response.send({ msg: 'Olá!' });
});

var connection = application.config.dbConnection;
var PostagemDAO = new application.app.models.PostagemDAO(connection);


/*POST criando registro */
application.post('/api', function (request, response) {
    var dados = {
        titulo: request.body.titulo
    }
    PostagemDAO.insert(dados, response);


});

/*GET lendo registro */
application.get('/api', function (request, response) {
    console.log(request.params.id);
    PostagemDAO.find(response);

});

/*PUT atualizando registro */
application.get('/api/:id', function (request, response) {
    console.log(request.params.id);
    PostagemDAO.findById(response, request.params.id);
});

/*DELETE deletar registro */
application.delete('/api', function (request, response) {
    PostagemDAO.delete(response, request.params.id);
});