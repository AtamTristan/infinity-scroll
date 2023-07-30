const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash Api
const count = 10;
const apiKey = '37yMDwkah5XjmBrs7ObYNcfzBMmZ_1OHGyysMiu-4Zs';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// helper function to set attributes on dom element
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links & photos, add to dom
function displayPhotos(){
    photosArray.forEach(photo => {
       // Create an <a> to link to unsplash
       const item = document.createElement('a');
        setAttributes(item,{
           href: photo.links.html,
           target: '_blank',
        });
       // Create img for photo
        const img = document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // put hte image inside <a>, then put both inside the image container element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get photos from Unsplash api
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
    }catch (error){

    }
}

// On load
getPhotos();