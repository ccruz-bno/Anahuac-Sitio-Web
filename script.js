const body = document.body;
body.classList.add("ready");

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

/* ===== STORIES VERTICAL SLIDER (infinite) ===== */
(function () {
  const track = document.querySelector(".stories-track");
  const viewport = document.querySelector(".stories-viewport");
  if (!track || !viewport) return;

  const arrows = document.querySelectorAll(".story-arrows button");
  if (!arrows.length) return;

  const gap = 20;
  const visibleRows = 2;
  const origRows = Array.from(track.querySelectorAll(".stories-row"));
  const totalOriginal = origRows.length;

  /* Clone first N rows at the end, last N at the start */
  origRows.slice(0, visibleRows).forEach((r) => {
    track.appendChild(r.cloneNode(true));
  });
  origRows.slice(-visibleRows).reverse().forEach((r) => {
    track.insertBefore(r.cloneNode(true), track.firstChild);
  });

  const allRows = track.querySelectorAll(".stories-row");
  /* Start at the first real row (after the prepended clones) */
  let current = visibleRows;
  let isTransitioning = false;

  function getRowH() {
    return allRows[0].offsetHeight;
  }

  function jumpTo(index) {
    track.style.transition = "none";
    current = index;
    track.style.transform = `translateY(-${current * (getRowH() + gap)}px)`;
    /* Force reflow so the browser registers the jump */
    void track.offsetHeight;
    track.style.transition = "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)";
  }

  function slideTo(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    current = index;
    track.style.transform = `translateY(-${current * (getRowH() + gap)}px)`;
  }

  track.addEventListener("transitionend", () => {
    isTransitioning = false;
    /* If we scrolled into the cloned region at the end, jump to real start */
    if (current >= totalOriginal + visibleRows) {
      jumpTo(visibleRows);
    }
    /* If we scrolled into the cloned region at the start, jump to real end */
    if (current < visibleRows) {
      jumpTo(totalOriginal + current);
    }
  });

  /* Initial position (no animation) */
  jumpTo(visibleRows);

  /* ↑ = prev, ↓ = next */
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
