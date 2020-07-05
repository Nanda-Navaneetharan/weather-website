// console.log('Client side js file')



// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })



const weatherForm =document.querySelector('form')
const search= document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

//message1.textContent='From js'

weatherForm.addEventListener('submit',(e)=>{      //e- event
    e.preventDefault();
    const location= search.value;
    // console.log('Testing')
    //console.log(location)

    messageOne.textContent='Loading.........'
    messageTwo.textContent=''
    fetch('http://localhost:3000/weather?address='+ encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error;
            messageTwo.textContent=''
        }
        else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        }
    })
})
})