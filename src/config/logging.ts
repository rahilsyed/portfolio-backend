 const info = (namespace: string, messege:string , object ? :any)=>{
    if(object){
        console.log(`${getTimeStamps()}[INFO]  [${namespace}] [${messege}]`, object )
    }else{console.log(`${getTimeStamps()}[INFO]  [${namespace}] [${messege}]` )}
        
}

 const warn = (namespace: string, messege:string , object ? :any)=>{
    if(object){
        console.log(`${getTimeStamps()}[warn]  [${namespace}] [${messege}]`, object )
    }else{
        console.log(`${getTimeStamps()}[warn]  [${namespace}] [${messege}]` )
    }
}

 const error = (namespace: string, messege:string , object ? :any)=>{
    if(object){
        console.log(`${getTimeStamps()}[error]  [${namespace}] [${messege}]`, object )
    }{
        console.log(`${getTimeStamps()}[error]  [${namespace}] [${messege}]` )
    }
}

export default {
    info,
    error,
    warn
}
const getTimeStamps = ():string=>{
    return new Date().toISOString();
}