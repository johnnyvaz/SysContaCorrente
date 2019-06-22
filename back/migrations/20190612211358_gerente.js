
exports.up = function(knex, Promise) {
    return knex.schema.createTable('gerente', table => {
        table.increments('id').primary()
        table.string('nome')
        table.integer('telefone',11)
        table.date('dataNasc')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('gerente')
};
