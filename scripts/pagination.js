// JavaScript for dynamic product pagination

let currentPage = 1;
const productsPerPage = 10; // Number of products to display per page

// Function to get products for the current page
function getProductsForPage(page) {
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  return products.slice(startIndex, endIndex);
}

// Function to render pagination controls
function renderPagination() {
    const totalPages = Math.ceil(products.length / productsPerPage);
    const paginationContainer = document.getElementById("pagination");
  
    paginationContainer.innerHTML = "";
  
    // Add "Previous" button
    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    prevButton.className = "nav-button";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => switchPage(currentPage - 1));
    paginationContainer.appendChild(prevButton);
  
    // Add page buttons
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.className = `page-button ${i === currentPage ? "active" : ""}`;
      pageButton.disabled = i === currentPage;
      pageButton.addEventListener("click", () => switchPage(i));
      paginationContainer.appendChild(pageButton);
    }
  
    // Add "Next" button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.className = "nav-button";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => switchPage(currentPage + 1));
    paginationContainer.appendChild(nextButton);
  }
  

// Function to switch pages
function switchPage(page) {
  currentPage = page;
  const pageProducts = getProductsForPage(page);
  renderProducts(pageProducts);
  renderPagination();
}

// Initial rendering
switchPage(currentPage);