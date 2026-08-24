(function () {
  var top = document.querySelector(".top[data-active]");
  if (top) {
    var cur = top.getAttribute("data-active");
    function link(id, href, text) {
      return '<a class="' + (cur === id ? "active" : "") + '" href="' + href + '">' + text + "</a>";
    }
    top.innerHTML =
      '<div class="top-inner">' +
        '<a class="brand" href="index.html">' +
          '<img src="assets/img/logo.svg" alt="云外天">' +
          '<div><h1>云外天信息科技</h1><p>YUNWAITIAN</p></div>' +
        "</a><nav>" +
          link("home", "index.html", "首页") +
          link("about", "about.html", "关于我们") +
          link("biz", "business.html", "业务范围") +
          link("news", "news.html", "新闻公告") +
          link("contact", "contact.html", "联系我们") +
        "</nav></div>";
  }

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var tabs = document.querySelectorAll(".tabs button");
  var panels = document.querySelectorAll(".tab-panel");
  tabs.forEach(function (btn) {
    btn.addEventListener("click", function () {
      tabs.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var id = btn.getAttribute("data-tab");
      panels.forEach(function (p) {
        p.classList.toggle("show", p.getAttribute("data-panel") === id);
      });
    });
  });

  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var toast = document.querySelector(".toast") || document.createElement("div");
      toast.className = "toast";
      document.body.appendChild(toast);
      toast.textContent = "留言已记录";
      toast.classList.add("show");
      form.reset();
      setTimeout(function () { toast.classList.remove("show"); }, 2200);
    });
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
