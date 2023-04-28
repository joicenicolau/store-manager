// pesquisa: https://github.com/tryber/sd-027-a-live-lectures/blob/lecture/back/5.5/tests/unit/service/questionService.test.js
const { expect } = require('chai');
const sinon = require('sinon'); 
const productModel = require('../../../src/models/productsModels'); 
const productService = require('../../../src/services/productsServices');
const { products } = require('../../mocks/products.mock'); 

describe('Camada Service', function () {
  describe('Caso de sucesso de retorno de todos os produtos', function () {
    afterEach(()  => sinon.restore());

    it('testa se retorna um objeto de todos os produtos', async function () {
      sinon.stub(productModel, 'getAllProducts').resolves(products);

      const response = await productService.getAllProducts();

      expect(response).to.be.a('array');
      expect(response).to.be.deep.equal(products);
    }); 

    it('testa se retorna um objeto de todos os produtos pelo Id', async function () {
      sinon.stub(productModel, 'getProductsById').resolves(products[0]);
  
      const payload = 1
  
      const response = await productService.getProductsById(payload);
      
      expect(response).to.be.deep.equal(products[0]);
    });

    it('testa se cria um novo produto', async function () {
      const newProduct = { name: 'Anel do poder' };
      sinon.stub(productModel, 'createProducts').resolves(5);

      const response = await productService.createProducts(newProduct.name);

      expect(response).to.be.deep.equal({ type: null, message: { id: 5, name: 'Anel do poder' }});
    });

    it('testa se atualiza os produtos', async function () {
      sinon.stub(productModel, 'getProductsById').resolves(products);
  
      const id = 1
      const name = 'anel do poder'
  
      const response = await productService.updateProducts(id, name);
      
      expect(response).to.be.deep.equal({ id, name });
    });
  });
});