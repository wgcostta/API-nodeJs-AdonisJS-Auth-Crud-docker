"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Tweet extends Model {
  //Retornar o relacionamento do usuário na tabela user
  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = Tweet;
