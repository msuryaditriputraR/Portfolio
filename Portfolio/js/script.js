// preloader

window.addEventListener("load", function () {
    document.querySelector(".preloader").classList.add("hidden");
    setTimeout(function () {
        document.querySelector(".preloader").style.display = "none";
    }, 1000);
})


// Portfolio Item Filter

const filterContainer = document.querySelector(".portfolio-filter"),
    filterBtns = filterContainer.children,
    totalFilterBtn = filterBtns.length,
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    totalPortfolioItems = portfolioItems.length;

for (let i = 0; i < totalFilterBtn; i++) {
    filterBtns[i].addEventListener("click", function () {
        filterContainer.querySelector(".active").classList.remove("active");
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");
        for (let k = 0; k < totalPortfolioItems; k++) {
            if (filterValue === "all") {
                portfolioItems[k].classList.remove("hide");
                portfolioItems[k].classList.add("show");
            } else if (filterValue === portfolioItems[k].getAttribute("data-category")) {
                portfolioItems[k].classList.remove("hide");
                portfolioItems[k].classList.add("show");
            } else {
                portfolioItems[k].classList.remove("show");
                portfolioItems[k].classList.add("hide");
            }
        }
    })
}

// portfolio lightBox

const lightbox = document.querySelector(".lightbox"),
    lightboxImg = lightbox.querySelector(".lightbox-img"),
    lightboxClose = lightbox.querySelector(".lightbox-close"),
    lightboxText = lightbox.querySelector(".caption-text"),
    lightboxCounter = lightbox.querySelector(".caption-counter");
let itemIndex = 0;

for (let i = 0; i < totalPortfolioItems; i++) {
    portfolioItems[i].querySelector(".portfolio-item-inner").addEventListener("click", function () {
        itemIndex = i;
        changeItem();
        showLightbox();
    })
}

function showLightbox() {
    lightbox.classList.toggle("show");
}

function changeItem() {
    imgSrc = portfolioItems[itemIndex].querySelector(".portfolio-img img").getAttribute("src");
    lightboxImg.src = imgSrc;
    lightboxText.innerHTML = portfolioItems[itemIndex].querySelector("h4").innerHTML;
    lightboxText.style.textTransform = "capitalize";
    lightboxCounter.innerHTML = (itemIndex + 1) + " of " + totalPortfolioItems;
}

function nextItem() {
    if (itemIndex === totalPortfolioItems - 1) {
        itemIndex = 0;
    } else {
        itemIndex++;
    }
    changeItem();
}

function prevItem() {
    if (itemIndex === 0) {
        itemIndex = totalPortfolioItems - 1;
    } else {
        itemIndex--;
    }
    changeItem();
}

// close Lightbox
lightbox.addEventListener("click", function (e) {
    if (e.target === lightboxClose || e.target === lightbox) {
        showLightbox();
    }
})

// Navbar
const nav = document.querySelector(".nav"),
    navList = nav.children,
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () {
        // remove back section
        removeBackSection();

        for (let j = 0; j < totalNavList; j++) {
            // add back-section
            if (navList[j].querySelector("a").classList.contains("active")) {
                addBackSection(j);
            }
            navList[j].querySelector("a").classList.remove("active");
        }

        this.classList.add("active");
        showSection(this);

        if (window.innerWidth < 1200) {
            toggleBtn();
        }
    })
}

function showSection(e) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    const target = e.getAttribute("href").split('#')[1];
    document.querySelector("#" + target).classList.add("active");
}

function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("back-section");
    }
}

function addBackSection(num) {
    allSection[num].classList.add("back-section");
}

// nav toggle

const aside = document.querySelector("aside"),
    navToggle = aside.querySelector(".nav-toggle");

navToggle.addEventListener("click", toggleBtn)

function toggleBtn() {
    aside.classList.toggle("show");
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle("push");
    }
}


// Btn Hire Me

const btnHireMe = document.querySelector(".hire-me");
btnHireMe.addEventListener("click", function () {
    const sectionIndex = btnHireMe.getAttribute("data-section-index");
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex);
});

function updateNav(e) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = e.getAttribute("href").split('#')[1];
        if (target === navList[i].querySelector("a").getAttribute("href").split('#')[1]) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}