/* =============================================
   ADMISIONES — Page-specific interactions
   ============================================= */

(function () {
  "use strict";

  /* ===== STEP TIMELINE ===== */
  const stepDots = document.querySelectorAll(".step-dot[data-step]");
  const stepPanels = document.querySelectorAll(".step-panel[data-panel]");

  stepDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const idx = dot.dataset.step;

      /* Update dots */
      stepDots.forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");

      /* Update panels */
      stepPanels.forEach((p) => p.classList.remove("active"));
      const target = document.querySelector(`.step-panel[data-panel="${idx}"]`);
      if (target) target.classList.add("active");
    });
  });

  /* ===== FORM SUBMIT ===== */
  const admForm = document.querySelector(".adm-form");
  if (admForm) {
    admForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = admForm.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = "¡Enviado!";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        admForm.reset();
      }, 2000);
    });
  }
})();
