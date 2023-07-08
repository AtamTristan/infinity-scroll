// Unsplash Api
const count = 10;
const apiKey = '37yMDwkah5XjmBrs7ObYNcfzBMmZ_1OHGyysMiu-4Zs';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash api
async function getPhotos(){
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        console.log(data);
    }catch (error){

    }
}

// On load
getPhotos();