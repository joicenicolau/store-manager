//  course - aula 5.3
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const salesController = require('../../../src/controllers/salesControllers');
const salesService = require('../../../src/services/salesServices');
const mock = require('../../mocks/sales.mock');

describe('Camada Controller', function () {
  describe('Caso de sucesso de retorno de todos os produtos', function () {
    afterEach(() => sinon.restore());

    it('testa o retorno do erro da addSales', async function () {
      const req = {
        body: {
          productId: 99,
          quantity: 35
        }
      };

      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();


      sinon.stub(salesService, 'addSales').resolves({ type: 404, message: 'Product not found' });

      await salesController.addSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('testa o retorno de sucesso da addSales', async function () {
      const req = {
        body: {
          productId: 1,
          quantity: 5
        }
      };

      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'addSales').resolves({ type: null, message: mock.resultAddSales });

      await salesController.addSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(mock.resultAddSales);
    });

    it('testa a função getAllSales', async function () {
      const req = {};

      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon.stub(salesService, 'getAllSales').resolves(mock.resultGetSales);

      await salesController.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mock.resultGetSales);
    });

    it('testa a função getSalesById', async function () {
      const req = {
        params: { id: 1 }
      };

      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getSalesById').resolves(mock.resultGetSalesById);

      await salesController.getSalesById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mock.resultGetSalesById);
    });

    it('testa erro da getSalesByID', async function () {
      const req = {
        params: { id: 64 }
      };

      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getSalesById').resolves([]);

      await salesController.getSalesById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });
});



