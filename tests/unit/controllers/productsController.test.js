//  course - aula 5.3
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const productController = require('../../../src/controllers/productsControllers');
const productService = require('../../../src/services/productsServices');
const { products } = require('../../mocks/products.mock');
const { error } = require('../../mocks/error.mock');

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
      
      sinon.stub(productService, 'getProductsById').resolves(null);

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
      sinon.stub(productService, 'getProductsById').resolves(products[0]);
      
      await productController.getProductsById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products[0]);
    });

    it('deve testar a função createProducts', async function () {
      const req = {
        body: { name: 'Varinha' },
      };
      
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'createProducts').resolves({ type: null, message: { id: 1, name: 'Varinha' } });
      
      await productController.createProducts(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ id: 1, name: 'Varinha' });
    });

    it('deve testar o erro da função createProducts', async function () {
      const req = {
        body: { name: 'teste' },
      };
      
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'createProducts').resolves(error);
      
      await productController.createProducts(req, res);

      expect(res.status).to.have.been.calledWith(error.type);
      expect(res.json).to.have.been.calledWith({ message: error.message });
    });

    it('testa se atualiza os produtos', async function () {
      const req = {
        params: {
          id: 123
        },
        body: {
          name: 'Varinha'
        }
      };

       const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      // Dubla a função getProductsById
      sinon.stub(productService, 'getProductsById').resolves({ id: 123, name: 'Varinha' });

      // Dubla a função updateProducts
      sinon.stub(productService, 'updateProducts').resolves({ id: 123, name: 'Varinha' });

      await productController.updateProducts(req, res);

      // Verifica se o status e o resultado são retornados corretamente
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ id: 123, name: 'Varinha' });
    });

    it('testa se da um erro 404 ao atualizar o produto', async function () {
        const req = {
          params: {
            id: 100
          },
          body: {
            name: 'teste'
          }
      };
      
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon.stub(productService, 'getProductsById').resolves(null) ;

      await productController.updateProducts(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
        
  });
});



