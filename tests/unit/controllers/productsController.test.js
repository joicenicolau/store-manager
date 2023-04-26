//  course - aula 5.3
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const productController = require('../../../src/controllers/productsControllers');
const productService = require('../../../src/services/productsServices');
const { products } = require('./mock/products.controller.mock');

describe('Camada Controller', function () {
  describe('Caso de sucesso de retorno de todos os produtos', function () {
    afterEach(() => sinon.restore());

    it('é chamado todos os produtos com status com o código 200', async function () {    
      const req = {};
      
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon.stub(productService, 'getAllProducts').resolves(products);

      await productController.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });

    it('id inválido, deve retornar erro com status 404', async function () {
      // pesquisa: https://github.com/tryber/sd-027-a-live-lectures/blob/lecture/back/5.5/tests/unit/controller/questionController.test.js
      const req = {
        params: { id: 100 },
      };
      
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon.stub(productService, 'getProductsById').resolves();

      await productController.getProductsById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('deve retornar um id válido com status 200', async function () {
    // pesquisa: https://github.com/tryber/sd-027-a-live-lectures/blob/lecture/back/5.5/tests/unit/controller/questionController.test.js
      const req = {
        params: { id: 1 },
      };
      
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      await productController.getProductsById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products[0]);
    });
  });
});



