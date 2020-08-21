/**
 * Arquivo: server.js
 * Autor: Ricardo Luciano Feijo Correa
 * Data de Criação: 21/08/2020
 */
 
//Chamadas dos pacotes:
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Pessoa = require('./app/models/pessoasDAO');
mongoose.Promise = global.Promise;

//Maneira URI: Cloud MongoDb Atlas:
mongoose.connect('mongodb+srv://usuario:mongodb1234@cluster0.mwnnz.azure.mongodb.net/dbmedprev?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true });

//BodyParser:
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Porta:
var port = process.env.port || 8000;

//Rotas:
var router = express.Router();

//Middlewares:
router.use(function(req, res, next) {
    console.log('Passou aqui');
    next(); 
});

//Iniciando app em http://localhost:8000/api 
router.get('/', function(req, res) {
    res.json({ message: 'Iniciando app' })
});

//API's:
router.route('/pessoas')

    /* 1) Método: Criar Pessoa (acessar em: POST http://localhost:8000/api/pessoas)  */
    .post(function(req, res) {
        var pessoa = new Pessoa();

        pessoa.Nome = req.body.Nome;
        pessoa.Tipo = req.body.Tipo;
        pessoa.RazaoSocial = req.body.RazaoSocial;
        pessoa.Cpf = req.body.Cpf;
        pessoa.Cnpj = req.body.Cnpj;
        pessoa.Sexo = req.body.Sexo;
        pessoa.DataNascimento = req.body.DataNascimento;
        pessoa.Email = req.body.Email;
        pessoa.Telefone = req.body.Telefone;
        pessoa.Celular = req.body.Celular;
        pessoa.Foto = req.body.Foto;

        pessoa.save(function(error) {
            if(error)
                res.send('Erro ao tentar gravar pessoa: ' + error);
            
            res.json({ message: 'PESSOA cadastrada com êxito!' });
        });
    })

    /* 2) Método: Selecionar todas as Pessoas (acessar em: GET http://localhost:8000/api/pessoas)  */
    .get(function(req, res) {
        Pessoa.find(function(error, pessoas) {
            if(error) 
                res.send('Erro ao buscar todas as pessoas: ' + error);

            res.json(pessoas);
        });
    });

    //Rotas que irão terminar em '/pessoas/:pessoa_id' (servir tanto para: GET, PUT & DELETE: id):
    router.route('/pessoas/:pessoa_id')

    /* 3) Método: Selecionar por Id: (acessar em: GET http://localhost:8000/api/pessoas/:pessoa_id) */
    .get(function (req, res) {
        
        //Função para poder Selecionar uma determinada pessoa por ID - irá verificar se caso não encontrar uma detemrinada
        //pessoa pelo id... retorna uma mensagem de error:
        Pessoa.findById(req.params.pessoa_id, function(error, peossoa) {
            if(error)
                res.send('Id da pessoa não encontrada: ' + error);

            res.json(pessoa);
        });
    })

    /* 4) Método: Atualizar por Id: (acessar em: PUT http://localhost:8000/api/pessoas/:pessoa_id) */
    .put(function(req, res) {

        //Primeiro: para atualizarmos, precisamos primeiro achar 'Id' da 'Pessoa':
        Pessoa.findById(req.params.pessoa_id, function(error, pessoa) {
            if (error) 
                res.send("Id da Pessoa não encontrada: " + error);

                //Segundo: 
                pessoa.Nome = req.body.Nome;
                pessoa.Tipo = req.body.Tipo;
                pessoa.RazaoSocial = req.body.RazaoSocial;
                pessoa.Cpf = req.body.Cpf;
                pessoa.Cnpj = req.body.Cnpj;
                pessoa.Sexo = req.body.Sexo;
                pessoa.DataNascimento = req.body.DataNascimento;
                pessoa.Email = req.body.Email;
                pessoa.Telefone = req.body.Telefone;
                pessoa.Celular = req.body.Celular;
                pessoa.Foto = req.body.Foto;

                //Terceiro: Agora que já atualizamos os dados, vamos salvar as propriedades:
                pessoa.save(function(error) {
                    if(error)
                        res.send('Erro ao atualizar a pessoa: ' + error);

                    res.json({ message: 'Pessoa atualizada com sucesso!' });
                });
            });
        })

        /* 5) Método: Excluir por Id (acessar: http://localhost:8000/api/pessoas/:pessoa_id) */
        .delete(function(req, res) {
            
            Pessoa.remove({
                _id: req.params.pessoa_id
                }, function(error) {
                    if (error) 
                        res.send("Id da Pessoa não encontrada: " + error);

                    res.json({ message: 'Pessoa Excluída com Sucesso!' });
                });
            });


//Definindo um padrão das rotas prefixadas: '/api':
app.use('/api', router);

//Iniciando a Aplicação (servidor):
app.listen(port);
console.log("Iniciando a app na porta " + port);

