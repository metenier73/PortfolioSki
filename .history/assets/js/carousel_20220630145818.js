//Get #pageContent element
let bd-placeholder - img = document.getElementsByClassName('bd-placeholder-img');
//get .bd-placeholder-img class
let pictInfo = document.getElementsByClassName('carousel-item');
//Define the images array
let rawImages = '[{"filename":"arc.jpg","name":"Mont Pourri","author":"Myriam Metenier"}]';
let images = JSON.parse(rawImages);
console.log(rawImages);

//Choose a random image
let randomImage = images[Math.floor(Math.random() * images.length)];

//apply the image as the background of pageContent
bd - placeholder - img.style.backgroundImage = `url(../images/${randomImage.filename})`;

