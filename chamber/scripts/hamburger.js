const hamburger = document.querySelector("#menu");
const navigation = document.querySelector("nav");

hamburger.addEventListener('click', () => {
    navigation.classList.add('show');
    document.body.style.overflow = 'hidden';
});

document.querySelector("#close").addEventListener('click', () => {
    navigation.classList.remove('show');
    document.body.style.overflow = '';
});

////////////////////////////////////////////////////////////
const rightSideSections = document.querySelectorAll("#right-side section");

rightSideSections.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.1}s`; 
});

const learnMore = document.querySelectorAll(".learnMore");
const closeLearnMore = document.querySelectorAll(".closeButton");
// learnMore.forEach((button) => {
//     button.addEventListener("click", () => {
//         const section = button.parentElement;
//         const listContainer = section.querySelector(".listContainer");
//         listContainer.classList.toggle("show");

//         if (listContainer.classList.contains("show")) {
//             button.classList.add("show");
//         }
//         else {
//             button.classList.remove("show");
//         }
//     });
// });

learnMore.forEach((button) => {
    button.addEventListener("click", () => {
        const section = button.parentElement;
        section.querySelector(".modal").showModal();
    });
});

closeLearnMore.forEach((button) => {
    button.addEventListener("click", () => {
        const dialog = button.parentElement;
        dialog.close();
    });
});