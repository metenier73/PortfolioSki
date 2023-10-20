
"use strict"
//Get #pageContent element
let myCarousel = document.getElementById('myCarousel');
//get #pictInfo div
let pictInfo = document.getElementById('pictInfo');
//Define the images array
let rawImages = '[{"filename":"image-2.jpg","name":"Mont-Pourri","author":"Myriam Metenier","exposure":"Nord"},{"filename":"image-3.jpg","name":"Aiguille Rouge","author":"Myriam Metenier","exposure":"Nord"},{"filename":"image-5.jpg","name":"Aiguille Rousse","author":"Myriam Metenier","exposure":"Sud-Est"},{"filename":"bellecoteRoseland.jpg","name":"Vallée Roseland","author":"Myriam Metenier","exposure":"Est"},{"filename":"DSC_0017.jpg","name":"Aiguille Rouge","author":"Myriam Metenier","exposure":"Nord"},{"filename":"ars2009.JPG","name":"Les Arcs 2000","author":"Myriam Metenier","exposure":"Nord-Est"},{"filename":"arc2009.JPG","name":"Arcs 2000","author":"Myriam Metenier","exposure":"Est"},{"filename":"belleco2010-04-17.jpg","author":"Myriam Metenier","name":"Aiguille Rousse","exposure":"Sud"},{"filename":"belle2010-04-17.JPG","name":"Bellecôte","author":"Myriam Metenier","exposure":"Nord"},{"filename":"belleote2010-04-17.jpg","name":"Bellecôte","author":"Myriam Metenier","exposure":"Nord"},{"filename":"image-1.jpg","name":"Aiguille Rousse","author":"Myriam Metenier","exposure":"Sud"},{"filename":"Roseland2010-04-17.JPG","name":"Vallée de Roseland","author":"Myriam Metenier","exposure":"Est"},{"filename":"bellecote2010-04-17.JPG","name":"Bellecôte","author":"Myriam Metenier","exposure":"Nord"},{"filename":"bellec2010-04-17.JPG","name":"Peisey-Vallandry","author":"Myriam Metenier","exposure":"Nord"},{"filename":"image-4.jpg","name":"Arcs 2000 - Villaroger","author":"Myriam Metenier","exposure":"Nord"}]';

let images = JSON.parse(rawImages);

//Choose a random image
let randomImage = images[Math.floor(Math.random() * images.length)];

//apply the image as the background of work
myCarousel.style.backgroundImage = `url(./images/${randomImage.filename})`;

//page intro
let intro = document.getElementById('intro');

intro.style.backgroundImage = `url(./images/${randomImage.filename})`;


if (pictInfo) {
    //Empty the pictInfo div
    while (pictInfo.firstChild) {
        pictInfo.removeChild(pictInfo.firstChild);
    }

    //Create pictInfo title and add it to the Div
    let pictTitle = document.createElement('h1');
    let pictTitleContent = document.createTextNode(randomImage.name);
    pictTitle.appendChild(pictTitleContent);
    pictInfo.appendChild(pictTitle);

    //Create author and exposure P and add them to pictInfo
    let pictauthor = document.createElement('p');
    let pictData = document.createElement('p');
    let pictAuthorContent = document.createTextNode(randomImage.author);
    let pictDataContent = document.createTextNode(randomImage.exposure);
    pictauthor.appendChild(pictAuthorContent);
    pictData.appendChild(pictDataContent);
    pictInfo.appendChild(pictauthor);
    pictInfo.appendChild(pictData);

}
