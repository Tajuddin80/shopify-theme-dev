document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".product-form");
  if (!form) return;

  const variantSelect = form.querySelector('select[name="id"]');
  if (!variantSelect) return;

  function getSelectedOptions() {
    const values = [];

    // radio pills
    form.querySelectorAll(".product-options input[type=radio]:checked").forEach((input) => values.push(input.value));

    // dropdown selectors
    form.querySelectorAll(".variant-select").forEach((select) => values.push(select.value));

    return values.join(" / ");
  }

  function updateVariantId() {
    const selected = getSelectedOptions();

    const match = [...variantSelect.options].find((opt) => opt.dataset.options === selected);

    if (match) {
      variantSelect.value = match.value;
      variantSelect.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  // listen for changes
  form.addEventListener("change", (e) => {
    if (e.target.matches(".variant-select") || e.target.matches(".product-options input[type=radio]")) {
      updateVariantId();
    }
  });

  // Add to cart
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch("/cart/add.js", {
      method: "POST",
      body: new FormData(form),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log("CORRECT variant added:", data);
      })
      .catch(console.error);
  });
});
