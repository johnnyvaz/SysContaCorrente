
exports.up = function(knex, Promise) {
    return knex.schema.createTable('gerente', table => {
        table.increments('id').primary()
        table.string('nome')
        table.integer('telefone',11)
        table.date('dataNasc')
        table.integer('id_cc').unsigned()
        table.foreign('id_cc').references('contacorrente.id')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('gerente')
};
