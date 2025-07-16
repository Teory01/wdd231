const url = "https://teory01.github.io/wdd231/chamber/data/members.json";

const cards = document.getElementById("cards");

async function getMembersData() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.companies);
}


const displayMembers = (members) => {

    members.forEach((member) => {

        const section = document.createElement("section");
        section.setAttribute('id', 'section-card');

        const logoContainer = document.createElement("div");
        logoContainer.setAttribute('class', 'logo-container');
        
        const logo = document.createElement("img");
        logo.setAttribute('src', member.image);
        logo.setAttribute('alt', member.name);
        logo.setAttribute('loading', 'lazy');


        const companyName = document.createElement("h2");
        companyName.innerHTML = `${member.name}`;
        companyName.setAttribute('class', 'h2');

        const companyAddress = document.createElement("p");
        companyAddress.innerHTML = `${member.address}`;

        const companyPhone = document.createElement("p");
        companyPhone.innerHTML = `${member.phone}`;

        const companySite = document.createElement("a");
        companySite.setAttribute('href', member.url)
        companySite.setAttribute('target', '_blank')
        companySite.innerHTML = `${member.url}`

        logoContainer.appendChild(logo);
        section.append(logoContainer, companyName, companyAddress, companyPhone, companySite);
        cards.appendChild(section);
    });
}

document.getElementById("grid").addEventListener("click", () => {
    document.body.classList.add("grid");
    document.body.classList.remove("list");
});

document.querySelector("#list").addEventListener("click", () => {
    
    document.body.classList.add("list");
    document.body.classList.remove("grid");
});

getMembersData();
document.body.classList.toggle("grid");
