function searchMovie() {

    const movie = document
        .getElementById("movieSearch")
        .value;

    if (movie.trim() === "") {

        alert("Please enter a movie name.");

    } else {

        alert("Searching for: " + movie);
    }
}


function bookMovie(movieName) {

    alert(
        "You selected " +
        movieName +
        ". Seat selection will be available soon!"
    );

}/* =================================
   THEATRE SEARCH
================================= */

function filterTheatres() {

    const searchInput =
        document.getElementById("theatreSearch");

    const searchValue =
        searchInput.value.toLowerCase().trim();

    const theatreCards =
        document.querySelectorAll(".theatre-card");

    let visibleCount = 0;

    theatreCards.forEach(function(card) {

        const theatreName =
            card.querySelector("h2").textContent.toLowerCase();

        const theatreDetails =
            card.querySelector(".theatre-info").textContent.toLowerCase();

        if (
            theatreName.includes(searchValue) ||
            theatreDetails.includes(searchValue)
        ) {

            card.style.display = "flex";
            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });


    // No result message
    let noResults =
        document.querySelector(".no-results");

    if (visibleCount === 0) {

        if (!noResults) {

            noResults =
                document.createElement("div");

            noResults.className = "no-results";

            noResults.textContent =
                "Sorry, no theatre found.";

            document
                .getElementById("theatreContainer")
                .appendChild(noResults);
        }

    } else {

        if (noResults) {
            noResults.remove();
        }

    }
}


/* =================================
   SELECT THEATRE
================================= */

function selectTheatre(theatreName) {

    alert(
        "You selected " +
        theatreName +
        "."
    );

}

// ================= SEARCH MOVIE =================

function searchMovie() {

    const input =
        document.getElementById("movieSearch");

    if (!input) {
        return;
    }

    const movieName =
        input.value.trim();

    if (movieName === "") {

        alert("Please enter a movie name.");

        return;
    }

    alert(
        "Searching for movie: " +
        movieName
    );
}


// ================= FILTER MOVIES =================

function filterMovies() {

    const input =
        document.getElementById("movieSearch");

    const container =
        document.getElementById("movieContainer");

    if (!input || !container) {
        return;
    }

    const searchValue =
        input.value.toLowerCase();

    const movies =
        container.getElementsByClassName("movie-card");

    for (let i = 0; i < movies.length; i++) {

        const movieTitle =
            movies[i]
            .querySelector("h3")
            .innerText
            .toLowerCase();

        if (movieTitle.includes(searchValue)) {

            movies[i].style.display = "";

        } else {

            movies[i].style.display = "none";

        }
    }
}


// ================= BOOK MOVIE =================

function bookMovie(movieName) {

    alert(
        "You selected " +
        movieName +
        ".\n\nNext step: Select Theatre and Seats."
    );

}



/* =========================
   THEATRE SEARCH / FILTER
========================= */

function filterTheatres() {

    const searchInput =
        document.getElementById("theatreSearch");

    const searchText =
        searchInput.value.toLowerCase().trim();

    const theatreCards =
        document.querySelectorAll(".theatre-card");

    let foundTheatres = 0;

    theatreCards.forEach(function(card) {

        const theatreName =
            card.querySelector("h2")
                .textContent
                .toLowerCase();

        const theatreDetails =
            card.querySelector(".theatre-info")
                .textContent
                .toLowerCase();


        if (
            theatreName.includes(searchText) ||
            theatreDetails.includes(searchText)
        ) {

            card.style.display = "block";

            foundTheatres++;

        } else {

            card.style.display = "none";
        }
    });


    /* No results */

    let noResults =
        document.querySelector(".no-theatres");


    if (foundTheatres === 0) {

        if (!noResults) {

            noResults =
                document.createElement("div");

            noResults.className =
                "no-theatres";

            noResults.textContent =
                "😔 No theatres found.";

            document
                .getElementById("theatreContainer")
                .appendChild(noResults);
        }

    } else {

        if (noResults) {
            noResults.remove();
        }
    }
}


/* =========================
   SELECT THEATRE
========================= */

function selectTheatre(theatreName) {

    alert(
        "🎭 " +
        theatreName +
        " selected!\n\n" +
        "Now you can choose your movie and seats."
    );

}
f

// ================= SELECT THEATRE =================

function selectTheatre(theatreName) {

    alert(
        "You selected " +
        theatreName +
        ".\n\nNext step: Select Movie and Show Time."
    );

}


// ================= CANCEL BOOKING =================

function cancelBooking(button) {

    const confirmation =
        confirm(
            "Are you sure you want to cancel this booking?"
        );

    if (confirmation) {

        const bookingCard =
            button.closest(".booking-card");

        bookingCard.remove();

        alert("Booking cancelled successfully.");

    }

}
/* =========================================
   PASSWORD TOGGLE
========================================= */

function togglePassword(inputId, button) {

    const input = document.getElementById(inputId);

    if (!input) {
        return;
    }

    if (input.type === "password") {

        input.type = "text";

        button.textContent = "🙈";

    } else {

        input.type = "password";

        button.textContent = "👁️";
    }
}


/* =========================================
   REGISTER FORM
========================================= */

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("registerName")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("registerEmail")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("registerPhone")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("registerPassword")
                    .value;


            const confirmPassword =
                document
                    .getElementById("confirmPassword")
                    .value;


            /* Password validation */

            if (password.length < 6) {

                alert(
                    "Password must contain at least 6 characters."
                );

                return;
            }


            /* Confirm password */

            if (password !== confirmPassword) {

                alert(
                    "Password and Confirm Password do not match."
                );

                return;
            }


            /* Mobile validation */

            if (!/^[0-9]{10}$/.test(phone)) {

                alert(
                    "Please enter a valid 10-digit mobile number."
                );

                return;
            }


            /*
             * Temporary frontend registration
             *
             * Backend जोडल्यावर हा भाग
             * API call मध्ये बदलला जाईल.
             */

            const user = {

                name: name,

                email: email,

                phone: phone,

                password: password
            };


            localStorage.setItem(
                "movieBookUser",
                JSON.stringify(user)
            );


            alert(
                "Registration successful! 🎉\n\n" +
                "Welcome to MovieBook, " +
                name + "!"
            );


            window.location.href =
                "login.html";

        }
    );
}


/* =========================================
   LOGIN FORM
========================================= */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            const savedUser =
                localStorage.getItem(
                    "movieBookUser"
                );


            if (!savedUser) {

                alert(
                    "No account found.\n\n" +
                    "Please register first."
                );

                return;
            }


            const user =
                JSON.parse(savedUser);


            /* Check email */

            if (email !== user.email) {

                alert(
                    "Invalid email address."
                );

                return;
            }


            /* Check password */

            if (password !== user.password) {

                alert(
                    "Incorrect password."
                );

                return;
            }


            /*
             * Save login state
             */

            localStorage.setItem(
                "movieBookLoggedIn",
                "true"
            );


            localStorage.setItem(
                "movieBookCurrentUser",
                JSON.stringify(user)
            );


            alert(
                "Login successful! 🎉"
            );


            window.location.href =
                "index.html";

        }
    );
}


/* =========================================
   FORGOT PASSWORD
========================================= */

function forgotPassword(event) {

    event.preventDefault();

    const email =
        prompt(
            "Enter your registered email address:"
        );


    if (!email) {
        return;
    }


    const savedUser =
        localStorage.getItem(
            "movieBookUser"
        );


    if (!savedUser) {

        alert(
            "No account found."
        );

        return;
    }


    const user =
        JSON.parse(savedUser);


    if (
        email.trim().toLowerCase() !==
        user.email.toLowerCase()
    ) {

        alert(
            "No account found with this email."
        );

        return;
    }


    alert(
        "Password reset feature will be connected to the backend."
    );
}

/* =========================================
   MOVIE SEARCH
========================================= */

function filterMovies() {

    const searchInput =
        document.getElementById("movieSearch");

    if (!searchInput) {
        return;
    }

    const searchText =
        searchInput.value.toLowerCase().trim();

    const movieCards =
        document.querySelectorAll(".movie-card");

    let foundMovies = 0;

    movieCards.forEach(function (card) {

        const titleElement =
            card.querySelector("h3");

        if (!titleElement) {
            return;
        }

        const movieTitle =
            titleElement.textContent.toLowerCase();

        if (movieTitle.includes(searchText)) {

            card.style.display = "";

            foundMovies++;

        } else {

            card.style.display = "none";
        }
    });


    /* =====================================
       NO RESULTS MESSAGE
    ===================================== */

    let noResults =
        document.querySelector(".movie-no-results");

    if (foundMovies === 0 && searchText !== "") {

        if (!noResults) {

            noResults =
                document.createElement("div");

            noResults.className =
                "movie-no-results no-results";

            noResults.textContent =
                "😔 No movies found.";

            const movieSection =
                document.querySelector(".movies-section");

            if (movieSection) {
                movieSection.appendChild(noResults);
            }
        }

    } else {

        if (noResults) {
            noResults.remove();
        }
    }
}


/* =========================================
   SEARCH MOVIE FROM HOME PAGE
========================================= */

function searchMovie() {

    const searchInput =
        document.getElementById("movieSearch");

    if (!searchInput) {
        return;
    }

    const movieName =
        searchInput.value.trim();

    if (movieName === "") {

        alert("Please enter a movie name.");

        return;
    }

    /*
     * Save searched movie
     * so movies.html can read it.
     */

    localStorage.setItem(
        "movieSearchQuery",
        movieName
    );

    /*
     * Open movies page
     */

    window.location.href =
        "movies.html";
}


/* =========================================
   BOOK MOVIE
========================================= */

function bookMovie(movieName) {

    /*
     * Save selected movie
     */

    localStorage.setItem(
        "selectedMovie",
        movieName
    );


    /*
     * Clear previous booking information
     */

    localStorage.removeItem("selectedTheatre");
    localStorage.removeItem("selectedDate");
    localStorage.removeItem("selectedTime");
    localStorage.removeItem("selectedSeats");
    localStorage.removeItem("bookingTotal");


    /*
     * Check login
     */

    const isLoggedIn =
        localStorage.getItem("movieBookLoggedIn");


    if (isLoggedIn !== "true") {

        const loginRequired =
            confirm(
                "Please login before booking a movie.\n\n" +
                "Do you want to login now?"
            );

        if (loginRequired) {

            window.location.href =
                "login.html";

        }

        return;
    }


    /*
     * Go to theatre selection
     */

    window.location.href =
        "theaters1.html";
}


/* =========================================
   LOAD SEARCH FROM HOME PAGE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const searchInput =
            document.getElementById("movieSearch");

        if (!searchInput) {
            return;
        }


        /*
         * Check if search came from Home page
         */

        const savedSearch =
            localStorage.getItem(
                "movieSearchQuery"
            );


        if (savedSearch) {

            searchInput.value =
                savedSearch;

            filterMovies();

            /*
             * Remove after using
             */

            localStorage.removeItem(
                "movieSearchQuery"
            );
        }
    }
);
