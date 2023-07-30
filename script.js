const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash Api
let count = 30;
const apiKey = '37yMDwkah5XjmBrs7ObYNcfzBMmZ_1OHGyysMiu-4Zs';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images are loaded
function imgLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// helper function to set attributes on dom element
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links & photos, add to dom
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;

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
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imgLoaded);
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
        displayPhotos();
    }catch (error){

    }
}

// Check to see if near bottom of page, load more photos
window.addEventListener('scroll',() => {
   if (window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready){
       ready = false;
       getPhotos();
   }
});

// On load
(async function getPhotosOnLoad(){
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${5}`);
        photosArray = await response.json();
        displayPhotos();
    }catch (error){

    }
})();