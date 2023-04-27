// pesquisa: course - aula 5.1
const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connections');
const productModel = require('../../../src/models/productsModels');

describe('Camada Model', function () {
  describe('Lista todas os produtos', function () {

    beforeEach(async function () {
      const execute = [
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
        {
          "id": 2,
          "name": "Traje de encolhimento"
        },
      ];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    afterEach(async function () {
      connection.execute.restore();
    });

    it('testa retorno dos produtos', async function () {
      const expected = [
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
        {
          "id": 2,
          "name": "Traje de encolhimento"
        },
      ];

      const response = await productModel.getAllProducts();

      expect(response).to.be.a('array');
      expect(response).to.be.deep.equal(expected);
    });
  });

  describe('Lista produtos pelo Id', function () {
    before(async function () {
    const execute = [
      {
        "id": 1,
        "name": "Martelo de Thor"
      },
      {
        "id": 2,
        "name": "Traje de encolhimento"
      },
    ];

      sinon.stub(connection, 'execute').resolves([execute]);
    });

    after(async function () {
      connection.execute.restore();
    });

    it('testa retorno dos produtos pelo Id', async function () {
      const expected = {
        "id": 1,
        "name": "Martelo de Thor"
      };

      const payload = 1

      const response = await productModel.getProductsById(payload);

      expect(response).to.be.deep.equal(expected);
    });
  });
});