'use strict';
const TENANT_NAME_KEY = "TenantName";
const multiTenantDb = require('multi-tenancy-db');

class TenantDBCreationMiddleware {
  constructor() {

  }

  tenantDb(modelFactory) {
    return (req, res, next) => {
      // Build DB Connection and hang on request.
      let tenantName = req.headers[TENANT_NAME_KEY];

      // This should be async.
      let db = multiTenantDb.findOrCreateNewConnection(tenantName, modelFactory);
      if(db) {
        req.db = db;
      }

      next();
    }
  }
}

module.exports.TenantDBCreationMiddleware = TenantDBCreationMiddleware;
