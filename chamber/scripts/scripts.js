const myInfo = new URLSearchParams(window.location.search);
const applicantInfo = document.querySelector(".applicantInfo");
console.log(myInfo);


// myInfo.filter((value, key) => {
//     return key !== "firstname" && key !== "lastname";
// });

myInfo.forEach((value, key) => {
    console.log(key, value);
});

applicantInfo.innerHTML = `<p><strong>First name:</strong> ${myInfo.get("firstname")}</p>
<br>
<p><strong>Last name:</strong> ${myInfo.get("lastname")}</p>
<br>
<p><strong>Email address:</strong> ${myInfo.get("email")}</p>
<br>
<p><strong>Phone number:</strong> ${myInfo.get("phone")}</p>
<br>
<p><strong>Business name:</strong> ${myInfo.get("business")}</p>
<br>
<p><strong>Date of  Submission:</strong> ${myInfo.get("timestamp")}</p>`;
// for (const [key, value] of myInfo.entries()) {
//     if ( key === "businessDesc") {
//         applicantInfo.innerHTML += ``;
//     }
// }