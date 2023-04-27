// course - Dia 5.2 - https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/d8fc0320-73f1-45d4-9f4f-2b6911b176b1/day/6e17b47a-8c39-46f0-aa0f-98d10e689e2d/lesson/b3016ec8-4df4-4ee9-9e71-22a5e77504ea
const Joi = require('joi');

const productName = Joi.string().min(5).required();

const validateName = (name) => {
  const { error } = productName.validate(name);

  if (error.message === '"name" is required') {
    return { type: 400, message: error.message('name') };
  }
};

module.exports = {
  validateName,
};