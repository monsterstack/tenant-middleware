'use strict';
const TENANT_NAME_KEY = 'X-Tenant-Id';
const multiTenantDb = require('multi-tenancy-db');
const GetCurrentContext = require('app-context').GetCurrent;

class TenantDBCreationMiddleware {
  constructor(app) {
    this.app = app;
  }

  tenantDb(modelFactory) {
    return (req, res, next) => {
      // Build DB Connection and hang on request.
      let tenantName = req.header(TENANT_NAME_KEY);
      if (tenantName) {
        // This should be async.
        let db = multiTenantDb.findOrCreateNewConnection(tenantName, modelFactory);
        if (db) {
          let context = GetCurrentContext();
          if(context)
            context.set('db', db);

          // Deprecate this line..
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

// Public
module.exports.TenantDBCreationMiddleware = TenantDBCreationMiddleware;
