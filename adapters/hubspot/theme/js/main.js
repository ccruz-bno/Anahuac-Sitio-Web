document.documentElement.classList.remove("no-js");
const body = document.body;
body.classList.add("ready");

/* Sticky header gradient — show after 150px scroll */
window.addEventListener("scroll", () => {
  body.classList.toggle("scrolled", window.scrollY > 150);
}, { passive: true });

/* Encabezado «sólo logo»: se retira al bajar y vuelve al subir, para no tapar
   el contenido en páginas largas. Sólo aplica a esa variante — el encabezado
   con navegación sigue fijo en todas las demás páginas. */
(() => {
  const soloLogo = document.querySelector(".site-header--solo-logo");
  if (!soloLogo) return;
  let ultimo = window.scrollY;
  let pendiente = false;
  const UMBRAL = 8;              // ignora el temblor del trackpad
  const DESPEGUE = 160;          // no se esconde pegado al inicio
  const revisar = () => {
    const y = window.scrollY;
    // Cerca del tope SIEMPRE se ve, pase lo que pase con la dirección: si el
    // salto al inicio era grande, el umbral dejaba la clase puesta y el
    // encabezado se quedaba escondido arriba del todo.
    if (y <= DESPEGUE) {
      soloLogo.classList.remove("is-oculto");
      ultimo = y;
      pendiente = false;
      return;
    }
    if (Math.abs(y - ultimo) > UMBRAL) {
      soloLogo.classList.toggle("is-oculto", y > ultimo);
      ultimo = y;
    }
    pendiente = false;
  };
  window.addEventListener("scroll", () => {
    if (!pendiente) { pendiente = true; window.requestAnimationFrame(revisar); }
  }, { passive: true });
})();

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu a");
const mobileSubnavs = document.querySelectorAll(".mobile-subnav");
const pathCards = document.querySelectorAll(".path-card");

function setMenu(open) {
  body.classList.toggle("menu-open", open);
  menuToggle?.setAttribute("aria-expanded", String(open));
  mobileMenu?.setAttribute("aria-hidden", String(!open));
}

menuToggle?.addEventListener("click", () => {
  setMenu(!body.classList.contains("menu-open"));
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

mobileSubnavs.forEach((button) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";

    /* Close all other submenus first */
    mobileSubnavs.forEach((other) => {
      if (other !== button) {
        other.setAttribute("aria-expanded", "false");
        const otherMenu = other.nextElementSibling;
        if (otherMenu?.classList.contains("mobile-submenu")) {
          otherMenu.style.display = "none";
        }
      }
    });

    button.setAttribute("aria-expanded", String(!expanded));
    const submenu = button.nextElementSibling;
    if (submenu?.classList.contains("mobile-submenu")) {
      submenu.style.display = expanded ? "none" : "grid";
    }
  });
});

const pathPhoto = document.querySelector(".path-photo");
const defaultPathImg = pathPhoto?.getAttribute("src");

/* Set first card as active by default */
if (pathCards.length > 0) {
  pathCards[0].classList.add("is-open");
}

pathCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    pathCards.forEach((item) => item.classList.remove("is-open"));
    card.classList.add("is-open");
    /* Switch background photo */
    const img = card.dataset.img;
    if (img && pathPhoto) {
      pathPhoto.style.opacity = "0";
      setTimeout(() => {
        pathPhoto.src = img;
        pathPhoto.style.opacity = "1";
      }, 200);
    }
  });
  /* No mouseleave handler — last hovered card stays active */
});

const revealItems = document.querySelectorAll("[data-reveal]");
const countItems = document.querySelectorAll("[data-count-to]");

function formatCount(value) {
  return Math.round(value).toLocaleString("es-MX");
}

function animateCount(item) {
  if (item.dataset.counted === "true") return;

  item.dataset.counted = "true";
  const target = Number(item.dataset.countTo || 0);
  const prefix = item.dataset.countPrefix || "";
  const suffix = item.dataset.countSuffix || "";
  const duration = 1200;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    item.textContent = `${prefix}${formatCount(target * eased)}${suffix}`;

    if (progress < 1) {
      window.requestAnimationFrame(tick);
    } else {
      item.textContent = `${prefix}${formatCount(target)}${suffix}`;
    }
  }

  window.requestAnimationFrame(tick);
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px 60px" }
  );

  revealItems.forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 35}ms`);
    revealObserver.observe(item);
  });

  window.addEventListener("load", () => {
    setTimeout(() => {
      revealItems.forEach((item) => {
        if (item.getBoundingClientRect().top < window.innerHeight * 1.1) {
          item.classList.add("is-visible");
        }
      });
    }, 450);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

/* Editor de HubSpot: al editar un módulo se re-renderiza su HTML sin volver a ejecutar
   este script, así que sus [data-reveal] quedarían en opacity:0 (sección en blanco).
   Este MutationObserver los revela apenas se insertan. En el sitio publicado no se
   insertan [data-reveal] en runtime, así que la animación de scroll no cambia. */
if ("MutationObserver" in window) {
  const revealAdded = (node) => {
    if (node.nodeType !== 1) return;
    if (node.matches && node.matches("[data-reveal]")) node.classList.add("is-visible");
    if (node.querySelectorAll) {
      node.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => el.classList.add("is-visible"));
    }
  };
  new MutationObserver((mutations) => {
    mutations.forEach((m) => m.addedNodes.forEach(revealAdded));
  }).observe(document.body, { childList: true, subtree: true });
}

if ("IntersectionObserver" in window) {
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.45 }
  );

  countItems.forEach((item) => countObserver.observe(item));
} else {
  countItems.forEach(animateCount);
}

document.querySelectorAll(".program-scroller").forEach((scroller) => {
  const section = scroller.closest(".programs");
  const originalCards = Array.from(scroller.querySelectorAll(".program-card"));
  const dots = section?.querySelector(".dots");
  const [prevButton, nextButton] = section ? Array.from(section.querySelectorAll(".arrow-buttons button")) : [];
  const totalOriginal = originalCards.length;

  if (!totalOriginal) return;

  /* --- Clone all cards and append for seamless infinite loop --- */
  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.classList.add("is-clone");
    scroller.appendChild(clone);
  });

  const allCards = Array.from(scroller.querySelectorAll(".program-card"));

  function getStep() {
    const first = allCards[0];
    if (!first) return 0;
    const gap = parseFloat(getComputedStyle(scroller).columnGap || getComputedStyle(scroller).gap) || 0;
    return first.getBoundingClientRect().width + gap;
  }

  /* The scroll boundary where originals end and clones begin */
  function getLoopPoint() {
    return getStep() * totalOriginal;
  }

  function getCurrentIndex() {
    const step = getStep();
    if (!step) return 0;
    return Math.round(scroller.scrollLeft / step);
  }

  function getCanonicalIndex() {
    return ((getCurrentIndex() % totalOriginal) + totalOriginal) % totalOriginal;
  }

  /* --- Reset scroll when entering clone territory --- */
  let isResetting = false;

  function checkLoop() {
    if (isResetting) return;
    const step = getStep();
    const loopPoint = getLoopPoint();

    if (scroller.scrollLeft >= loopPoint) {
      isResetting = true;
      scroller.style.scrollBehavior = "auto";
      scroller.scrollLeft = scroller.scrollLeft - loopPoint;
      scroller.style.scrollBehavior = "";
      isResetting = false;
    } else if (scroller.scrollLeft < 0) {
      isResetting = true;
      scroller.style.scrollBehavior = "auto";
      scroller.scrollLeft = scroller.scrollLeft + loopPoint;
      scroller.style.scrollBehavior = "";
      isResetting = false;
    }
  }

  /* --- Dots (only for original cards) --- */
  function updateDots() {
    if (!dots) return;
    const canon = getCanonicalIndex();
    dots.querySelectorAll("button").forEach((dot, i) => {
      dot.classList.toggle("active", i === canon);
      dot.setAttribute("aria-current", i === canon ? "true" : "false");
    });
  }

  if (dots && totalOriginal) {
    dots.replaceChildren();
    originalCards.forEach((card, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Ver ${card.querySelector("h3")?.textContent || `licenciatura ${index + 1}`}`);
      dot.addEventListener("click", () => scrollToIndex(index));
      dots.appendChild(dot);
    });
    updateDots();
  }

  /* --- Scroll to a given index (smooth) --- */
  function scrollToIndex(index) {
    const step = getStep();
    scroller.scrollTo({ left: step * index, behavior: "smooth" });
  }

  /* --- Infinite arrow navigation --- */
  prevButton?.addEventListener("click", () => {
    const current = getCurrentIndex();
    if (current <= 0) {
      /* Jump to clone zone end, then animate back */
      isResetting = true;
      scroller.style.scrollBehavior = "auto";
      scroller.scrollLeft = getLoopPoint() + scroller.scrollLeft;
      scroller.style.scrollBehavior = "";
      isResetting = false;
      requestAnimationFrame(() => scrollToIndex(totalOriginal - 1));
    } else {
      scrollToIndex(current - 1);
    }
  });

  nextButton?.addEventListener("click", () => {
    scrollToIndex(getCurrentIndex() + 1);
  });

  /* --- On scroll: update dots + check loop boundary --- */
  scroller.addEventListener("scroll", () => {
    window.requestAnimationFrame(() => {
      checkLoop();
      updateDots();
    });
  });
});

const eventList = document.querySelector(".event-list");
const eventItems = eventList ? Array.from(eventList.querySelectorAll("article")) : [];
const eventDots = document.querySelector(".event-dots");
const eventPrev = document.querySelector(".event-prev");
const eventNext = document.querySelector(".event-next");
const eventFilterButtons = document.querySelectorAll(".event-tags button[data-filter]");
const eventsPerPage = 3;
let activeEventPage = 0;
let activeEventFilter = "all";
let filteredEventItems = eventItems;

function renderEventPage(page) {
  if (!eventList || !eventDots || eventItems.length === 0) return;

  const totalPages = Math.max(1, Math.ceil(filteredEventItems.length / eventsPerPage));
  activeEventPage = (page + totalPages) % totalPages;
  const start = activeEventPage * eventsPerPage;
  const end = start + eventsPerPage;
  const visibleItems = filteredEventItems.slice(start, end);

  eventItems.forEach((item) => {
    item.hidden = !visibleItems.includes(item);
  });

  eventDots.querySelectorAll("button").forEach((dot, index) => {
    dot.classList.toggle("is-active", index === activeEventPage);
    dot.setAttribute("aria-current", index === activeEventPage ? "true" : "false");
  });

  eventPrev?.toggleAttribute("disabled", totalPages <= 1);
  eventNext?.toggleAttribute("disabled", totalPages <= 1);
}

function syncEventDots() {
  if (!eventDots) return;

  const totalEventPages = Math.ceil(filteredEventItems.length / eventsPerPage);
  eventDots.replaceChildren();
  for (let index = 0; index < totalEventPages; index += 1) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ver página ${index + 1} de eventos`);
    dot.addEventListener("click", () => renderEventPage(index));
    eventDots.appendChild(dot);
  }
}

function applyEventFilter(filter) {
  activeEventFilter = filter;
  filteredEventItems = filter === "all"
    ? eventItems
    : eventItems.filter((item) => item.dataset.tags?.split(" ").includes(filter));

  eventFilterButtons.forEach((button) => {
    const isActive = button.dataset.filter === activeEventFilter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  syncEventDots();
  renderEventPage(0);
}

if (eventList && eventDots && eventItems.length) {
  eventFilterButtons.forEach((button) => {
    button.addEventListener("click", () => applyEventFilter(button.dataset.filter || "all"));
  });
  eventPrev?.addEventListener("click", () => renderEventPage(activeEventPage - 1));
  eventNext?.addEventListener("click", () => renderEventPage(activeEventPage + 1));
  applyEventFilter("all");
}

/* ===== STORIES VERTICAL SLIDER (responsive) ===== */
(function () {
  const track = document.querySelector(".stories-track");
  const viewport = document.querySelector(".stories-viewport");
  if (!track || !viewport) return;

  const arrows = document.querySelectorAll(".story-arrows button");
  if (!arrows.length) return;

  const gap = 20;
  const origRows = Array.from(track.querySelectorAll(".stories-row"));
  const totalOriginal = origRows.length;

  function getVisibleRows() {
    return window.innerWidth <= 640 ? 1 : 2;
  }

  let visibleRows = getVisibleRows();
  let current = visibleRows;
  let isTransitioning = false;

  function buildClones() {
    // Remove existing clones
    track.querySelectorAll("[data-clone]").forEach((c) => c.remove());

    // Clone first N at end, last N at start
    origRows.slice(0, visibleRows).forEach((r) => {
      const clone = r.cloneNode(true);
      clone.setAttribute("data-clone", "true");
      track.appendChild(clone);
    });
    origRows.slice(-visibleRows).reverse().forEach((r) => {
      const clone = r.cloneNode(true);
      clone.setAttribute("data-clone", "true");
      track.insertBefore(clone, track.firstChild);
    });
  }

  function getAllRows() {
    return Array.from(track.querySelectorAll(".stories-row"));
  }

  function getOffsetY(index) {
    const rows = getAllRows();
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += rows[i].offsetHeight + gap;
    }
    return offset;
  }

  function getVisibleHeight(index) {
    const rows = getAllRows();
    let h = 0;
    for (let i = 0; i < visibleRows; i++) {
      if (rows[index + i]) {
        h += rows[index + i].offsetHeight;
        if (i < visibleRows - 1) h += gap;
      }
    }
    return h;
  }

  function updateViewportHeight() {
    viewport.style.height = getVisibleHeight(current) + "px";
  }

  function jumpTo(index) {
    track.style.transition = "none";
    current = index;
    track.style.transform = `translateY(-${getOffsetY(current)}px)`;
    void track.offsetHeight;
    track.style.transition = "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)";
    updateViewportHeight();
  }

  function slideTo(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    current = index;
    track.style.transform = `translateY(-${getOffsetY(current)}px)`;
    updateViewportHeight();
  }

  track.addEventListener("transitionend", (e) => {
    if (e.propertyName !== "transform") return;
    isTransitioning = false;
    if (current >= totalOriginal + visibleRows) {
      jumpTo(visibleRows);
    }
    if (current < visibleRows) {
      jumpTo(totalOriginal + current);
    }
  });

  function init() {
    visibleRows = getVisibleRows();
    buildClones();
    current = visibleRows;
    jumpTo(visibleRows);
  }

  /* Delay init so real devices finish layout before reading heights */
  requestAnimationFrame(() => {
    setTimeout(init, 100);
  });

  /* Recalculate once everything (images/fonts) is fully loaded */
  window.addEventListener("load", () => {
    requestAnimationFrame(() => jumpTo(current));
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newVisible = getVisibleRows();
      if (newVisible !== visibleRows) {
        init();
      } else {
        updateViewportHeight();
        jumpTo(current);
      }
    }, 200);
  });

  arrows[0].addEventListener("click", () => slideTo(current - 1));
  arrows[1].addEventListener("click", () => slideTo(current + 1));
})();

/* ===== HERO VIDEO STAGGER ===== */
document.querySelectorAll("video[data-offset]").forEach((v) => {
  v.addEventListener("loadedmetadata", () => {
    v.currentTime = parseFloat(v.dataset.offset) || 0;
  }, { once: true });
});

/* ===== YOUTUBE LAZY-LOAD ===== */
document.querySelectorAll("[data-yt-id]").forEach((card) => {
  const btn = card.querySelector(".video-play-btn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const id = card.dataset.ytId;
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    iframe.title = "YouTube video";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.style.border = "0";
    card.innerHTML = "";
    card.appendChild(iframe);
  });
});

/* ── Experience dots: fade out after 60% scroll ── */
(() => {
  const section = document.querySelector(".experience");
  if (!section) return;

  let ticking = false;

  function updateDotsOpacity() {
    // Only apply on desktop/LG (>1180px)
    if (window.innerWidth <= 1180) {
      section.style.removeProperty("--dots-opacity");
      return;
    }

    const rect = section.getBoundingClientRect();
    const sectionH = section.offsetHeight;
    const scrolled = -rect.top; // how far we've scrolled into the section
    const progress = Math.max(0, Math.min(1, scrolled / sectionH));

    if (progress <= 0.6) {
      section.style.setProperty("--dots-opacity", "0.78");
    } else {
      // Fade from 0.78 to 0 between 60% and 100%
      const fadeProgress = (progress - 0.6) / 0.4;
      const opacity = 0.78 * (1 - fadeProgress);
      section.style.setProperty("--dots-opacity", String(Math.max(0, opacity).toFixed(3)));
    }
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateDotsOpacity();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateDotsOpacity();
})();

/* ===== OFERTA ACADÉMICA (carrusel áreas + buscador/filtro) ===== */
(function(){
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
  let lastSearchTerm = null; /* último término aplicado → evita búsquedas duplicadas */

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
    lastSearchTerm = getFilterValues().search;
    renderPage();
  }

  /* Debounce reutilizable: agrupa pulsaciones rápidas en una sola búsqueda. */
  function debounce(fn, delay) {
    let timer;
    const debounced = (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
    debounced.cancel = () => clearTimeout(timer);
    return debounced;
  }

  /* Search events */
  searchBtn?.addEventListener("click", applyProgramFilters);
  searchInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") applyProgramFilters();
  });

  /* Live search: filtra en tiempo real mientras se escribe (debounce 300 ms).
     No re-renderiza si el término efectivo no cambió (evita consultas duplicadas).
     Enter y el botón Buscar (arriba) siguen funcionando como disparadores inmediatos. */
  const runLiveSearch = () => {
    if (getFilterValues().search === lastSearchTerm) return;
    applyProgramFilters();
  };
  const debouncedLiveSearch = debounce(runLiveSearch, 300);
  searchInput?.addEventListener("input", () => {
    if (searchInput.value.trim() === "") {
      /* Campo vacío → restablece de inmediato al estado inicial, sin esperar el debounce */
      debouncedLiveSearch.cancel();
      if (lastSearchTerm !== "") applyProgramFilters();
    } else {
      debouncedLiveSearch();
    }
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

})();
