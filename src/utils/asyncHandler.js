//trick 2 of wapper code of connect mongooDB.
const asyncHandler = (requestHandler)=> {
   return (req,res,next) =>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>{
            next(err)
        })
    }
}

export {asyncHandler}

//  trick 1
// const asyncHandler = (fu) => async (req,res,next)=>{   //some time we use middel waves
//     try {
//         await fu(req,res,next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }