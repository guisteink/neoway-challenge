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
    async validate(req, res, next)
    {
        const { type, number } = req.body;
        try {
            const response = await this.validationService.isValidDocument(type, number);
            return res.status(response.status).send(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Cria documento no banco
     * @param {*} req 
     * @param {*} res 
     */
    async create(req, res, next)
    {
        try {
            const { type, number, isValid } = req.body;
            if (type && number) {
                const newDoc = await this.dao.mongodb.insertToDb({ type, number, isValid })
                return res.status(201).send(newDoc)
            }
            else return res.status(400).send("Bad request")
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }
    }

    /**
     * Deleta pelo id documento no banco
     * @param {*} req 
     * @param {*} res 
     */
    async deleteById(req, res, next)
    {
        try {
            const { id } = req.params;
            if (id) {
                const deletedDoc = await this.dao.mongodb.deleteFromDb(id);
                return res.status(200).send(deletedDoc);
            }
            else res.status(400).send("Bad request")
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }
    }

    /**
     * Edita pelo id e body passado o documento existente no banco
     * @param {*} req 
     * @param {*} res 
     */
    async updateById(req, res, next)
    {
        try {
            const { id } = req.params;
            const { type, number, isValid } = req.body;
            if (id && (type || number || isValid)) {
                const updatedDoc = await this.dao.mongodb.updateById(id, { type, isValid, number })
                return res.status(200).send(updatedDoc);
            }
            else res.status(400).send("Bad request")
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }
    }

    /**
     * Recupera pelo id o documento no banco
     * @param {*} req 
     * @param {*} res 
     */
    async getById(req, res, next)
    {
        try {
            const { id } = req.params;
            if (id) {
                const findId = await this.dao.mongodb.getById(id);
                return res.status(200).send(findId);
            }
            else return res.status(400).send("Bad request")
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }
    }

    /**
     * Recupera todos os documentos
     * @param {*} req 
     * @param {*} res 
     */
    async getAll(req, res, next)
    {
        try {
            const findAll = await this.dao.mongodb.listAll()
            return res.status(200).send(findAll);
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }
    }

    /**
     * Envia o documento do banco para a collection blocklist
     * @param {*} req 
     * @param {*} res 
     */
    async addToBlockList(req, res, next)
    {
        try {
            const { type, number, isValid } = req.body;
            if (type && number && isValid) {
                const newBlock = await this.dao.mongodb.addToBlockList({ type, number, isValid })
                return res.status(201).send(newBlock)
            }
            else return res.status(400).send("Bad request")
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }
    }

    /**
     * Deleta o documento do banco da collection blocklist
     * @param {*} req 
     * @param {*} res 
     */
    async removeFromBlockList(req, res, next)
    {
        try {
            const { id } = req.params;
            if (id) {
                const deletedDoc = await this.dao.mongodb.removeFromBlockList(id);
                return res.status(200).send(deletedDoc);
            }
            else return res.status(400).send("Bad request")
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }
    }


    /**
     * Deleta o documento do banco da collection blocklist
     * @param {*} req 
     * @param {*} res 
     */
    async getBlockList(req, res, next)
    {
        try {
            const listAll = await this.dao.mongodb.getBlockList()
            return res.status(200).send(listAll)
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }
    }

}

module.exports = new DocController();