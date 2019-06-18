module.exports = app => {
    // const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const cartaocredito = { ...req.body }
        if(req.params.id) cartaocredito.id = req.params.id

        try {
            // existsOrError(cartaocredito.agencia, 'Descrição não informada')
            // existsOrError(cartaocredito.digAgencia, 'Categoria não informada')
            // existsOrError(cartaocredito.numContCorr, 'Autor não informado')
            // existsOrError(cartaocredito.digContCorr, 'Conteúdo não informado')
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(cartaocredito.id) {
            app.db('cartaocredito')
                .update(cartaocredito)
                .where({ id: cartaocredito.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('cartaocredito')
                .insert(cartaocredito)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('cartaocredito')
            .then(cartaocredito => res.json(cartaocredito))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('cartaocredito')
            .where({ id: req.params.id })
            .first()
            .then(cartaocredito => res.json(cartaocredito))
            .catch(err => res.status(500).send(err))
    }

    const remove = async(req,res) => {
        try {
            const rowsDeleted = await app.db('cartaocredito')
            .where({ id: req.params.id }).del()
            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    return { save,get, getById, remove }
}