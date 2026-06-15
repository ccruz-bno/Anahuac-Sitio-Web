/* =============================================
   OFERTA ACADÉMICA — Page-specific interactions
   ============================================= */

(function () {
  "use strict";

  /* ===== AREA CAROUSEL ===== */
  const areaScroller = document.querySelector(".area-scroller");
  const areaNav = document.querySelector(".area-nav");

  if (areaScroller && areaNav) {
    const cards = areaScroller.querySelectorAll(".area-card");
    const dotsWrap = areaNav.querySelector(".dots");
    const [prevBtn, nextBtn] = areaNav.querySelectorAll(".arrow-buttons button");

    /* Create dots */
    cards.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Ir al área ${i + 1}`);
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => scrollToCard(i));
      dotsWrap.appendChild(dot);
    });

    const dots = dotsWrap.querySelectorAll("button");

    function scrollToCard(index) {
      const card = cards[index];
      if (!card) return;
      areaScroller.scrollTo({
        left: card.offsetLeft - areaScroller.offsetLeft,
        behavior: "smooth",
      });
    }

    function updateDots() {
      const scrollLeft = areaScroller.scrollLeft;
      const cardWidth = cards[0].offsetWidth + 20; /* 20 = gap */
      const activeIdx = Math.round(scrollLeft / cardWidth);
      dots.forEach((d, i) => d.classList.toggle("active", i === activeIdx));
    }

    areaScroller.addEventListener("scroll", updateDots, { passive: true });

    prevBtn?.addEventListener("click", () => {
      const cardWidth = cards[0].offsetWidth + 20;
      areaScroller.scrollBy({ left: -cardWidth, behavior: "smooth" });
    });

    nextBtn?.addEventListener("click", () => {
      const cardWidth = cards[0].offsetWidth + 20;
      areaScroller.scrollBy({ left: cardWidth, behavior: "smooth" });
    });
  }

  /* ===== FILTER PILLS ===== */
  const pills = document.querySelectorAll(".pill[data-filter]");
  const resultCards = document.querySelectorAll(".result-card");
  const searchInput = document.getElementById("search-licenciatura");
  const filterArea = document.getElementById("filter-area");

  function applyFilters() {
    const activePill = document.querySelector(".pill.active");
    const filterVal = activePill?.dataset.filter || "all";
    const searchVal = searchInput?.value.toLowerCase().trim() || "";
    const areaVal = filterArea?.value || "";

    resultCards.forEach((card) => {
      const campus = card.dataset.campus || "";
      const mode = card.dataset.mode || "";
      const area = card.dataset.area || "";
      const text = card.textContent.toLowerCase();

      let show = true;

      /* Filter by pill */
      if (filterVal !== "all") {
        if (filterVal === "bicampus" && campus !== "bicampus") show = false;
        else if (filterVal === "norte" && campus !== "norte" && campus !== "bicampus") show = false;
        else if (filterVal === "sur" && campus !== "sur" && campus !== "bicampus") show = false;
        else if (filterVal === "presencial" && mode !== "presencial") show = false;
        else if (filterVal === "virtual" && mode !== "virtual") show = false;
      }

      /* Filter by search */
      if (searchVal && !text.includes(searchVal)) show = false;

      /* Filter by area select */
      if (areaVal && area !== areaVal) show = false;

      card.style.display = show ? "" : "none";
    });
  }

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      applyFilters();
    });
  });

  searchInput?.addEventListener("input", applyFilters);
  filterArea?.addEventListener("change", applyFilters);

  /* ===== TESTIMONIAL ARROWS ===== */
  const storiesSection = document.querySelector(".oferta-stories");
  if (storiesSection) {
    const [prevStory, nextStory] = storiesSection.querySelectorAll(".arrow-buttons button");
    const testimonials = storiesSection.querySelector(".testimonials");

    if (testimonials) {
      prevStory?.addEventListener("click", () => {
        testimonials.scrollBy({ left: -400, behavior: "smooth" });
      });
      nextStory?.addEventListener("click", () => {
        testimonials.scrollBy({ left: 400, behavior: "smooth" });
      });
    }
  }

  /* ===== FORM SUBMIT ===== */
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = "¡Enviado!";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        contactForm.reset();
      }, 2000);
    });
  }
})();
