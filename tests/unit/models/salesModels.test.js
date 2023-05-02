const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connections');
const salesModel = require('../../../src/models/salesModel');
const mock = require('../../mocks/sales.mock');

describe('Camada Model', function () {
  describe('Lista todas as vendas', function () {
    afterEach(() => sinon.restore());

    it('testa retorno das vendas', async function () {
      sinon.stub(connection, 'execute').resolves([mock.resultGetSales]);
      
      const response = await salesModel.getAllSales();

      expect(response[0]).to.have.property('saleId');
      expect(response[0]).to.have.property('date');
      expect(response[0]).to.have.property('productId');
      expect(response[0]).to.have.property('quantity');
    });

    it('testa retorno das vendas pelo Id', async function () {
      sinon.stub(connection, 'execute').resolves([mock.resultGetSalesById]);
      
      const response = await salesModel.getSalesById(1);

      expect(response).to.be.deep.equal(mock.resultGetSalesById);
    });

    it('testa se adiciona vendas novas', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);

      // alterei o arquivo mock, peguei outro que tem data
      const response = await salesModel.addSales(mock.resultGetSales);

      expect(response).to.deep.equal({ id: 5, itemsSold: mock.resultGetSales });
    });
  });
});