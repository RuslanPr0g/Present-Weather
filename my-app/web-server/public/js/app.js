console.log('Client side js is loaded.')

const w_Form = document.querySelector('form');
const search = document.querySelector('input');

w_Form.addEventListener('submit', (event) => {

    event.preventDefault() //stop refresh page

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error){
            console.log(data.error)
        }else{
           console.log(data.location)
           console.log(data.forecast)
        }
    })
})
})