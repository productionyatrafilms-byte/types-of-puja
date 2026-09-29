document.documentElement.style.visibility = "hidden";

document.addEventListener("DOMContentLoaded", async () => {
  const pageLoad = document.querySelector(".page-load");
  const title = document.querySelector(".title-1");

  const LANG_KEY = "selectedLanguage";
  const DEFAULT_LANG = "English";

  // ================= LANDSCAPE ALERT =================

let landscapeAlertShown = false;

function checkScreenSize() {
  const isMobile =
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  if (isMobile && window.innerWidth < 768) {
    if (!landscapeAlertShown) {
      landscapeAlertShown = true;
      alert("Please use Landscape!");
    }
  } else {
    landscapeAlertShown = false;
  }
}

window.addEventListener("load", checkScreenSize);
window.addEventListener("resize", checkScreenSize);


  let titleOriginalRect = null;

  // =========================
  // measure original title position
  // =========================
  if (title) {
    title.style.opacity = "0";
    title.style.visibility = "hidden";

    requestAnimationFrame(() => {
      title.style.opacity = "1";
      title.style.visibility = "visible";

      titleOriginalRect = title.getBoundingClientRect();

      title.style.opacity = "0";
      title.style.visibility = "hidden";

      title.classList.add("intro-start");
    });
  }

  // =========================
  // LANGUAGE SWITCHER (gyanpanchami-style radio toggle)
  // =========================
  let translations = typeof data !== "undefined" ? data : null;

  function getSavedLanguage() {
    const savedLang = localStorage.getItem(LANG_KEY);

    if (savedLang && translations?.[savedLang]) {
      return savedLang;
    }

    return DEFAULT_LANG;
  }

  function applyLanguage(lang) {
    const dict = translations?.[lang] || translations?.[DEFAULT_LANG];
    if (!dict) return;

    document.querySelectorAll("[data-lang-key]").forEach((el) => {
      const key = el.getAttribute("data-lang-key");
      if (!key) return;

      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    document.documentElement.setAttribute("lang", lang);
    document.body.setAttribute("data-lang", lang);
  }

  // =========================
  // LANGUAGE AUDIO
  // =========================
  const LANG_AUDIO_SRC = {
    English: "./assets/audio/Eng.mpeg",
    Hindi: "./assets/audio/Hin.mpeg",
    Gujarati: "./assets/audio/Guj.mpeg",
  };

  let currentLangAudio = null;

  function playLanguageAudio(lang) {
    const src = LANG_AUDIO_SRC[lang];
    if (!src) return;

    if (currentLangAudio) {
      currentLangAudio.pause();
      currentLangAudio.currentTime = 0;
      currentLangAudio = null;
    }

    const audio = new Audio(src);
    currentLangAudio = audio;

    audio.play().catch((err) => {
      console.error("Language audio playback failed:", err);
    });
  }

  const langRadios = {
    English: document.getElementById("en"),
    Hindi: document.getElementById("hi"),
    Gujarati: document.getElementById("gu"),
  };

  function setLang(lang, { save = true, playAudio = false } = {}) {
    const radio = langRadios[lang];
    if (radio) radio.checked = true;

    applyLanguage(lang);

    if (save) {
      localStorage.setItem(LANG_KEY, lang);
    }

    if (playAudio) {
      playLanguageAudio(lang);
    }
  }

  Object.entries(langRadios).forEach(([lang, radio]) => {
    radio?.addEventListener("click", () => {
      setLang(lang, { save: true, playAudio: true });
    });
  });

  const savedLang = getSavedLanguage();
  setLang(savedLang, { save: false, playAudio: false });

  document.documentElement.style.visibility = "";

  // =========================
  // PAGE LOADER TIMELINE
  // =========================
  setTimeout(() => {
    if (pageLoad) {
      pageLoad.classList.add("stretch");
    }

    if (title) {
      title.style.opacity = "1";
      title.style.visibility = "visible";
    }
  }, 3000);

  setTimeout(() => {
    if (pageLoad) {
      pageLoad.classList.add("fade-out");
    }

    if (title && titleOriginalRect) {
      title.style.top = `${titleOriginalRect.top + titleOriginalRect.height / 2}px`;
      title.style.left = `${titleOriginalRect.left + titleOriginalRect.width / 2}px`;
      title.style.transform = "translate(-50%, -50%) scale(1)";
    }
  }, 3200);

  setTimeout(() => {
    if (pageLoad) {
      pageLoad.style.display = "none";
    }
  }, 4500);

  setTimeout(() => {
    if (title) {
      title.classList.remove("intro-start");
      title.style.top = "";
      title.style.left = "";
      title.style.transform = "";
      title.style.opacity = "1";
      title.style.visibility = "visible";
    }

    document.body.classList.add("page-ready", "main-visible");

    setTimeout(() => {
      playActiveSlideAnimation();
      updateNav();
    }, 100);
  }, 5200);

  // =========================
  // SWIPER
  // =========================
  const swiper = new Swiper(".pujaSwiper", {
    loop: false,
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 600,

    pagination: {
      el: ".pujaSwiper .swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".pujaSwiper .next-btn",
      prevEl: ".pujaSwiper .prev-btn",
    },

    grabCursor: true,
  });

  const prevBtn = document.querySelector(".pujaSwiper .prev-btn");
  const nextBtn = document.querySelector(".pujaSwiper .next-btn");

  function updateNav() {
    const isFirst = swiper.isBeginning;
    const isLast = swiper.isEnd;

    if (prevBtn) {
      prevBtn.classList.toggle("is-disabled", isFirst);
      prevBtn.setAttribute("aria-disabled", isFirst ? "true" : "false");
    }

    if (nextBtn) {
      nextBtn.classList.toggle("is-disabled", isLast);
      nextBtn.setAttribute("aria-disabled", isLast ? "true" : "false");
    }
  }

  // =========================
  // SLIDE ANIMATION
  // =========================
  let animationTimers = [];

  function clearAnimationTimers() {
    animationTimers.forEach((id) => clearTimeout(id));
    animationTimers = [];
  }

  function resetSlide(slide) {
    if (!slide) return;

    slide.classList.remove("animate-in", "show-second", "show-wrap");

    const img1 = slide.querySelector(".swiper-slide-img-1");
    const img2 = slide.querySelector(".swiper-slide-img-2");
    const wrap = slide.querySelector(".wrap");

    if (img1) {
      img1.style.display = "block";
      img1.style.animation = "none";
    }

    if (img2) {
      img2.style.display = "none";
      img2.style.animation = "none";
      img2.style.width = "3vw";
    }

    if (wrap) {
      wrap.style.display = "none";
    }

    void slide.offsetWidth;

    if (img1) img1.style.animation = "";
    if (img2) img2.style.animation = "";
    if (wrap) wrap.style.display = "";
  }

  function resetAllSlides() {
    document.querySelectorAll(".pujaSwiper .swiper-slide").forEach((slide) => {
      resetSlide(slide);
    });
  }

  function playActiveSlideAnimation() {
    clearAnimationTimers();
    resetAllSlides();

    const activeSlide = swiper.slides[swiper.activeIndex];
    if (!activeSlide) return;

    const img1 = activeSlide.querySelector(".swiper-slide-img-1");
    const img2 = activeSlide.querySelector(".swiper-slide-img-2");

    void activeSlide.offsetWidth;

    activeSlide.classList.add("animate-in");

    animationTimers.push(
      setTimeout(() => {
        if (!activeSlide.classList.contains("swiper-slide-active")) return;
        activeSlide.classList.add("show-second");
        if (img2) img2.style.display = "block";
      }, 500),
    );

    animationTimers.push(
      setTimeout(() => {
        if (!activeSlide.classList.contains("swiper-slide-active")) return;
        if (img1) img1.style.display = "none";
      }, 750),
    );

    animationTimers.push(
      setTimeout(() => {
        if (!activeSlide.classList.contains("swiper-slide-active")) return;
        activeSlide.classList.add("show-wrap");
      }, 850),
    );
  }

  setTimeout(() => {
    playActiveSlideAnimation();
    updateNav();
  }, 0);

  swiper.on("slideChangeTransitionStart", () => {
    clearAnimationTimers();
    updateNav();
  });

  swiper.on("slideChangeTransitionEnd", () => {
    playActiveSlideAnimation();
    updateNav();
  });

  swiper.on("reachBeginning", updateNav);
  swiper.on("reachEnd", updateNav);
  swiper.on("fromEdge", updateNav);
});