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

  /* ===== CUSTOM DROPDOWNS ===== */
  const dropdowns = document.querySelectorAll(".custom-dropdown");

  dropdowns.forEach((dd) => {
    const toggle = dd.querySelector(".dropdown-toggle");
    const menu = dd.querySelector(".dropdown-menu");
    const radios = dd.querySelectorAll('input[type="radio"]');

    toggle?.addEventListener("click", (e) => {
      e.stopPropagation();
      /* Close other open dropdowns */
      dropdowns.forEach((other) => {
        if (other !== dd) {
          other.querySelector(".dropdown-menu")?.classList.remove("open");
          other.querySelector(".dropdown-toggle")?.setAttribute("aria-expanded", "false");
        }
      });
      const isOpen = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen);
    });

    radios.forEach((radio) => {
      radio.addEventListener("change", () => {
        /* Update toggle text to show selected value */
        const label = radio.parentElement.textContent.trim();
        const defaultText = dd.dataset.dropdown === "area" ? "Área académica" : "Campus";
        toggle.firstChild.textContent = radio.value ? label + " " : defaultText + " ";
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        applyProgramFilters();
      });
    });
  });

  /* Close dropdowns on outside click */
  document.addEventListener("click", () => {
    dropdowns.forEach((dd) => {
      dd.querySelector(".dropdown-menu")?.classList.remove("open");
      dd.querySelector(".dropdown-toggle")?.setAttribute("aria-expanded", "false");
    });
  });

  /* ===== WRAP PROGRAM-MODE TEXT IN CLICKABLE SPANS ===== */
  document.querySelectorAll(".program-mode").forEach((mode) => {
    const parts = mode.textContent.split("|").map((s) => s.trim());
    mode.innerHTML = parts.map((p) => `<span>${p}</span>`).join(" | ");
  });

  /* ===== PROGRAM SEARCH & FILTERING ===== */
  const programCards = document.querySelectorAll(".program-card");
  const searchInput = document.getElementById("search-licenciatura");
  const searchClear = document.querySelector(".search-clear");
  const searchBtn = document.querySelector(".search-btn");
  const resultCount = document.getElementById("result-count");
  let currentPage = 1;

  function getCardsPerPage() {
    const w = window.innerWidth;
    if (w <= 768) return 2;
    if (w <= 1440) return 4;
    return 6;
  }

  function getFilterValues() {
    const areaRadio = document.querySelector('input[name="filter-area"]:checked');
    const campusRadio = document.querySelector('input[name="filter-campus"]:checked');
    return {
      search: searchInput?.value.toLowerCase().trim() || "",
      area: areaRadio?.value || "",
      campus: campusRadio?.value || "",
    };
  }

  function getVisibleCards() {
    const { search, area, campus } = getFilterValues();
    return [...programCards].filter((card) => {
      const text = card.textContent.toLowerCase();
      if (search && !text.includes(search)) return false;
      if (area && card.dataset.area !== area) return false;
      if (campus && card.dataset.campus !== campus) return false;
      return true;
    });
  }

  function renderPage() {
    const visible = getVisibleCards();
    const perPage = getCardsPerPage();
    const totalPages = Math.max(1, Math.ceil(visible.length / perPage));
    if (currentPage > totalPages) currentPage = totalPages;

    /* Hide all, then show current page */
    programCards.forEach((c) => c.classList.add("hidden"));
    const start = (currentPage - 1) * perPage;
    visible.slice(start, start + perPage).forEach((c) => c.classList.remove("hidden"));

    /* Update count */
    if (resultCount) resultCount.textContent = visible.length;

    /* Update pagination */
    renderPagination(totalPages);
  }

  function applyProgramFilters() {
    currentPage = 1;
    renderPage();
  }

  /* Search events */
  searchBtn?.addEventListener("click", applyProgramFilters);
  searchInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") applyProgramFilters();
  });
  searchInput?.addEventListener("input", () => {
    if (searchInput.value === "") applyProgramFilters();
  });
  searchClear?.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    applyProgramFilters();
  });

  /* ===== CLICKABLE TAG & MODE FILTERS ===== */
  function selectRadio(name, value) {
    const radio = document.querySelector(`input[name="${name}"][value="${value}"]`);
    if (radio) {
      radio.checked = true;
      /* Update dropdown toggle text */
      const dd = radio.closest(".custom-dropdown");
      const toggle = dd?.querySelector(".dropdown-toggle");
      if (toggle) {
        const label = radio.parentElement.textContent.trim();
        toggle.firstChild.textContent = label + " ";
      }
    }
  }

  /* Click on program-tag → filter by area */
  document.querySelectorAll(".program-tag").forEach((tag) => {
    tag.addEventListener("click", () => {
      const card = tag.closest(".program-card");
      const area = card?.dataset.area || "";
      if (area) {
        selectRadio("filter-area", area);
        applyProgramFilters();
        document.getElementById("buscar")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* Click on campus span inside program-mode → filter by campus */
  const campusMap = {
    "BICAMPUS": "bicampus",
    "CAMPUS NORTE": "norte",
    "CAMPUS SUR": "sur",
  };

  document.querySelectorAll(".program-mode span").forEach((span) => {
    const text = span.textContent.trim();
    const campusVal = campusMap[text];
    if (campusVal) {
      span.addEventListener("click", () => {
        selectRadio("filter-campus", campusVal);
        applyProgramFilters();
        document.getElementById("buscar")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  });

  /* ===== PAGINATION ===== */
  const paginationNav = document.querySelector(".pagination");

  function renderPagination(totalPages) {
    if (!paginationNav) return;
    paginationNav.innerHTML = "";
    if (totalPages <= 1) return;

    const MAX_VISIBLE = 5;
    const hasLeft = currentPage > 1;
    const hasRight = currentPage < totalPages;

    /* Calculate how many page number slots are available */
    let numSlots = MAX_VISIBLE;
    if (hasLeft) numSlots--;
    if (hasRight) numSlots--;

    /* Determine the range of pages to show */
    let startPage, endPage;
    if (!hasLeft) {
      /* At the beginning */
      startPage = 1;
      endPage = Math.min(totalPages, startPage + numSlots - 1);
    } else if (!hasRight) {
      /* At the end */
      endPage = totalPages;
      startPage = Math.max(1, endPage - numSlots + 1);
    } else {
      /* In the middle — center around current page */
      const half = Math.floor(numSlots / 2);
      startPage = currentPage - half;
      endPage = currentPage + (numSlots - half - 1);
      if (startPage < 1) { endPage += (1 - startPage); startPage = 1; }
      if (endPage > totalPages) { startPage -= (endPage - totalPages); endPage = totalPages; }
      startPage = Math.max(1, startPage);
    }

    function scrollToSearch() {
      document.getElementById("buscar")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    /* Left arrow */
    if (hasLeft) {
      const prev = document.createElement("button");
      prev.className = "page-btn page-next";
      prev.setAttribute("aria-label", "Anterior");
      prev.textContent = "‹";
      prev.addEventListener("click", () => { currentPage--; renderPage(); scrollToSearch(); });
      paginationNav.appendChild(prev);
    }

    /* Page numbers */
    for (let i = startPage; i <= endPage; i++) {
      const btn = document.createElement("button");
      btn.className = `page-btn${i === currentPage ? " active" : ""}`;
      btn.textContent = i;
      btn.addEventListener("click", () => { currentPage = i; renderPage(); scrollToSearch(); });
      paginationNav.appendChild(btn);
    }

    /* Right arrow */
    if (hasRight) {
      const next = document.createElement("button");
      next.className = "page-btn page-next";
      next.setAttribute("aria-label", "Siguiente");
      next.textContent = "›";
      next.addEventListener("click", () => { currentPage++; renderPage(); scrollToSearch(); });
      paginationNav.appendChild(next);
    }
  }

  /* Initial render */
  renderPage();

  /* Re-render on resize */
  window.addEventListener("resize", () => renderPage());
})();
