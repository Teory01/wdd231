const modified = document.getElementById('last-modified');
modified.style.color = 'white';

let lastMod = new Date(document.lastModified);

modified.innerHTML += lastMod;

// // Calculating the number of page visits..........
// if (localStorage.getItem('visitCount') === null) {
//     // If not, initialize it to 1 and set a flag in session storage
//     localStorage.setItem('visitCount', 1);
//     sessionStorage.setItem('visitedOnce', 'true');
// } else {
//     // Check if the flag is not set in session storage (indicating a new navigation)
//     if (sessionStorage.getItem('visitedOnce') === null) {
//         // If the flag is not set, increment the visit count and set the flag
//         let visitCount = parseInt(localStorage.getItem('visitCount'));
//         visitCount++;
//         localStorage.setItem('visitCount', visitCount);
//         sessionStorage.setItem('visitedOnce', 'true');
//     }
// }

// // Update the content of the 'visit' element with the current visit count
// document.getElementById('visit').innerText = `Page Visits: ` + localStorage.getItem('visitCount');

// Check if localStorage has a 'lastVisit' key
    
const visit = document.getElementById("last-visit");
visit.style.fontSize = "1.3rem";

if(localStorage.getItem('lastVisit') === null) {
    // First visit
    visit.innerText = "Welcome! Let us know if you have any questions.";
    } else {
    // Get the last visit date from localStorage
    const lastVisit = new Date(localStorage.getItem('lastVisit'));

    // Calculate the time difference in milliseconds
    const timeDifference = new Date() - lastVisit;

    // Calculate the number of days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference < 1) {
        // Less than a day
       visit.innerText = "Back so soon! Awesome!";
    } else {
        // Display the number of days
        const message = (daysDifference === 1) ? "day" : "days";
        visit.innerText = "You last visited " + daysDifference + " " + message + " ago.";
    }
}

// Update localStorage with the current visit date
localStorage.setItem('lastVisit', new Date().toString());