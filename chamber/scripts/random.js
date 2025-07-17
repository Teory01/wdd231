const newUrl = "https://teory01.github.io/wdd231/chamber/data/members.json";

const spotlight = document.getElementById("spot-ad");

async function getRanMembersData(){
    try {
        const response = await fetch(newUrl);
        if (response.ok) {
            const data = await response.json();
            displayRanMembers(data.companies);

        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

getRanMembersData();

function displayRanMembers(companies) {

    const needed = [];

    const set = new Set();

    for (let i = 0; i < companies.length; i++) {
        if (companies[i].memberLevel === "Gold" || companies[i].memberLevel === "Silver") {
            needed.push(companies[i]); 
        }
    }

    while (set.size < 3) {
        const ranNum = Math.floor(Math.random() * needed.length);
        set.add(ranNum);
    }

    set.forEach((index) => {
        
        const x = needed[index];
        const article = document.createElement("article");
        article.classList.add('spotAdArticle');

        const businessName = document.createElement('div');
        businessName.classList.add('businessName');
        businessName.innerHTML = `<h3>${x.name}</h3>`;

        const businessDesc = document.createElement('div');
        businessDesc.classList.add('businessDesc');
        const spotAdImage = document.createElement('div');
        spotAdImage.classList.add('spotAdImage');
        const logo = document.createElement("img");
        logo.setAttribute('src', x.image);
        logo.setAttribute('alt', x.name);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('height', '100px');
        logo.setAttribute('width', '100px');
        logo.classList.add('thumbnail'); 
        spotAdImage.appendChild(logo);

        const spotAdDesc = document.createElement('div');
        spotAdDesc.classList.add('spotAdDesc');
        const address = document.createElement("p");
        address.innerHTML = `<strong>EMAIL:</strong> info@gmail.com`;

        const phone = document.createElement("p");
        phone.innerHTML = `<strong>PHONE:</strong> ${x.phone}`
        
        const url = document.createElement("p");
        url.innerHTML = `<strong>URL:</strong> <a href="${x.url}" target="_blank">${x.url}</a>`;

        const membership = document.createElement("p");
        membership.innerHTML = `<strong>MEMBERSHIP LEVEL:</strong> ${x.memberLevel}`;
 
        spotAdDesc.append(address, phone, url, membership);
        businessDesc.append(spotAdImage, spotAdDesc);

        article.append(businessName, businessDesc);
        spotlight.appendChild(article);
    });
        
 }
