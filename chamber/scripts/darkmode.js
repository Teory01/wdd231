const toggleInput = document.getElementById('myCheckbox');

function showAlert(message, duration) {
    const alertDiv = document.createElement("div");
    alertDiv.id = "alert";
    alertDiv.textContent = message;
    alertDiv.style.position = "fixed";
    alertDiv.style.bottom = "0";
    alertDiv.style.left = "50%";
    alertDiv.style.transform = "translateX(-50%)";
    alertDiv.style.backgroundColor = "#000000";
    alertDiv.style.opacity = "0.8";
    alertDiv.style.color = "white";
    alertDiv.style.padding = "10px";
    alertDiv.style.borderRadius = "20px";
    alertDiv.style.fontFamily = "Belanosima";
    alertDiv.style.width = "100%";    
    alertDiv.style.textAlign = "center";
    alertDiv.style.transition = "1s";


    document.body.appendChild(alertDiv);

    setTimeout(() => {
        document.body.removeChild(alertDiv);
    }, duration);
}
          
toggleInput.addEventListener('change', () => {
    if (toggleInput.checked) {
        
    document.body.classList.toggle("dark-mode");
        
    showAlert("DARK MODE ACTIVATED!", 1000); 
  } else {
        document.body.classList.remove("dark-mode");
        
        showAlert("DARK MODE DE-ACTIVATED!", 1000);
  }
});