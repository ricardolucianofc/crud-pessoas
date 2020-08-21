/**
 * Arquivo: produto.js
 * Autor: Ricardo Luciano Feijo Correa
 * Descrição: arquivo responsável onde trataremos o modelo da classe 'Pessoa'
 * Data: 21/08/2020 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PessoaSchema = new Schema({
    Nome: String,
    Tipo: String,
    RazaoSocial: String,
    Cpf: String,
    Cnpj: String,
    Sexo: String,
    DataNascimento: Date,
    Email: String,
    Telefone: String,
    Celular: String,
    Foto: String
});

module.exports = mongoose.model('Pessoa', PessoaSchema);
