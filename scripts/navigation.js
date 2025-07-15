const navButton = document.querySelector('#menu');
const navigation = document.querySelector('nav');

navButton.addEventListener('click', () => {
    document.body.classList.add('body-open');
    navigation.classList.add('open');
});

document.querySelector('#close').addEventListener('click', () => {
    document.body.classList.remove('body-open');
    navigation.classList.remove('open');
});