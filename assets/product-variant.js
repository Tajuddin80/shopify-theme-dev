document.addEventListener("DOMContentLoaded", () => {
  function selectedVariant() {
    let currentVariant = document.querySelector(".variant").value;
    console.log(currentVariant);
  }

  function updateSelection() {
    let selectedValues = "";

    document.querySelectorAll('.product-options input[type="radio"]:checked').forEach((radio) => {
      selectedValues += (selectedValues ? " / " : "") + radio.value;
    });

    console.log(selectedValues);

    // match Shopify variant title
    const options = document.querySelectorAll(".variants option");

    for (const option of options) {
      if (option.textContent.trim() === selectedValues) {
        option.selected = true;
        break;
      }
    }
  }

  // listen for radio changes
  document.querySelectorAll('.product-options input[type="radio"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      updateSelection();

      // Get the current variant value
      let currentVariant = document.querySelector(".variant").value;

      // Get the selected option element inside the select.variant
      let variantSelect = document.querySelector(".variant");
      let selectedOption = variantSelect.options[variantSelect.selectedIndex];

      // Check if variant is available (assumes data-available attribute is "true" or "false")
      let variantAvailable = selectedOption.dataset.available === "true";

      // Select the cart button
      let cartButton = document.querySelector(".cart-buttons > button");

      if (!variantAvailable) {
        cartButton.disabled = true;
        cartButton.textContent = "Not available";
      } else {
        cartButton.disabled = false;
        cartButton.textContent = "Add to cart";
      }

      // Call your function with the selected variant
      selectedVariant("variant", currentVariant);
    });

    // Call updateSelection on load
    updateSelection();
  });
});
