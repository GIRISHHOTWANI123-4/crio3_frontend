const historyflagreducer=(state=true,action)=>{
     switch (action.type) {
         case "historyflag":{
             return action.payload
         }
         default:
             return state;
     }
}

export default historyflagreducer;
