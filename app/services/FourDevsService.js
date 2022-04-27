const axios = require('axios');
const FormData = require('form-data');

class FourDevsService
{
    constructor()
    {
        this.baseUrl = "https://www.4devs.com.br/ferramentas_online.php"
    }

    async isValidDocument(opt, number)
    {
        let response;
        let formData = new FormData();
        opt = opt.toLowerCase();

        switch (opt) {
            case "cnpj":
                formData.append("acao", "validar_cnpj")
                formData.append("txt_cnpj", number)
                response = await axios({
                    method: 'POST',
                    url: this.baseUrl,
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                return response

            case "cpf":
                formData.append("acao", "validar_cpf")
                formData.append("txt_cpf", number)
                response = await axios({
                    method: 'POST',
                    url: this.baseUrl,
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                return response
            default:
                break;
        }

    }

}

module.exports = new FourDevsService();