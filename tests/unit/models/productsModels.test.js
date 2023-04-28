// pesquisa: course - aula 5.1
const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connections');
const productModel = require('../../../src/models/productsModels');
const { products } = require('../../mocks/products.mock');

describe('Camada Model', function () {
  describe('Lista todas os produtos', function () {
    afterEach(() => sinon.restore());

    it('testa retorno dos produtos', async function () {
      sinon.stub(connection, 'execute').resolves([products]);
      
      const response = await productModel.getAllProducts();

      expect(response).to.be.a('array');
      expect(response).to.be.deep.equal(products);
    });
    
    it('testa retorno dos produtos pelo Id', async function () {
      sinon.stub(connection, 'execute').resolves([products]);
      
      const response = await productModel.getProductsById(1);
      
      expect(response).to.be.equal(products[0]);
    });
    
    it('testa se criou novos os produtos', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      
      const response = await productModel.createProducts(products);
      
      expect(response).to.be.deep.equal(products[0].id);
    });

    it('testa se atualizou os produtos', async function () {
      const productId = 1;
      const productName = 'Anel do poder';

      sinon.stub(connection, 'execute').resolves({ affectedRows: 1 });

      const response = await productModel.updateProducts(productId, productName);

      expect(response).to.be.deep.equal({ id: productId, name: productName });
    });
  });
});