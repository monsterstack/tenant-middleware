'use strict';
const TENANT_NAME_KEY = "TenantName";

class TenantDBCreationMiddleware {
  constructor() {

  }

  tenantDb(modleFactory) {
    return (req, res, next) => {
      // Build DB Connection and hang on request.
      let tenantName = req.headers[TENANT_NAME_KEY];
      next();
    }
  }
}

module.exports.TenantDBCreationMiddleware = TenantDBCreationMiddleware;
