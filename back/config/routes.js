
module.exports = app => {
  
    app.route('/cc')
        .get(app.api.contacorrente.get)
        .post(app.api.contacorrente.save)

    app.route('/cc/:id')
        .put(app.api.contacorrente.save)
        .get(app.api.contacorrente.getById)
        .delete(app.api.contacorrente.remove)
    
    app.route('/ge')
        .get(app.api.gerente.get)
        .post(app.api.gerente.save)

    app.route('/ge/:id')
        .put(app.api.gerente.save)
        .get(app.api.gerente.getById)
        .delete(app.api.gerente.remove)

    app.route('/cart')
        .get(app.api.cartaocredito.get)
        .post(app.api.cartaocredito.save)

    app.route('/cart/:id')
        .put(app.api.cartaocredito.save)
        .get(app.api.cartaocredito.getById)
        .delete(app.api.cartaocredito.remove)
    
    app.route('/contato')
        .get(app.api.contato.get)
        .post(app.api.contato.save)

    app.route('/contato/:id')
        .put(app.api.contato.save)
        .get(app.api.contato.getById)
        .delete(app.api.contato.remove)
    }