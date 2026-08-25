(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  document.querySelectorAll("[data-toast]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      if (el.getAttribute("href") === "#") e.preventDefault();
      showToast(el.getAttribute("data-toast"));
    });
  });

  var filters = document.querySelectorAll(".filter-bar button");
  var cards = document.querySelectorAll("[data-kind]");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filters.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var kind = btn.getAttribute("data-filter");
      cards.forEach(function (card) {
        var item = card.getAttribute("data-kind");
        var show = kind === "all" || item === kind || (kind === "award" && (item === "frame" || item === "order"));
        card.style.display = show ? "" : "none";
      });
    });
  });

  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      showToast("留言已记录");
      form.reset();
    });
  }

  function showToast(text) {
    var toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () { toast.classList.remove("show"); }, 2200);
  }

  stripHostWidgets();
})();

function stripHostWidgets() {
  var sel = "[data-shangma-branding],[data-shangma-report-modal],.upma-micro-widget";
  function sweep() {
    document.querySelectorAll(sel).forEach(function (el) {
      el.remove();
    });
  }
  sweep();
  [200, 800, 2000, 5000].forEach(function (ms) {
    setTimeout(sweep, ms);
  });
  if (window.MutationObserver) {
    new MutationObserver(sweep).observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }
}
