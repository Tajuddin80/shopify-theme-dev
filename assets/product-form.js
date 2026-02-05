document.addEventListener("DOMContentLoaded", () => {
  // Check if button[name="add"] exists
  if (document.querySelectorAll('[name="add"]').length > 0) {
    // Event delegation
    document.addEventListener("click", function (e) {
      const button = e.target.closest("button[name='add']");
      if (!button) return;

      e.preventDefault();

      // Find the parent form
      const form = button.closest('.product-form[action="/cart/add"]');
      if (!form) return;

      fetch("/cart/add.js", {
        method: "POST",
        body: new FormData(form),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Add to cart error!");
          return response.json();
        })
        .then((data) => {
          console.log("data:", data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    });
  }
});
