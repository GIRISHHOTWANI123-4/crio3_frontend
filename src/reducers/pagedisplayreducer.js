const pagedisplayreducer=(state=false,action)=>{
           switch (action.type) {
               case "pagedisplay":{
                   return action.payload;
               }
               default:
                   return state;
           }
}

export default pagedisplayreducer;
