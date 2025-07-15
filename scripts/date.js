const date = new Date;
const year = document.getElementById('currentyear');

year.innerHTML += date.getFullYear();

/////////////////////////////////////////////////////////

const modified = document.getElementById('lastModified');
let lastModified = new Date(document.lastModified);
modified.innerHTML += lastModified;