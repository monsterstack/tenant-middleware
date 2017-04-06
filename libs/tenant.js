'use strict';
const TENANT_NAME_KEY = 'X-Tenant-Id';
const multiTenantDb = require('multi-tenancy-db');

class TenantDBCreationMiddleware {
  constructor(app) {
    this.app = app;
  }

  tenantDb(modelFactory) {
    return (req, res, next) => {
      // Build DB Connection and hang on request.
      let tenantName = req.headers(TENANT_NAME_KEY);
      if (tenantName) {
        // This should be async.
        let db = multiTenantDb.findOrCreateNewConnection(tenantName, modelFactory);
        if (db) {
          req.db = db;
          next();
        } else {
          res.status(500).send({ errorMessage: "Db missing"});
        }
      } else {
          res.status(400).send({ errorMessage: "Tenant Id missing"});
      }
      
    }
  }
}

module.exports.TenantDBCreationMiddleware = TenantDBCreationMiddleware;
