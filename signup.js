async function loadCountries() {
  const response = await fetch("countries.json");
  const countries = await response.json();

  const countrySelect = document.getElementById("country");
  countrySelect.innerHTML = '<option value="">Select Country</option>';

  countries.forEach(country => {
    const option = document.createElement("option");
    option.value = country.countryCode; // ISO code for form submission
    option.textContent = `${country.name} (${country.code})`; // name + dial code shown
    option.setAttribute("data-code", country.code); // dial code saved in data attribute
    countrySelect.appendChild(option);
  });
}


function updateMobilePlaceholder() {
  const select = document.getElementById("country");
  const selectedOption = select.options[select.selectedIndex];
  const dialCode = selectedOption.getAttribute("data-code") || "";
  document.getElementById("mobile").placeholder = `e.g. ${dialCode} 1234567890`;
}


window.onload = () => {
  loadCountries();
  document.getElementById("country").addEventListener("change", updateMobilePlaceholder);
};

function handleSignup(event) {
  event.preventDefault();
  // You can add form submission logic here
  alert("Form submitted!");
}
