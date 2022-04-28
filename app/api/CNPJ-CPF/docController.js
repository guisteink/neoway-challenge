const Dao = require('./dao')
const FourDevsService = require('../../services/FourDevsService.js')

class DocController
{
    constructor()
    {
        this.validationService = FourDevsService;
        this.dao = Dao;
    }

    /**
     * Rota que irá fazer a validação de CNPJ/CPF (DOC-documento)
     * @param {*} opt 
     * @param {*} number 
     */
    async validate(req, res)
    {
        const { type, number } = req.body;
        try {
            const response = await this.validationService.isValidDocument(type, number);
            res.status(response.status).send(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Cria documento no banco
     * @param {*} req 
     * @param {*} res 
     */
    async create(req, res)
    {
        try {
            const { type, number, status } = req.body;
            if (type && number && status) {
                const newDoc = await this.dao.mongodb.insertToDb({ type, number, isValid: status ? true : false })
                if (newDoc) res.status(201).send(newDoc)
            }
            else res.status(400).send("Bad request")
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }

    /**
     * Deleta pelo id documento no banco
     * @param {*} req 
     * @param {*} res 
     */
    async deleteById(req, res)
    {
        try {
            const { id } = req.params;
            if (id) {
                const deletedDoc = await this.dao.mongodb.deleteFromDb(id);
                if (deletedDoc) res.status(200).send(deletedDoc);
            }
            else res.status(400).send("Bad request")
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }

    /**
     * Edita pelo id e body passado o documento existente no banco
     * @param {*} req 
     * @param {*} res 
     */
    async updateById(req, res)
    {
        try {
            const { id } = req.params;
            const { type, number, status } = req.body;
            if (id && (type || number || status)) {
                const updatedDoc = await this.dao.mongodb.updateById(id, { type: type, status: status, number: number })
                if (updatedDoc) res.status(201).send(updatedDoc);
            }
            else res.status(400).send("Bad request")
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }

    /**
     * Recupera pelo id o documento no banco
     * @param {*} req 
     * @param {*} res 
     */
    async getById(req, res)
    {
        try {
            const { id } = req.params;
            if (id) {
                const findId = await this.dao.mongodb.getById(id);
                if (findId) res.status(200).send(findId);
            }
            else res.status(400).send("Bad request")
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }

    /**
     * Envia o documento do banco para a collection blocklist
     * @param {*} req 
     * @param {*} res 
     */
    async addToBlockList(req, res)
    {
        try {
            const { type, number, status } = req.body;
            if (type && number && status) {
                const newBlock = await this.dao.mongodb.addToBlockList({ type, number, isValid: status ? true : false })
                if (newBlock) res.status(201).send(newBlock)
            }
            else res.status(400).send("Bad request")
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }

    /**
     * Deleta o documento do banco da collection blocklist
     * @param {*} req 
     * @param {*} res 
     */
    async removeFromBlockList(req, res)
    {
        try {
            const { id } = req.params;
            if (id) {
                const deletedDoc = await this.dao.mongodb.removeFromBlockList(id);
                if (deletedDoc) res.status(200).send(deletedDoc);
            }
            else res.status(400).send("Bad request")
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
}

module.exports = new DocController();