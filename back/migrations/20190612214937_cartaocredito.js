
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cartaocredito', table => {
        table.increments('id').primary()
        table.string('bandeira')
        table.integer('numeroCartao',16)
        table.date('validade')
        table.integer('codigoSeguranca')
        table.integer('id_cc').unsigned()
        table.foreign('id_cc').references('contacorrente.id')
})
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cartaocredito')
};
