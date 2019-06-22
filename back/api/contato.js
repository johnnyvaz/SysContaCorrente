module.exports = app => {
    // const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const contato = { ...req.body }
        if(req.params.id) contato.id = req.params.id

        try {
            // existsOrError(contato.agencia, 'Descrição não informada')
            // existsOrError(contato.digAgencia, 'Categoria não informada')
            // existsOrError(contato.numContCorr, 'Autor não informado')
            // existsOrError(contato.digContCorr, 'Conteúdo não informado')
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(contato.id) {
            app.db('contato')
                .update(contato)
                .where({ id: contato.id })
                .then(_ => res.status(204).send('contato Atualizado com sucesso'))
                .catch(err => res.status(500).send(err))
        } else {
            app.db('contato')
                .insert(contato)
                .then(_ => res.status(204).send('contato salvo com sucesso'))
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('contato')
            .then(contato => res.json(contato))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('contato')
            .where({ id: req.params.id })
            .first()
            .then(contato => res.json(contato))
            .catch(err => res.status(500).send(err))
    }

    const remove = async(req,res) => {
        try {
            const rowsDeleted = await app.db('contato')
            .where({ id: req.params.id }).del()
            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    return { save, get, getById, remove }
}