const resultGetSales = [
  {
    "saleId": 1,
    "date": "2023-04-28 19:36:52",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-04-28 19:36:52",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-04-28 19:36:52",
    "productId": 3,
    "quantity": 15
  },
];

const resultGetSalesById = [
 {
    "date": "2023-04-28T19:36:52.000Z",
    "productId": 3,
    "quantity": 15
  },
  {
    "date": "2023-04-28T19:36:52.000Z",
    "productId": 4,
    "quantity": 18
  }
];

const resultAddSales = {
  "id": 5,
  "itemsSold": [
    {
      "productId": 3,
      "quantity": 15
    }
  ]  
};


module.exports = {
  resultGetSales,
  resultGetSalesById,
  resultAddSales,
}
