const revealItems = document.querySelectorAll(
  "[data-reveal], .reveal-title, hr, article, .stat, .thanks span, .network, .manifesto-line"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");

      if (entry.target.classList.contains("stat")) {
        const number = entry.target.querySelector("[data-count]");
        if (number && !number.dataset.done) animateCounter(number);
      }

      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.22,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 4, 3) * 0.08}s`;
  observer.observe(item);
});

function animateCounter(element) {
  const target = Number(element.dataset.count);
  const duration = 1200;
  const start = performance.now();

  element.dataset.done = "true";

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    element.textContent = Math.round(target * eased);

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}
