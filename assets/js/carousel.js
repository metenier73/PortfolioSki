
"use strict"
//Get #pageContent element
var myCarousel = document.getElementById('myCarousel');
//get #pictInfo div
var pictInfo = document.getElementById('pictInfo');
//Define the images array
var rawImages = '[{"filename":"image-2.jpg","name":"Mont-Pourri","author":"Myriam Metenier","exposure":"Nord"},{"filename":"image-3.jpg","name":"Aiguille Rouge","author":"Myriam Metenier","exposure":"Nord"},{"filename":"image-5.jpg","name":"Aiguille Rousse","author":"Myriam Metenier","exposure":"Sud-Est"},{"filename":"bellecoteRoseland.jpg","name":"Vallée Roseland","author":"Myriam Metenier","exposure":"Est"},{"filename":"DSC_0017.jpg","name":"Aiguille Rouge","author":"Myriam Metenier","exposure":"Nord"},{"filename":"ars2009.JPG","name":"Les Arcs 2000","author":"Myriam Metenier","exposure":"Nord-Est"},{"filename":"arc2009.JPG","name":"Arcs 2000","author":"Myriam Metenier","exposure":"Est"},{"filename":"belleco2010-04-17.jpg","author":"Myriam Metenier","name":"Aiguille Rousse","exposure":"Sud"},{"filename":"belle2010-04-17.JPG","name":"Bellecôte","author":"Myriam Metenier","exposure":"Nord"},{"filename":"belleote2010-04-17.jpg","name":"Bellecôte","author":"Myriam Metenier","exposure":"Nord"},{"filename":"image-1.jpg","name":"Aiguille Rousse","author":"Myriam Metenier","exposure":"Sud"},{"filename":"Roseland2010-04-17.JPG","name":"Vallée de Roseland","author":"Myriam Metenier","exposure":"Est"},{"filename":"bellecote2010-04-17.JPG","name":"Bellecôte","author":"Myriam Metenier","exposure":"Nord"},{"filename":"bellec2010-04-17.JPG","name":"Peisey-Vallandry","author":"Myriam Metenier","exposure":"Nord"},{"filename":"image-4.jpg","name":"Arcs 2000 - Villaroger","author":"Myriam Metenier","exposure":"Nord"}]';

var images = JSON.parse(rawImages);

//Choose a random image
var randomImage = images[Math.floor(Math.random() * images.length)];

//apply the image as the background of work
myCarousel.style.backgroundImage = `url(./images/${randomImage.filename})`;
$("div")[i] = `url(./images/${randomImage.filename})`;

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
$(function () {
    var i = 0;
    affiche();

    function affiche() {
        i++;
        if (i == 1) precedent = '#img5';
        else precedent = '#img' + (i - 1);

        var actuel = '#img' + i;
        $(precedent).fadeOut(2000);
        $(actuel).fadeIn(2000);
        if (i == 5) i = 0;
    }

    setInterval(affiche, 2000);
});
document.querySelector("#myCarousel").innerHTML = `url(./images/${randomImage.filename})`;

//On crée un nouveau type d'animal, animal1
let randomImage = Object.create(randomImage);
randomImage.filename(); // affichera Invertébrés

//Global var
const $prevBtn = $('.prev')
const $nextBtn = $('.next')
const $carouselItems = $('.carousel-item')
const $carouselPauseBtn = $('.carousel-pause-btn')

let currentItemPosition = 0
let carouselInterval

Funcs
const goToNextSlide = () => {
    if (currentItemPosition + 1 >= $carouselItems.length) {

        const lastItem = `.item-${currentItemPosition}`

        currentItemPosition = 0
        const currentItem = `.item-${currentItemPosition}`

        setNodeAttributes(lastItem, currentItem)
    } else {
        currentItemPosition += 1
        const lastItem = `.item-${currentItemPosition - 1}`
        const currentItem = `.item-${currentItemPosition}`

        setNodeAttributes(lastItem, currentItem)
    }
}

const goToPreviousSlide = () => {
    if (currentItemPosition - 1 >= 0) {
        currentItemPosition -= 1
        const currentItem = `.item-${currentItemPosition}`
        const lastItem = `.item-${currentItemPosition + 1}`

        setNodeAttributes(lastItem, currentItem)
    } else {
        const lastItem = `.item-${currentItemPosition}`

        currentItemPosition = 2
        const currentItem = `.item-${currentItemPosition}`

        setNodeAttributes(lastItem, currentItem)
    }
}


const setNodeAttributes = (lastItem, currentItem) => {
    $(lastItem).css('display', 'none')
    $(currentItem).css('display', 'block')
    $(lastItem).attr('aria-hidden', 'true')
    $(currentItem).attr('aria-hidden', 'false')
}


// Events
$prevBtn.click(function () {
    goToPreviousSlide()
})

$nextBtn.click(function () {
    goToNextSlide()
})


$(document).keydown(function (e) {
    const keyCode = e.keyCode ? e.keyCode : e.which

    if (keyCode === 39) {
        goToNextSlide()
    } else if (keyCode === 37) {
        goToPreviousSlide()
    }
})

$carouselPauseBtn.on('click', function () {
    clearInterval(carouselInterval)
})


$(document).ready(function () {
    carouselInterval = setInterval(() => goToNextSlide(), 5000)
})
