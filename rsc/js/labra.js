// Get the LABRA logo image
const logo = document.querySelector('img[alt="LABRA logo"]');

// Update the logo based on the user's preferred color scheme
function updateLogo() {
  // Get the user's preferred color scheme
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  // Set the logo's source to the appropriate image
  if (prefersLight) {
    logo.src = 'rsc/img/labrolight.png';
  } else {
    logo.src = 'rsc/img/labradark.png';
  }
}

// Update the theme of the page based on the user's preferred color scheme
function updateTheme() {
  // Get the user's preferred color scheme
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  // Set the page's theme to the appropriate value
  if (prefersLight) {
    document.documentElement.classList.add('light-theme');
    document.documentElement.classList.remove('dark-theme');
  } else {
    document.documentElement.classList.add('dark-theme');
    document.documentElement.classList.remove('light-theme');
  }
}

// Initialize the logo and theme
updateLogo();
updateTheme();

const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdown = document.querySelector('.dropdown');

// Add an event listener to the dropdown menu so that the logo changes to the "hover" image when the menu is opened
$(dropdown).on('shown.bs.dropdown', function() {
  logo.dataset.dropdownOpen = 'true';
  updateLogo();
});

// Add an event listener to the dropdown menu so that the logo reverts to the default image when the menu is closed
$(dropdown).on('hidden.bs.dropdown', function() {
  logo.dataset.dropdownOpen = 'false';
  updateLogo();
});

// Update the logo based on the user's preferred color scheme
function updateLogo() {
  // Get the user's preferred color scheme
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  // Check if the dropdown is open or the logo is hovered
  const dropdownOpen = logo.dataset.dropdownOpen === 'true';
  const hovered = logo.classList.contains('hovered');

  // Set the logo's source to the appropriate image
  if (dropdownOpen || hovered) {
    logo.src = 'rsc/img/labro.png';
  } else if (prefersLight) {
    logo.src = 'rsc/img/labrolight.png';
  } else {
    logo.src = 'rsc/img/labrodark.png';
  }
}

// Add event listeners for 'mouseenter' and 'mouseleave' on the logo element
logo.addEventListener('mouseenter', function() {
  logo.classList.add('hovered');
  updateLogo();
});

logo.addEventListener('mouseleave', function() {
  logo.classList.remove('hovered');
  updateLogo();
});

window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function() {
  updateLogo();
});

// Add an event listener to the upload form so that the file is submitted when the form is submitted
window.addEventListener('load', function() {
  document.getElementById('upload-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
      });
      if (response.ok) {
        const resultHtml = await response.text();
        document.getElementById('result-table').innerHTML = resultHtml;
      } else {
        alert('Error processing the file');
      }
    } catch (error) {
      alert('Error: ' + error);
    }
  });
});

// Get the file input element
const fileInput = document.getElementById('fileInput');
const analyzeBtn = document.getElementById('analyze-btn');

fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    analyzeBtn.style.display = 'inline-block';
  } else {
    analyzeBtn.style.display = 'none';
  }
});