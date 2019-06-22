
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cartaocredito', table => {
        table.increments('id').primary()
        table.string('bandeira')
        table.integer('numeroCartao',16)
        table.date('validade')
        table.integer('codigoSeguranca')
})
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cartaocredito')
};
