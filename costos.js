/* =============================================
   COSTOS Y BECAS — Page interactions
   ============================================= */

(function () {
  "use strict";

  /* ===== PERIOD TOGGLES ===== */
  document.querySelectorAll(".period-toggle").forEach((toggle) => {
    const btns = toggle.querySelectorAll(".period-btn");
    const section = toggle.closest("section");

    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const period = btn.dataset.period;
        const key = period === "anual" ? "anu" : "sem";

        if (section) {
          section.querySelectorAll("[data-sem][data-anu]").forEach((el) => {
            const value = el.dataset[key];
            const priceEl =
              el.querySelector(".price-amount") ||
              el.querySelector(".price-big");
            if (priceEl && value) {
              priceEl.textContent = value;
            }
          });

          section.querySelectorAll(".price-period").forEach((label) => {
            label.textContent =
              period === "anual" ? "Por año" : "Por semestre";
          });
        }
      });
    });
  });

  /* ===== INLINE FORM ===== */
  const inlineForm = document.querySelector(".cost-inline-form");
  if (inlineForm) {
    inlineForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = inlineForm.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = "¡Enviado!";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        inlineForm.reset();
      }, 2000);
    });
  }
})();
