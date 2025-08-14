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