 const info = (namespace: string, messege:string , object ? :any)=>{
    if(object){
        console.log(`${Date.now()}[INFO]  [${namespace}] [${messege}]`, object )
    }else{console.log(`${Date.now()}[INFO]  [${namespace}] [${messege}]` )}
        
}

 const warn = (namespace: string, messege:string , object ? :any)=>{
    if(object){
        console.log(`${Date.now()}[warn]  [${namespace}] [${messege}]`, object )
    }
        console.log(`${Date.now()}[warn]  [${namespace}] [${messege}]` )
}

 const error = (namespace: string, messege:string , object ? :any)=>{
    if(object){
        console.log(`${Date.now()}[error]  [${namespace}] [${messege}]`, object )
    }
        console.log(`${Date.now()}[error]  [${namespace}] [${messege}]` )
}

export default {
    info,
    error,
    warn
}