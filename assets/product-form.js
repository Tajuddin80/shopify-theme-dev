// document.addEventListener("DOMContentLoaded", () => {
//   // Check if button[name="add"] exists
//   if (document.querySelectorAll('[name="add"]').length > 0) {
//     // Event delegation (same as $(document).on)
//     document.addEventListener("click", function (e) {
//       const button = e.target.closest("button[name='add']");

//       if (button) {
//         e.preventDefault();
//         // console.log("Clicked");
//         let formData = $(this).parent().find('.product-form[action="/cart/add"').serialize();
//         console.log(formData);
//         return
//         $.ajax({
//           type: "POST",
//           url: "/cart/add.js",
//           dataType: "json",
//           data: formData,
//           success: function (data) {
//             console.log("data:", data);
//           },
//           error: "Add to cart error!",
//         });
//       }
//     });
//   }
// });


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

      // Serialize form data (jQuery serialize replacement)
      const formData = new FormData(form);
      const serializedData = new URLSearchParams(formData).toString();

      console.log(serializedData);
      // return; // keep this if you want to stop here like your original code

      fetch("/cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: serializedData,
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
