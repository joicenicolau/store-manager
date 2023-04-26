// pesquisa: https://github.com/tryber/sd-027-a-live-lectures/blob/lecture/back/5.5/tests/unit/service/questionService.test.js
const { expect } = require('chai');
const sinon = require('sinon'); 
const productModel = require('../../../src/models/productsModels'); 
const productService = require('../../../src/services/productsServices');
const { products } = require('./mock/products.service.mock'); 

describe('Camada Service', function () {
  describe('Caso de sucesso de retorno de todos os produtos', function () {
    afterEach(()  => sinon.restore());

    it('testa se retorna um objeto de todos os produtos', async function () {
      sinon.stub(productModel, 'getAllProducts').resolves(products);

      const response = await productService.getAllProducts();

      expect(response).to.be.a('array');
      expect(response).to.be.deep.equal(products);
    }); 
  });

  describe('Caso de sucesso de retorno de todos os produtos pelo Id', function () {
    afterEach(()  => sinon.restore());

    it('testa se retorna um objeto de todos os produtos pelo Id', async function () {
      sinon.stub(productModel, 'getProductsById').resolves(products[0]);

      const payload = 1

      const response = await productService.getProductsById(payload);
      console.log(response)
      expect(response).to.be.deep.equal(products[0]);
    }); 
  });
});