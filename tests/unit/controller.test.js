const Controller = require('../../app/api/CNPJ-CPF/docController');
const httpMocks = require('node-mocks-http');
const docDao = require('../../app/api/CNPJ-CPF/dao')
const docModel = require('../../modules/db-adapters/mongo-db/models/doc.model')

jest.mock("../../modules/db-adapters/mongo-db/models/doc.model.js")

let req, res, next;

beforeEach(() =>
{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

let validCPF = "17986751703"
let invalidCPF = "17986751702"
let invalidCNPJ = "00000"
let validCNPJ = "42.911.970/0001-99"
let docId = "626d4bb7b56c4e6667e8f017"
let docIdInvalid = "invalidId"

let newDoc = {
    type: "cnpj", number: validCNPJ, isValid: true
}

let docUpdate = {
    number: invalidCNPJ, isValid: false
}

describe("\nController.create", () =>
{
    beforeEach(() =>
    {
        req.body = newDoc;
    });

    it("should have a create function", () =>
    {
        expect(typeof Controller.create).toBe('function');
    })

    it("should return a 201 response code", async () =>
    {
        await Controller.create(req, res, next);

        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })

    it("should call insertToDB method", async () =>
    {
        await Controller.create(req, res, next);
        expect(docDao.mongodb.insertToDB).toBeCalledWith(newDoc);
    })

})

describe("\nController.deleteById", () =>
{
    it("should have a deleteById function", () =>
    {
        expect(typeof Controller.deleteById).toBe('function');
    })

    it("should return 200 status code and delete doc", async () =>
    {
        req.params.id = docId;
        await Controller.deleteById(req, res, next)
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    })

    it("should handle errors", async () =>
    {
        const errorMessage = { message: "Error deleting doc" };
        const rejectedPromise = Promise.reject(errorMessage);
        docModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
        await Controller.deleteById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    })

})

describe("\nController.updateById", () =>
{
    it("should have a updateById function", () =>
    {
        expect(typeof Controller.updateById).toBe('function');
    })

    it("should return 200 status code and update doc", async () =>
    {
        req.params.id = docId;
        req.body = docUpdate
        await Controller.updateById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    })



})

describe("\nController.getById", () =>
{
    it("should have a getById function", () =>
    {
        expect(typeof Controller.getById).toBe('function');
    })

    it("should return 200 status code and get doc", async () =>
    {
        req.params.id = docId;
        await Controller.getById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    })

    it("should handle errors", async () =>
    {
        const errorMessage = { message: "Error geting doc" };
        const rejectedPromise = Promise.reject(errorMessage);
        docModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
        await Controller.getById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    })

})