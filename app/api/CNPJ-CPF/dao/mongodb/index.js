const docModel = require('../../../../../modules/db-adapters/mongo-db/models/doc.model')

// const insertToDb = data =>
// {
//     const newDoc = docModel.create(data)
//     return newDoc
// }

// const deleteFromDb = id =>
// {
//     const deletedDoc = docModel.findByIdAndDelete({ _id: id })
//     return deletedDoc
// }

// const updateById = (id, data) =>
// {
//     const updatedNote = docModel.findByIdAndUpdate({ _id: id }, data, { new: true, useFindAndModify: false })
//     return updatedNote
// }

// const getById = (id, data) =>
// {
//     const findNote = docModel.findOne({ _id: id })
//     return findNote
// }

// module.exports = [
//     insertToDb,
//     deleteFromDb,
//     updateById,
//     getById
// ]

class DocRepository
{
    static async insertToDb(data)
    {
        const newDoc = await docModel.create(data)
        return newDoc
    }

    static async deleteFromDb(id)
    {
        const deletedDoc = await docModel.findByIdAndDelete({ _id: id })
        return deletedDoc
    }

    static async updateById(id, data)
    {
        const updatedNote = await docModel.findByIdAndUpdate({ _id: id }, data, { new: true, useFindAndModify: false })
        return updatedNote
    }

    static async getById(id)
    {
        const findNote = await docModel.findOne({ _id: id })
        return findNote
    }
}

module.exports = DocRepository;