window.onload = function () { //causes all the code in this section to run when the site is loaded

    document.getElementById("copyright-date").innerText = new Date().getFullYear();
    // update copyright year to current year

    if (this.localStorage.getItem("theme") == "dark") {
        document.getElementById("theme-toggler").checked = true;
        setThemeDark();
    } //this section gets "theme" from local storage, if it is dark, then sets the site theme to dark
    //theme is put into local storage under toggleTheme

    let navButton = document.getElementById("navbar-toggler");
    navButton.addEventListener("click", toggleNav);
    //allow the navButton (hamburger) to toggle the navigation when clicked
    navbar = document.getElementById("navbar");
    navbar.addEventListener("mouseleave", collapseNav);
    //if mouse leaves navbar, collapse navigation

    function toggleNav() { //this is toggle navigation, when the hamburger is clicked it animates (with css) the height of the collapsable from 0 to the required height
        let navText = document.getElementById("navbarItems");
        let navButton = document.getElementById("navbar-toggler");
        if (navText.style.maxHeight) {
            collapseNav(); //the collapse version is elsewhere so it can be called from outside this function
        } else {
            navText.style.maxHeight = navText.scrollHeight + "px"; //this is get the height the collapsable needs to be and make it that height
            navButton.classList.add("active"); //this is set the navButton to active, css will then animate it to an X
        }
    }

    let themeSwitch = document.getElementById("theme-toggler");
    themeSwitch.addEventListener("click", toggleTheme); //this is the theme toggling switch in the navbar

    function toggleTheme() {
        let root = document.documentElement; //this gets the css variables section
        let moon = document.getElementById("moon"); //this gets the "dark" icon, next to the switch
        let sun = document.getElementById("sun"); //this gets the "light" icon, next to the switch
        if (themeSwitch.checked == true) { //if the theme switch is checked, set theme to dark
            setThemeDark(); //set theme dark is seperate from toggle theme so it can be called on load if "dark" is in local storage
        } else if (themeSwitch.checked == false) { //if it is unchecked, set theme to light(default)
            root.style.setProperty("--fullBackground", "#ffffff");
            root.style.setProperty("--backingOne", "#c5cae9");
            root.style.setProperty("--backingTwo", "#303f9f");
            root.style.setProperty("--textOne", "#ffffff");
            root.style.setProperty("--textTwo", "#212121"); //this individually sets all variables to their default values
            sun.style.opacity = "1"; //turn on the "light" icon
            moon.style.opacity = "0"; //make sure the "dark" icon is off
            window.setTimeout(function () { sun.style.opacity = "0" }, 800); //after the animation for the "light" icon is finished, turn it off again
            localStorage.setItem("theme", "light"); //put theme = light in the local storage, so the page loads this way next time, using the first if statement
        }
    }

    function setThemeDark() {
        let root = document.documentElement;
        let moon = document.getElementById("moon");
        let sun = document.getElementById("sun");
        root.style.setProperty("--fullBackground", "#212121"); //the background (used in body) is set to dark
        root.style.setProperty("--backingOne", "#303f9f");
        root.style.setProperty("--backingTwo", "#c5cae9"); //in this section, backingOnes default is given to backingTwo and vice versa
        root.style.setProperty("--textOne", "#212121");//same with the text values
        root.style.setProperty("--textTwo", "#ffffff");
        moon.style.opacity = "1";
        sun.style.opacity = "0";
        window.setTimeout(function () { moon.style.opacity = "0" }, 800);
        localStorage.setItem("theme", "dark"); //put theme = dark into the local storage, so the page loads this way next time, using the first if statement
    }

    document.getElementById("top-button").addEventListener("click", function scrollTop() { document.documentElement.scrollTop = 0; }); //add scrollTop to the "back to top" button, scrolls to the top of the document

    this.scrollHighlight();//runs the scrollhighlight function, to highlight the section scrolled to
    this.buildGallery();//runs the build gallery function
    this.fillGallery();//runs the fill gallery function, these together fill the portfolio gallery with images
}

window.onresize = function () {
    this.scrollHighlight(); //when the window is resized, if the sections have moved, highlight the approriate one
    this.buildGallery(); //rebuild the gallery (it will have different outcomes at different sizes)
    this.fillGallery();
}

window.onscroll = function () {
    this.scrollHighlight(); //when the window is scrolled, highlight the section scrolled to
}

function scrollHighlight() {
    let isInViewport = function (element) {
        let bounding = element.getBoundingClientRect();
        if (bounding.height >= (window.innerHeight - 200)) {
            return (bounding.top <= 120 && bounding.left >= 0 && bounding.bottom >= (window.innerHeight - 80) && bounding.right <= (window.innerWidth));
            //this statement finds if the section fills most of the viewport (120px from the top and 80 from the bottom) then return true
        } else {
            return (bounding.top >= 0 && bounding.left >= 0 && bounding.bottom <= (window.innerHeight) && bounding.right <= (window.innerWidth));
            //this statement finds if the section is entirely within the viewport, return true
        }
    }; //this section is based on the code outlined here https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
    let homeLink = document.getElementById("homeLink"); //these refer to the navigation buttons in the navbar
    let portfolioLink = document.getElementById("portfolioLink");
    let cvLink = document.getElementById("cvLink");
    let contactLink = document.getElementById("contactLink");

    if (isInViewport(document.getElementById("home"))) { //if the home section is in view, set the home link to 100% opacity and all others to 60%
        homeLink.style.opacity = "1";                   //then after 150ms use the collapse portfolio function
        homeLink.style.transform = "scale(1.2)";
        portfolioLink.style.opacity = "0.6";
        portfolioLink.style.transform = "scale(1)";
        cvLink.style.opacity = "0.6";
        cvLink.style.transform = "scale(1)";
        contactLink.style.opacity = "0.6";
        contactLink.style.transform = "scale(1)";
        window.setTimeout(function () { collapsePortfolio() }, 150);
    } else if (isInViewport(document.getElementById("portfolio"))) {
        homeLink.style.opacity = "0.6";
        homeLink.style.transform = "scale(1)";
        portfolioLink.style.opacity = "1";
        portfolioLink.style.transform = "scale(1.2)";
        cvLink.style.opacity = "0.6";
        cvLink.style.transform = "scale(1)";
        contactLink.style.opacity = "0.6"; //this does not have a collapse portfolio section because the user is looking at the portfolio
        contactLink.style.transform = "scale(1)";
    } else if (isInViewport(document.getElementById("cv"))) {
        homeLink.style.opacity = "0.6";
        homeLink.style.transform = "scale(1)";
        portfolioLink.style.opacity = "0.6";
        portfolioLink.style.transform = "scale(1)";
        cvLink.style.opacity = "1";
        cvLink.style.transform = "scale(1.2)";
        contactLink.style.opacity = "0.6";
        contactLink.style.transform = "scale(1)";
        window.setTimeout(function () { collapsePortfolio() }, 150);
    } else if (isInViewport(document.getElementById("contact"))) {
        homeLink.style.opacity = "0.6";
        homeLink.style.transform = "scale(1)";
        portfolioLink.style.opacity = "0.6";
        portfolioLink.style.transform = "scale(1)";
        cvLink.style.opacity = "0.6";
        cvLink.style.transform = "scale(1)";
        contactLink.style.opacity = "1";
        contactLink.style.transform = "scale(1.2)";
        window.setTimeout(function () { collapsePortfolio() }, 150);
    }
}

function collapseNav() { //this function is active if the user clicks the hamburger when it is an X, or if they click a navigation button, or if their mouse leaves the navbar
    let navText = document.getElementById("navbarItems");
    let navButton = document.getElementById("navbar-toggler");
    if (window.innerWidth < 992) {
        navText.style.maxHeight = null; //set the height of the navbar collapsable to 0, so it animates to nothing
    }
    navButton.classList.remove("active"); //set the navbar toggle button to a hamburger, not X
}

function homeScroll() {
    let scrollTo = document.getElementById("home");
    collapseNav();
    let scrollCoords = scrollTo.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: scrollCoords });
}// this function calls collapseNav, to close it, and then scrolls the user to the top of the specified section, 80px down the viewport (so that it is not behind navbar, it is under)

function portfolioScroll() {
    let scrollTo = document.getElementById("portfolio");
    collapseNav();
    let scrollCoords = scrollTo.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: scrollCoords });
}

function cvScroll() {
    let scrollTo = document.getElementById("cv");
    collapseNav();
    let scrollCoords = scrollTo.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: scrollCoords });
}

function contactScroll() {
    let scrollTo = document.getElementById("contact");
    collapseNav();
    let scrollCoords = scrollTo.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: scrollCoords });
}


let image = [ //this is an array of objects to fill the portfolio, each one refers to an image and all of the information about it
    {
        src: "images/Site.PNG",
        title: "This Site",
        desc: "This site is a demonstration of all the web development skills I have thus far, it's useful for showcasing my skills, and getting to know me.",
        date: "April 2020",
        link: "https://www.github.com/20402182/Assignment2"
    },
    {
        src: "images/QuoteGen.PNG",
        title: "Quote Generator",
        desc: "This quote generator has a selection of random quotes and a great image background. You can also tweet these quotes through the site.",
        date: "March 2020",
        link: "https://www.github.com/20402182/RandomQuote"
    },
    {
        src: "images/ToDoList.PNG",
        title: "To Do List",
        desc: "This to do list allows the addition of many items and crossing off the items, the items persist even when the tab is closed.",
        date: "March 2020",
        link: "https://www.github.com/20402182/toDoList"
    },
    {
        src: "images/WeatherApp.PNG",
        title: "Weather App",
        desc: "This weather app shows the temperature and weather in the users current location.",
        date: "April 2020",
        link: "https://www.github.com/20402182/weather"
    },
    {
        src: "images/Babies.png",
        title: "Baby Game",
        desc: "This app involves up to 4 babies playing a game similar to tennis. It is made entirely from scratch, including the GUI, using the Java language.",
        date: "April 2020",
        link: ""
    },
    // {
    //     src: "https://placeimg.com/640/480/tech",
    //     title: "Image Six",
    //     desc: "The description of the sixth image",
    //     date: "06/01/2020",
    //     link: ""
    // },
    // {
    //     src: "https://placeimg.com/640/480/arch",
    //     title: "Image Seven",
    //     desc: "The description of the Seventh image",
    //     date: "06/01/2020",
    //     link: ""
    // },
    // {
    //     src: "https://placeimg.com/640/480/tech",
    //     title: "Image Eight",
    //     desc: "The description of the Eighth image",
    //     date: "08/01/2020",
    //     link: ""
    // },
]; //these last few can be uncommented to see how the gallery behaves with extra images

imgCount = () => {
    return image.length;
} //this finds the number of image objects in the images array

maxImgPLine = () => { //this finds the number of images that can be fit on a single gallery row
    let size = window.innerWidth;
    if (size < 600) {
        return 1;      //if the viewport width is less than 600px, one image per row
    } else {
        let num = Math.round((size * 0.8) / 180); //this is 80% of the viewport width, divided by 100px, to say how many 100px images would fit in 80% of the viewport width
        if (num < 1) {
            return 1; //if less than one image would fit per line, make it 1
        } else {
            if (num < 6) {
                return num;
            } else {
                return 6;
            }//this statement ensures there cannot be more than 6 images per line
        }
    }
}

imgPerLine = () => { //this finds out how many images should be put on a line, so that if 3 images fit and there is 4 total, it is split evenly to 2 and 2, not 3 and 1
    if (maxImgPLine() === 1) {
        return 1; //if only one can fit, put one per line
    } else {
        let value;
        let max = Math.floor(maxImgPLine());
        for (z = 0; z < Math.round(imgCount() / 3); z++) { //the iterator is z so it doesnt interfere when called from other for loops
            if ((imgCount() % (max - z)) === 0) {
                value = (max - z);
            } //this loop takes off 1 image from maximum per iteration until the total number of images is evenly divisible by the number found
        }//it takes a maximum of 1 third of the maximum line size off
        if (!value) {
            value = max;
        } //if no better image per line number is found, use the maximum
        if (value > max / 2) {
            value = max / 2;
        }//if the maximum has been used, use half the maximum
        return Math.floor(value); //return the value found, rounded down
    }
}

lineTotal = () => {
    return Math.ceil(imgCount() / imgPerLine());
} //this is the total number of images, divided by images, per line, rounded up, giving the total number of gallery lines required

function buildGallery() { //this places lines into the gallery 
    let current;
    let next;
    let gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; //this empties the gallery to start a new build
    for (i = 0; i <= (lineTotal() - 1); i++) {//for every line required, add the below HTML to the gallery (line total starts at 1 and i started counting from 0 so i need one less than the line total)
        current = gallery.innerHTML; //get what is in the gallery
        next = current + "<div class =\"row\" id=\"grid-" + i + "\"></div><div class = \"descBox\"><div class=\"descText\" id=\"descBox-" + i + "\"></div>"; //add this html to the end of it
        gallery.innerHTML = next; //fill the gallery with the old stuff and the new one
    } //this will create several rows for images and each one will have a descBox (description box) beneath it, containing a descText desction
}//each row will have the same identfying number (i) as the corresponding descBox

function fillGallery() { //this fills each line with the number of images that are to be in it
    let current;
    let num = 0;
    for (i = 0; i <= (lineTotal() - 1); i++) { //i need one less than line total because i started counting at 0 not 1
        let grid = document.getElementById("grid-" + i); //a line of images to be filled
        for (j = 0; j <= (imgPerLine() - 1); j++) {
            current = grid.innerHTML; //get the contents of the line, add the below html to it and put both those things back in
            grid.innerHTML = current + "<div class=\"col\"><button id=\"img" + (num) + "\" onclick=\"addDescription(" + num + ", " + i + ")\"><img src=\"" + image[num].src + "\"  class=\"img-fluid\" alt=\"Responsive image\"><div class=\"middle\">" + image[num].title + "</div></button><div class=\"triangle-up\" id=\"tri" + num + "\"></div></div>";
            num++;//add one to the number of images done so that they are all done in the right order
        }//this will create buttons with images inside that have an onclick function of addDesctiription(num, line) where num is their image number, from the image array of objects, and line is which row of the gallery they are in
    }//each image will also be responsive (due to bootstrap), have a title section (middle) shown on hover and have a pointer underneath them, which is not initially visible
}

function addDescription(num, line) {//this opens the description box and adds the requried portfolio item description
    let box = document.getElementById("descBox-" + line); //get the required box, based on which gallery line the image is in
    let newContent = "";
    if (image[num].link) { //if the image has a link, include it in the contents of the desc box
        newContent = "<h2>" + image[num].title + "</h2><p>" + image[num].desc + "</p><p>" + image[num].date + "</p><div class=\"icon\"><a href=\"" + image[num].link + "\"><i class=\"fab fa-github\" aria-hidden=\"true\"></i></a></div>";
    } else { //if it has no link, dont include it, image[num] refers to which object in the array and .desc or .title refers to the attributes of the object
        newContent = "<h2>" + image[num].title + "</h2><p>" + image[num].desc + "</p><p>" + image[num].date + "</p>";
    }
    //there are 3 possibilities for how the content should be entered into the gallery
    if (!box.style.maxHeight) {//if the current box is closed
        box.innerHTML = newContent; //fill it with the required content (created above)
        for (i = 0; i <= (lineTotal() - 1); i++) { //for every line, close the description box
            document.getElementById("descBox-" + i).style.maxHeight = null;
        }
        for (i = 0; i <= (imgCount() - 1); i++) {
            document.getElementById("tri" + i).style.opacity = "0";
        } //hide all pointers, that point to other images
        document.getElementById("tri" + num).style.opacity = "1";//show the pointer corresponding to the clicked image
        box.style.maxHeight = box.scrollHeight + "px";//show the description box under the clicked image
    } else if (box.style.maxHeight === box.scrollHeight + "px" && box.innerHTML === newContent) { //if the clicked box was open and already had the content in it
        box.style.maxHeight = null;//close the box
        for (i = 0; i <= (imgCount() - 1); i++) { //hide all pointers again
            document.getElementById("tri" + i).style.opacity = "0";
        }
    } else { //otherwise (the box is open but has the wrong content)
        box.style.maxHeight = null; //close the box
        for (i = 0; i <= (imgCount() - 1); i++) {//hide all image pointers
            document.getElementById("tri" + i).style.opacity = "0";
        }
        //wait for the box to close, put in the new content, then open the box and show the corresponding pointer
        window.setTimeout(function () { box.innerHTML = newContent; box.style.maxHeight = box.scrollHeight + "px"; document.getElementById("tri" + num).style.opacity = "1"; }, 260);
    }
}

function collapsePortfolio() { //this function closes all boxes in the portfolio and is used when the portfolio is scrolled away
    for (i = 0; i <= (lineTotal() - 1); i++) { //for every line, close the corresponding box
        document.getElementById("descBox-" + i).style.maxHeight = null;
    }
    for (i = 0; i <= (imgCount() - 1); i++) { //for every image, hide its pointer
        document.getElementById("tri" + i).style.opacity = "0";
    }
}

function copyText() { //this function puts my email on the clipboard if the user clicks on it
    navigator.clipboard.writeText("wakelinjess@gmail.com").then(function () {
        //this happens if the write was successful
        let tip = document.getElementById("tiptext");
        let tipbox = document.getElementById("tip")
        tipbox.style.transform = "scale(1.1) translateX(.4rem)";
        tip.innerHTML = "Copied!"
        window.setTimeout(function () { tipbox.style.transform = "scale(1) translateX(0)" }, 800);

        document.getElementById("mail").addEventListener("mouseleave", function () { window.setTimeout(function () { tip.innerHTML = "Copy E-mail" }, 200) });

    }, function () {
        //this happens if the write failed
        alert("Sorry, cannot copy.");
    });
} //this function was based on code found here https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
