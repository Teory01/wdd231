const searchBut = document.querySelector('#searchButtonContainer');
searchBut.style.transform = 'scale(0)';
searchBut.style.transition = '.5s ease-in-out';

const myInfo = new URLSearchParams(window.location.search);
console.log(myInfo);
const applicantInfo = document.querySelector(".submittedInfo");
console.log(myInfo);

myInfo.forEach((value, key) => {
    console.log(key, value);
});

applicantInfo.innerHTML = `<p><strong>Recipe Name:</strong> ${myInfo.get("name")}</p>
<p><strong>Image URL:</strong> ${myInfo.get("image")}</p>
<p><strong>Ingredients:</strong> ${myInfo.get("ingredients")}</p>
<p><strong>Instructions:</strong> ${myInfo.get("instructions")}</p>
<p><strong>Category:</strong> ${myInfo.get("category")}</p>
<p><strong>Cooking Time:</strong> ${myInfo.get("cooktime")} Minutes</p>
<p><strong>Preparation Time:</strong> ${myInfo.get("preptime")} Minutes</p>
<p><strong>Difficulty:</strong> ${myInfo.get("difficulty")}</p>
`;