// code to send response..

const responder = (res, status = 200, data = null, message = "learn.io default message",success=true) => {
    try {
        return res.status(status).json({data,message,success});
    } catch (error) {
       console.log(error);  
    }
}


export default responder;