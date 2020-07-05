const request=require('request');

const forecast= (latitude,longitude,callback)=>{
    const url='http://api.openweathermap.org/data/2.5/onecall?lat='+ encodeURIComponent(latitude) + '&lon='+ encodeURIComponent(longitude) +'&appid=f9b4d05baa7371d6e402b67adbaf0dde'
    request({url,json:true},(error,{ body })=>{
        if(error){
            callback('Unable to connect to location service . ',undefined)
        }
        else if(body.message){
            callback('Unable to find location. Try another search',undefined)
        }
        else{
            callback(undefined,'It is '+ body.current.temp +' today')
            
        }
    })
}

// const forecast= (latitude,longitude,callback)=>{
//     const url='http://api.openweathermap.org/data/2.5/onecall?lat='+ encodeURIComponent(latitude) + '&lon='+ encodeURIComponent(longitude) +'&appid=f9b4d05baa7371d6e402b67adbaf0dde'
//     request({url:url,json:true},(error,response)=>{
//         if(error){
//             callback('Unable to connect to location service . ',undefined)
//         }
//         else if(response.body.message){
//             callback('Unable to find location. Try another search',undefined)
//         }
//         else{
//             callback(undefined,'It is '+ response.body.current.temp +' today')
            
//         }
//     })
// }


module.exports=forecast;