/* =============================================
   OFERTA ACADÉMICA — Page-specific interactions
   ============================================= */

(function () {
  "use strict";

  /* ===== AREA CAROUSEL — infinite vertical scroll, 2-card step ===== */
  const areaGrid = document.querySelector(".area-grid");
  const areasSection = document.querySelector(".oferta-areas");

  if (areaGrid && areasSection) {
    const originalCards = Array.from(areaGrid.querySelectorAll(".area-card"));
    const [prevBtn, nextBtn] = areasSection.querySelectorAll(".arrow-buttons button");
    const totalOriginal = originalCards.length;
    const GAP = 20;

    if (totalOriginal) {
      /* --- Wrap cards in an inner .area-track --- */
      const track = document.createElement("div");
      track.className = "area-track";
      originalCards.forEach((card) => track.appendChild(card));
      areaGrid.appendChild(track);

      /* --- Clone all cards for seamless infinite loop --- */
      originalCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        clone.classList.add("is-clone");
        track.appendChild(clone);
      });

      let currentRow = 0;
      let isAnimating = false;

      /* How many columns the track shows (depends on breakpoint) */
      function getColCount() {
        if (window.innerWidth <= 1180) return 1;
        return 2;
      }

      /* How many rows of original cards exist */
      function getTotalRows() {
        return Math.ceil(totalOriginal / getColCount());
      }

      /* How many rows are visible at once */
      function getVisibleRows() {
        if (window.innerWidth <= 768) return 1;
        return 2;
      }

      function getCardAt(row) {
        const cols = getColCount();
        const index = row * cols;
        const allCards = track.querySelectorAll(".area-card");
        return allCards[index] || null;
      }

      function getRowHeightAt(row) {
        const card = getCardAt(row);
        if (!card) return 0;
        return card.offsetHeight + GAP;
      }

      function getOffsetForRow(row) {
        let offset = 0;
        for (let i = 0; i < row; i++) {
          offset += getRowHeightAt(i);
        }
        return offset;
      }

      function setContainerHeight() {
        const visible = getVisibleRows();
        let totalH = 0;
        for (let i = 0; i < visible; i++) {
          totalH += getRowHeightAt(currentRow + i);
        }
        areaGrid.style.transition = "height 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
        areaGrid.style.height = (totalH - GAP) + "px";
      }

      function slideTo(row, animate) {
        if (animate === undefined) animate = true;
        currentRow = row;
        const offset = getOffsetForRow(currentRow);
        track.style.transition = animate
          ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
          : "none";
        track.style.transform = "translateY(-" + offset + "px)";
        setContainerHeight();
      }

      function normalizeAfterTransition() {
        const total = getTotalRows();
        if (currentRow >= total) {
          currentRow = currentRow - total;
          slideTo(currentRow, false);
        } else if (currentRow < 0) {
          currentRow = currentRow + total;
          slideTo(currentRow, false);
        }
      }

      function next() {
        if (isAnimating) return;
        isAnimating = true;
        slideTo(currentRow + 1, true);
        setTimeout(() => {
          normalizeAfterTransition();
          isAnimating = false;
        }, 520);
      }

      function prev() {
        if (isAnimating) return;
        isAnimating = true;
        const total = getTotalRows();
        if (currentRow === 0) {
          slideTo(total, false);
          void track.offsetHeight;
          slideTo(total - 1, true);
        } else {
          slideTo(currentRow - 1, true);
        }
        setTimeout(() => {
          normalizeAfterTransition();
          isAnimating = false;
        }, 520);
      }

      prevBtn?.addEventListener("click", prev);
      nextBtn?.addEventListener("click", next);

      /* Recalculate on resize */
      window.addEventListener("resize", () => {
        setContainerHeight();
        slideTo(currentRow, false);
      });

      /* Initial setup */
      setContainerHeight();
      slideTo(0, false);

      /* Reveal animation for the area grid */
      areaGrid.style.opacity = "0";
      areaGrid.style.transform = "translateY(40px)";
      areaGrid.style.transition = "opacity 600ms ease, transform 600ms ease";

      const gridObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              areaGrid.style.opacity = "1";
              areaGrid.style.transform = "translateY(0)";
              gridObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05 }
      );
      gridObserver.observe(areaGrid);
    }
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
