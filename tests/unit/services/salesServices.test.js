// pesquisa: https://github.com/tryber/sd-027-a-live-lectures/blob/lecture/back/5.5/tests/unit/service/questionService.test.js
const { expect } = require('chai');
const sinon = require('sinon'); 
const salesModel = require('../../../src/models/salesModel'); 
const salesService = require('../../../src/services/salesServices');
const productModels = require('../../../src/models/productsModels');
const mock = require('../../mocks/sales.mock'); 

describe('Camada Service', function () {
  describe('Caso de sucesso de retorno de todos as vendas', function () {
    afterEach(()  => sinon.restore());

    it('testa a função getAllSales', async function () {
      sinon.stub(salesModel, 'getAllSales').resolves(mock.resultGetSales);

      const response = await salesService.getAllSales();

      expect(response).to.be.deep.equal(mock.resultGetSales);
    });

    it('testa a função addSales', async function () {
      sinon.stub(salesModel, 'addSales').resolves(mock.resultAddSales);
      sinon.stub(productModels, 'getAllProducts').resolves([{ id: 3 }]);
      
      const rightAnswer = await salesService.addSales([{ productId: 3, quantity: 15 }]);
      const errorAnswer = await salesService.addSales([{ productId: 2, quantity: 3 }]);

      expect(rightAnswer).to.deep.equal({ type: null, message: mock.resultAddSales });
      expect(errorAnswer).to.deep.equal({ type: 404, message: 'Product not found' });
    }); 

    it('testa se retorna um objeto de todas as vendas pelo Id', async function () {
      const payload = 1;
      
      sinon.stub(salesModel, 'getSalesById').resolves([ mock.resultGetSalesById ]);
   
      const response = await salesService.getSalesById(payload);
      
      expect(response).to.be.deep.equal([mock.resultGetSalesById]);
    });
  });
});