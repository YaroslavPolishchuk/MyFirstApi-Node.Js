'use strict';

const controller = require('./employesContoller');

exports.routeConfig = function (app) {
  app.post('/api/employees', controller.getAll);
  app.post('/api/employee/:id', controller.update);
  app.post('/api/employees/add', controller.add);
  app.post('/api/employees/delete/:id', controller.delete);
};
