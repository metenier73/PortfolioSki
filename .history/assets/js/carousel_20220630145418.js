//Get #pageContent element
let myCarousel = document.getElementsById('myCarousel');
//get .bd-placeholder-img class
let pictInfo = document.getElementsByClassName('carousel-item');
//Define the images array
let rawImages = '[{"filename":"arc.jpg","name":"Mont Pourri","author":"Myriam Metenier"},{"filename":"montagne/arc2009(3).jpg","name":"Arc 2000","author":"Myriam Metenier"},{"filename":"montagne/arc2009(4).jpg","name":"Myriam Metenier","author":"Myriam Metenier"},
{ "filename": "montagne/arc2009(3).jpg", "name": "Les cheveux du ciel", "author": "Myriam Metenier" },
{ "filename": "montagne/arc2009(3).jpg", "name": "Prendre le large", "author": "Myriam Metenier" },
{ "filename": "montagne/arc2009(3).jpg", "name": "Maman les p\'tits bateaux", "author": "Myriam Metenier" },
{ "filename": "montagne/arc2009(3).jpg", "name": "L\'ombre des palmiers", "author": "Myriam Metenier" },
{ "filename": "montagne/arc2009(3).jpg", "author": "Myriam Metenier", "name": "Pont d\'or" },
{ "filename": "montagne/arc2009(3).jpg", "name": "L\'ombre assise", "author": "Myriam Metenier" },
{ "filename": "montagne/arc2009(3).jpg", "name": "Au bout de l\'ombre", "author": "Myriam Metenier" },
{ "filename": "image-11.jpg", "name": "CA Capitol", "author": "Myriam Metenier" },
{ "filename": "image-12.jpg", "name": "Soleil tropical", "author": "Myriam Metenier" },
{ "filename": "image-13.jpg", "name": "Reflet urbain", "author": "Myriam Metenier" }, { "filename": "colDeLaTourNoirDroiteColArgentiere.jpg", "name": "Argentiere", "author": "Myriam Metenier" }]';
let images = JSON.parse(rawImages);
console.log(rawImages);

//Choose a random image
let randomImage = images[Math.floor(Math.random() * images.length)];

//apply the image as the background of pageContent
myCarousel.style.backgroundImage = `url(../images/${randomImage.filename})`;

