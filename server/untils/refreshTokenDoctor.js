
export const refreshTokenDoctor = async(req,res,next)=>{
    try {
        const incomingRefreshToken = req.cookies?.doctorRefreshToken
        console.log("refresh  : ",incomingRefreshToken)
    } catch (error) {
        next(new AppError(error.message || "Invalid refresh token", 401));

    }
}