/**
 * 
 * @action : Custom error message handler
 * @params : custom message and status code
 * 
 */

class CustomError extends Error {
   constructor(message, statusCode){
      super(message)
      this.statusCode = statusCode;
   }
}

module.exports = CustomError;
