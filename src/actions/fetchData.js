const fetchData=(props)=>{
    return({
        type:"fetchData",
        payload:props.payload
    })

}

export default fetchData;
