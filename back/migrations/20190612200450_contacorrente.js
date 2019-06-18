
exports.up = function(knex, Promise) {
    return knex.schema.createTable('contacorrente', table => {
        table.increments('id').primary()
        table.integer('agencia')
        table.integer('digAgencia')
        table.integer('numContCorr')
        table.integer('digContCorr')
        table.string('nomeAgencia')
    })
};


exports.down = function(knex, Promise) {
    return knex.schema.dropTable('contacorrente')
};