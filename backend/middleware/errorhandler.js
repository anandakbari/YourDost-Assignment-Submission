const {createCustomError, customapierror}=require('../errors/custom_error')

const errorhandlermiddleware=(err,res,req,next)=>{
    if(err instanceof customapierror){
        return res.status(err.statusCode).json({msg:err.message})
    }
    return res.status(500).json({msg:err})
}

module.exports=errorhandlermiddleware