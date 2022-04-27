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
        } catch (error) {
            console.log(error)
        }

    }

    /**
     * Deleta pelo id documento no banco
     * @param {*} req 
     * @param {*} res 
     */
    async deleteById(req, res)
    {

    }

    /**
     * Edita pelo id e body passado o documento existente no banco
     * @param {*} req 
     * @param {*} res 
     */
    async updateById(req, res)
    {

    }

    /**
     * Recupera pelo id o documento no banco
     * @param {*} req 
     * @param {*} res 
     */
    async getById(req, res)
    {

    }

    /**
     * Envia o documento do banco para a collection blocklist
     * @param {*} req 
     * @param {*} res 
     */
    async addToBlockList(req, res)
    {

    }

    /**
     * Deleta o documento do banco da collection blocklist
     * @param {*} req 
     * @param {*} res 
     */
    async removeFromBlockList(req, res)
    {

    }
}

module.exports = new DocController();