/* =====================================================
   MÉXICO TRAVEL
   JAVASCRIPT
===================================================== */


/* =====================================================
   VARIABLES
===================================================== */

const body = document.body;

const navbar = document.getElementById("navbar");

const themeBtn = document.getElementById("themeBtn");

const menuBtn = document.getElementById("menuBtn");

const navMenu = document.getElementById("navMenu");

const searchInput =
    document.getElementById("searchInput");

const destinationGrid =
    document.getElementById("destinationsGrid");

const noResults =
    document.getElementById("noResults");

const filters =
    document.querySelectorAll(".filter");

const cards =
    document.querySelectorAll(".destination-card");

const favoriteButtons =
    document.querySelectorAll(".favorite-btn");

const detailsButtons =
    document.querySelectorAll(".details-btn");

const modal =
    document.getElementById("destinationModal");

const modalClose =
    document.getElementById("modalClose");

const modalImage =
    document.getElementById("modalImage");

const modalTitle =
    document.getElementById("modalTitle");

const modalLocation =
    document.getElementById("modalLocation");

const modalDescription =
    document.getElementById("modalDescription");

const toast =
    document.getElementById("toast");

const toastText =
    document.getElementById("toastText");

const backTop =
    document.getElementById("backTop");


/* =====================================================
   NAVBAR SCROLL
===================================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }


    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});


/* =====================================================
   MOBILE MENU
===================================================== */

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("open");

});


document.querySelectorAll(".nav-menu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

    });

});


/* =====================================================
   DARK MODE
===================================================== */

const savedTheme =
    localStorage.getItem("mexicoTheme");

if (savedTheme === "dark") {

    body.classList.add("dark");

    themeBtn.textContent = "☀️";

}


themeBtn.addEventListener("click", () => {

    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {

        themeBtn.textContent = "☀️";

        localStorage.setItem(
            "mexicoTheme",
            "dark"
        );

    } else {

        themeBtn.textContent = "🌙";

        localStorage.setItem(
            "mexicoTheme",
            "light"
        );

    }

});


/* =====================================================
   SEARCH + FILTER
===================================================== */

let activeFilter = "todos";


function filterDestinations() {

    const search =
        searchInput.value
        .toLowerCase()
        .trim();

    let visibleCards = 0;


    cards.forEach(card => {

        const category =
            card.dataset.category;

        const name =
            card.dataset.name.toLowerCase();


        const categoryMatch =
            activeFilter === "todos" ||
            category === activeFilter;


        const searchMatch =
            name.includes(search);


        if (categoryMatch && searchMatch) {

            card.style.display = "";

            visibleCards++;

        } else {

            card.style.display = "none";

        }

    });


    if (visibleCards === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(item => {

            item.classList.remove("active");

        });

        filter.classList.add("active");

        activeFilter =
            filter.dataset.filter;

        filterDestinations();

    });

});


searchInput.addEventListener(
    "input",
    filterDestinations
);


/* =====================================================
   FAVORITES
===================================================== */

let favorites =
    JSON.parse(
        localStorage.getItem("mexicoFavorites")
    ) || [];


function updateFavoriteButtons() {

    favoriteButtons.forEach(button => {

        const place =
            button.dataset.place;

        if (favorites.includes(place)) {

            button.classList.add("favorite");

            button.textContent = "♥";

        } else {

            button.classList.remove("favorite");

            button.textContent = "♡";

        }

    });

}


favoriteButtons.forEach(button => {

    button.addEventListener("click", event => {

        event.stopPropagation();

        const place =
            button.dataset.place;


        if (favorites.includes(place)) {

            favorites =
                favorites.filter(
                    item => item !== place
                );

            showToast(
                `${place} eliminado de favoritos`
            );

        } else {

            favorites.push(place);

            showToast(
                `${place} agregado a favoritos ❤️`
            );

        }


        localStorage.setItem(
            "mexicoFavorites",
            JSON.stringify(favorites)
        );


        updateFavoriteButtons();

    });

});


updateFavoriteButtons();


/* =====================================================
   DESTINATION INFORMATION
===================================================== */

const destinationData = {

    "Cancún": {

        title: "Cancún",

        location: "📍 Quintana Roo",

        description:
            "Cancún es uno de los destinos turísticos más conocidos de México. Sus playas de arena blanca, aguas turquesa, arrecifes y cercanía con sitios arqueológicos lo convierten en un destino ideal para relajarse y disfrutar del Caribe mexicano.",

        image:
            "https://content.r9cdn.net/rimg/dimg/f2/b1/89e06bf7-city-34713-16ed2f2c7f1.jpg?width=1366&height=768&crop=true"

    },


    "Teotihuacán": {

        title: "Teotihuacán",

        location: "📍 Estado de México",

        description:
            "La antigua ciudad de Teotihuacán es uno de los sitios arqueológicos más importantes de México. Destacan la Pirámide del Sol, la Pirámide de la Luna y la Calzada de los Muertos.",

        image:
            "https://dynamic-media.tacdn.com/media/photo-o/34/29/8f/94/caption.jpg?f=webp&w=1000&h=700"

    },


    "Oaxaca": {

        title: "Oaxaca",

        location: "📍 Oaxaca",

        description:
            "Oaxaca destaca por su arquitectura, gastronomía, artesanías y tradiciones. Es un destino ideal para conocer la diversidad cultural mexicana.",

        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWNfFXZshKI66gJ4ToxcQtKOMYjVlODDERuVqfpHzcrcuQy5sJAGb2lTg&s=10"

    },


    "Los Cabos": {

        title: "Los Cabos",

        location: "📍 Baja California Sur",

        description:
            "Los Cabos combina paisajes desérticos con el Mar de Cortés. Sus playas, formaciones rocosas y actividades acuáticas hacen de este lugar una gran opción para los amantes de la naturaleza.",

        image:
            "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=90"

    },


    "CDMX": {

        title: "Ciudad de México",

        location: "📍 Ciudad de México",

        description:
            "La Ciudad de México combina historia, arquitectura, gastronomía, museos, parques y una enorme diversidad cultural.",

        image:
            "https://images.unsplash.com/photo-1518659526054-190340b32735?auto=format&fit=crop&w=1200&q=90"

    },

    

    "Chichén Itzá": {

        title: "Chichén Itzá",

        location: "📍 Yucatán",

        description:
            "Chichén Itzá fue una de las ciudades más importantes de la civilización maya. Su edificio más reconocido es El Castillo, también conocido como Templo de Kukulcán.",

        image:
            "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1200&q=90"

    },

        "Palenque": {

        title: "Palenque",

        location: "📍 Chiapas",

        description:
            "Palenque es una de las ciudades mayas más importantes de México. Sus templos y construcciones se encuentran rodeados por la selva chiapaneca, creando un paisaje espectacular.",

        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxdx7aGBLoW_0eTlNapGZJXd8tnX9uJ1nNKD9SCScEkQBqIw6i3aU0dnXf&s=10"

    },


    "Huatulco": {

        title: "Huatulco",

        location: "📍 Oaxaca",

        description:
            "Huatulco es famoso por sus hermosas bahías, playas y paisajes naturales. Es un destino ideal para relajarse, practicar actividades acuáticas y disfrutar del océano Pacífico.",

        image:
            "https://media-cdn.tripadvisor.com/media/photo-s/04/0b/c1/d3/barcelo-huatulco-beach.jpg"

    },


    "Puerto Vallarta": {

        title: "Puerto Vallarta",

        location: "📍 Jalisco",

        description:
            "Puerto Vallarta combina playas, montañas, gastronomía y cultura. Su famoso malecón ofrece una vista espectacular del océano Pacífico y es uno de sus principales atractivos.",

        image:
            "https://villacdn.villagroupresorts.com/uploads/corporate_destiny/image_full/3/Vallarta-Lifestyle.jpg"

    },


    "Barrancas del Cobre": {

        title: "Barrancas del Cobre",

        location: "📍 Chihuahua",

        description:
            "Las Barrancas del Cobre forman un impresionante sistema de cañones en la Sierra Madre Occidental. El paisaje puede disfrutarse mediante diferentes rutas y experiencias, incluyendo el famoso tren Chepe.",

        image:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=90"

    },


    "San Miguel de Allende": {

        title: "San Miguel de Allende",

        location: "📍 Guanajuato",

        description:
            "San Miguel de Allende destaca por sus calles empedradas, arquitectura colonial, galerías de arte, gastronomía y ambiente cultural. Es uno de los destinos más reconocidos de Guanajuato.",

        image:
            "https://luxrentalmgmt.com/wp-content/uploads/2023/01/San-Miguel-de-Allende-3.jpg"

    },


    "Tulum": {

        title: "Tulum",

        location: "📍 Quintana Roo",

        description:
            "Tulum combina historia y naturaleza. Su antigua ciudad maya se encuentra frente al mar Caribe y es uno de los sitios arqueológicos más conocidos de Quintana Roo.",

        image:
            "https://lugares.inah.gob.mx/sites/default/files/2025-10/Tulum_SantiagoArau_2019.jpg"
    }
};


/* =====================================================
   MODAL
===================================================== */

detailsButtons.forEach(button => {

    button.addEventListener("click", () => {

        const place =
            button.dataset.place;

        const data =
            destinationData[place];

        if (!data) return;


        modalImage.src =
            data.image;

        modalImage.alt =
            data.title;

        modalTitle.textContent =
            data.title;

        modalLocation.textContent =
            data.location;

        modalDescription.textContent =
            data.description;


        modal.classList.add("show");

        document.body.style.overflow =
            "hidden";

    });

});


function closeModal() {

    modal.classList.remove("show");

    document.body.style.overflow = "";

}


modalClose.addEventListener(
    "click",
    closeModal
);


modal.addEventListener("click", event => {

    if (event.target === modal) {

        closeModal();

    }

});


document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        modal.classList.contains("show")
    ) {

        closeModal();

    }

});


/* =====================================================
   TOAST
===================================================== */

let toastTimer;


function showToast(message) {

    toastText.textContent =
        message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

}


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", event => {

    event.preventDefault();


    const name =
        document.getElementById("name").value;


    formMessage.textContent =
        `¡Gracias ${name}! Tu mensaje fue enviado correctamente. 🇲🇽`;


    contactForm.reset();


    showToast(
        "Mensaje enviado correctamente ✓"
    );

});


/* =====================================================
   COUNTERS
===================================================== */

const counters =
    document.querySelectorAll(".counter");


let countersStarted = false;


function startCounters() {

    if (countersStarted) return;

    countersStarted = true;


    counters.forEach(counter => {

        const target =
            Number(counter.dataset.target);

        let current = 0;

        const increment =
            target / 60;


        function updateCounter() {

            current += increment;


            if (current < target) {

                counter.textContent =
                    Math.ceil(current);

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target;

            }

        }


        updateCounter();

    });

}


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    startCounters();

                }

            });

        },
        {
            threshold: 0.5
        }
    );


const heroStats =
    document.querySelector(".hero-stats");


observer.observe(heroStats);


/* =====================================================
   QUIZ
===================================================== */

const questions = [

    {
        question:
            "¿Qué tipo de viaje prefieres?",

        answers: [

            {
                text: "🏖️ Playa y descanso",
                result: "playa"
            },

            {
                text: "🏛️ Historia y cultura",
                result: "historia"
            },

            {
                text: "🌿 Naturaleza y aventura",
                result: "naturaleza"
            },

            {
                text: "🌆 Ciudad y gastronomía",
                result: "ciudad"
            }

        ]
    },


    {
        question:
            "¿Qué actividad te gustaría hacer?",

        answers: [

            {
                text: "🏊 Nadar en el mar",
                result: "playa"
            },

            {
                text: "🏺 Visitar ruinas",
                result: "historia"
            },

            {
                text: "🥾 Explorar paisajes",
                result: "naturaleza"
            },

            {
                text: "🌮 Probar comida local",
                result: "ciudad"
            }

        ]
    },


    {
        question:
            "¿Qué ambiente prefieres?",

        answers: [

            {
                text: "🌴 Tropical",
                result: "playa"
            },

            {
                text: "🏺 Antiguo",
                result: "historia"
            },

            {
                text: "🏔️ Natural",
                result: "naturaleza"
            },

            {
                text: "🏙️ Urbano",
                result: "ciudad"
            }

        ]
    },


    {
        question:
            "¿Qué te gustaría fotografiar?",

        answers: [

            {
                text: "🌊 El mar",
                result: "playa"
            },

            {
                text: "🏛️ Pirámides",
                result: "historia"
            },

            {
                text: "🐋 Animales y paisajes",
                result: "naturaleza"
            },

            {
                text: "🏙️ Edificios y calles",
                result: "ciudad"
            }

        ]
    },


    {
        question:
            "¿Qué recuerdo quieres llevar?",

        answers: [

            {
                text: "🏝️ Un día perfecto en la playa",
                result: "playa"
            },

            {
                text: "📚 Una historia increíble",
                result: "historia"
            },

            {
                text: "🌎 Una aventura",
                result: "naturaleza"
            },

            {
                text: "🌮 Nuevos sabores",
                result: "ciudad"
            }

        ]
    }

];


const quizBox =
    document.getElementById("quizBox");

const quizResult =
    document.getElementById("quizResult");

const questionText =
    document.getElementById("questionText");

const questionNumber =
    document.getElementById("questionNumber");

const answersContainer =
    document.getElementById("answers");

const nextQuestion =
    document.getElementById("nextQuestion");

const progressBar =
    document.getElementById("progressBar");

const resultTitle =
    document.getElementById("resultTitle");

const resultDescription =
    document.getElementById("resultDescription");

const restartQuiz =
    document.getElementById("restartQuiz");


let currentQuestion = 0;

let selectedAnswer = null;

let scores = {

    playa: 0,

    historia: 0,

    naturaleza: 0,

    ciudad: 0

};


function loadQuestion() {

    const question =
        questions[currentQuestion];


    questionText.textContent =
        question.question;


    questionNumber.textContent =
        currentQuestion + 1;


    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;


    answersContainer.innerHTML = "";

    selectedAnswer = null;


    nextQuestion.disabled = true;

    nextQuestion.style.opacity = "0.5";


    question.answers.forEach(answer => {

        const button =
            document.createElement("button");


        button.className =
            "answer";


        button.textContent =
            answer.text;


        button.addEventListener("click", () => {

            document
                .querySelectorAll(".answer")
                .forEach(item => {

                    item.classList.remove(
                        "selected"
                    );

                });


            button.classList.add(
                "selected"
            );


            selectedAnswer =
                answer.result;


            nextQuestion.disabled =
                false;

            nextQuestion.style.opacity =
                "1";

        });


        answersContainer.appendChild(
            button
        );

    });


    if (
        currentQuestion ===
        questions.length - 1
    ) {

        nextQuestion.textContent =
            "Ver mi resultado 🎯";

    } else {

        nextQuestion.textContent =
            "Siguiente →";

    }

}


nextQuestion.addEventListener("click", () => {

    if (!selectedAnswer) return;


    scores[selectedAnswer]++;


    currentQuestion++;


    if (
        currentQuestion >=
        questions.length
    ) {

        showQuizResult();

    } else {

        loadQuestion();

    }

});


function showQuizResult() {

    let bestResult =
        "playa";

    let bestScore =
        scores.playa;


    Object.keys(scores).forEach(type => {

        if (scores[type] > bestScore) {

            bestScore =
                scores[type];

            bestResult =
                type;

        }

    });


    const results = {

        playa: {

            title: "Cancún 🏝️",

            description:
                "Tu personalidad viajera combina perfectamente con las playas del Caribe mexicano. Cancún es una excelente opción para descansar, disfrutar del mar y vivir nuevas experiencias."

        },


        historia: {

            title: "Teotihuacán 🏛️",

            description:
                "Te apasionan la historia y las culturas antiguas. Teotihuacán te permitirá conocer uno de los grandes centros urbanos del México prehispánico."

        },


        naturaleza: {

            title: "Los Cabos 🌿",

            description:
                "La naturaleza y la aventura son lo tuyo. Los Cabos combina mar, desierto, paisajes increíbles y actividades al aire libre."

        },


        ciudad: {

            title: "Ciudad de México 🌆",

            description:
                "Tu destino ideal es una ciudad llena de historia, gastronomía, museos, arquitectura y entretenimiento."

        }

    };


    resultTitle.textContent =
        results[bestResult].title;


    resultDescription.textContent =
        results[bestResult].description;


    quizBox.style.display =
        "none";

    quizResult.style.display =
        "block";

}


restartQuiz.addEventListener("click", () => {

    currentQuestion = 0;

    scores = {

        playa: 0,

        historia: 0,

        naturaleza: 0,

        ciudad: 0

    };


    quizResult.style.display =
        "none";

    quizBox.style.display =
        "block";


    loadQuestion();

});


loadQuestion();


/* =====================================================
   BACK TO TOP
===================================================== */

backTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".destination-card, .experience-card, .video-card, .gallery-item"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.1
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";


    revealObserver.observe(element);

});


/* =====================================================
   CONSOLA
===================================================== */

console.log(
    "%c🇲🇽 MÉXICO TRAVEL",
    "font-size:25px;font-weight:bold;color:#006847;"
);

console.log(
    "Página turística cargada correctamente."
);