const Controller = require('../../app/api/CNPJ-CPF/controller');
const httpMocks = require('node-mocks-http');

let req, res;
beforeEach(() =>
{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
});

let validCPF = "17986751703"
let invalidCPF = "17986751702"
let invalidCNPJ = "00000"
let validCNPJ = "42.911.970/0001-99"

describe("\nController.create", () =>
{

    beforeEach(() =>
    {
        req.body = {
            type: "cpf",
            number: validCPF
        };
    });

    it("should have a create function", () =>
    {
        expect(typeof Controller.create).toBe('function');
    })
})

describe("\nController.deleteById", () =>
{
    it("should have a deleteById function", () =>
    {
        expect(typeof Controller.deleteById).toBe('function');
    })

})

describe("\nController.updateById", () =>
{
    it("should have a updateById function", () =>
    {
        expect(typeof Controller.updateById).toBe('function');
    })

})

describe("\nController.getById", () =>
{
    it("should have a getById function", () =>
    {
        expect(typeof Controller.getById).toBe('function');
    })

})