document.addEventListener("click", (e) => {
  const wrap = e.target.closest(".quantity-input");
  if (!wrap) return;

  const input = wrap.querySelector(".js-qty-input");
  let value = parseInt(input.value, 10) || 1;

  if (e.target.classList.contains("js-qty-plus")) value++;
  if (e.target.classList.contains("js-qty-minus")) value = Math.max(1, value - 1);

  input.value = value;
});
