import { app } from "./app.js";

export function server(port){
    app.listen(port,()=>{
        console.log(`Server is running on : ${port}`)
    })
}