import {ErrorRequestHandler} from 'express'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err)
  err.status = err.status || 500
  err.message = err.message || 'Something went wrong'

  if (err.code === 11000) {
    err.status = 400
    // TODO: return a good message 
    // const value: string = err.message.match(/(["'])(\\?.)*?\1/)[0]
    //err.message = `${value} Already exists try another one`
    return res.status(err.status).send({message: err.message})
  }
  if (err.errors?.ip) {
    err.status = 400
    err.message = err.errors.ip.message
    return res.status(err.status).send({message: err.message})
  }
  if(err.name==='CastError'){
    err.status=400
    err.message=`Invalid ${err.path}: ${err.value}`
    return res.status(err.status).send({message:err.message})
  }
  if(err.errors?.status){
 err.status=400
    err.message=err.errors.status.message
    return res.status(err.status).send({message:err.message})
  }


  return res.status(err.status).send({message: err.message})
 // return res.status(err.status).send({message: err})
}
