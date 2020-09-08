const CustomError = require('../utils/customError');

const errorMiddleware = (app) => {

   app.use((err, req, res, next) => {
    
      if(err instanceof CustomError){
         res.status(err.statusCode).send(err.message);
      }else if(err.name === "CastError" ){
         res.status(400).send({success: false, message: `Invalid id`})
      }else if(err.name === "ValidationError"){
         res.status(400).send({success: false, message: err.message})
      }else if(err.code === 11000){
         res.status(400).send({success:false, message: `Duplicate field value entered`})
      }else{
         res.status(500).send( err.message || 'Server error')
      }
   })
 
   return app;
}

module.exports = errorMiddleware;