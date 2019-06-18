module.exports = app => {
    // const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const gerente = { ...req.body }
        if(req.params.id) gerente.id = req.params.id

        try {
            // existsOrError(gerente.agencia, 'Descrição não informada')
            // existsOrError(gerente.digAgencia, 'Categoria não informada')
            // existsOrError(gerente.numContCorr, 'Autor não informado')
            // existsOrError(gerente.digContCorr, 'Conteúdo não informado')
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(gerente.id) {
            app.db('gerente')
                .update(gerente)
                .where({ id: gerente.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('gerente')
                .insert(gerente)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('gerente')
            .then(gerente => res.json(gerente))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('gerente')
            .where({ id: req.params.id })
            .first()
            .then(gerente => res.json(gerente))
            .catch(err => res.status(500).send(err))
    }

    const remove = async(req,res) => {
        try {
            const rowsDeleted = await app.db('gerente')
            .where({ id: req.params.id }).del()
            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    return { save,get, getById, remove }
}