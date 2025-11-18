class customapierror extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode=statusCode
    }
}

const createCustomError=(msg,statuscode)=>{
    return new customapierror(msg,statuscode)
}

module.exports={customapierror,createCustomError}