'use strict'

function onSubmit(e){
    e.preventDefault();

    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    if(prompt === ''){
        alert('add prompt');
        return;
    }
    
    
    generateImageReq(prompt, size);
}

async function generateImageReq(prompt, size){
    try {
        showSpinner();
        const response = await fetch('/openai/generateImage', {
            method: 'POST',
            header:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                prompt,size,
            }),
        })

        if(!response.ok){
            removeSpinner();
            throw new error('that image could not be generated');
        }

        const data = await response.json();
        console.log(data);
        removeSpinner();
    } catch (error) {
        document.querySelector('.msg').textContent = error;
    }
}

function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}

function removeSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);