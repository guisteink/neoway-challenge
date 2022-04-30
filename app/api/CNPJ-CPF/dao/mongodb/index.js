const { DocModel, BlocklistModel } = require('../../../../../modules/db-adapters/mongo-db/models/doc.model');

class DocRepository
{
    static async insertToDb(data)
    {
        const newDoc = await DocModel.create(data)
        return newDo
    }

    static async deleteFromDb(id)
    {
        const deletedDoc = await DocModel.findByIdAndDelete({ _id: id })
        return deletedDoc
    }

    static async updateById(id, data)
    {
        const updatedNote = await DocModel.findByIdAndUpdate({ _id: id }, data, { new: true, useFindAndModify: false })
        return updatedNote
    }

    static async getById(id)
    {
        const findNote = await DocModel.findOne({ _id: id })
        return findNote
    }

    static async addToBlockList(data)
    {
        const newDoc = await BlocklistModel.create(data)
        return newDoc
    }

    static async removeFromBlockList(id)
    {
        const deletedDoc = await BlocklistModel.findByIdAndDelete({ _id: id })
        return deletedDoc
    }
}

module.exports = DocRepository;