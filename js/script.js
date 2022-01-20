// NAVIGATION MENU

(() => {
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const navMenu = document.querySelector(".nav-menu");
  const closeNav = navMenu.querySelector(".close-nav-menu");

  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNav.addEventListener("click", hideNavMenu);
  function showNavMenu() {
    navMenu.classList.add("open");
  }
  function hideNavMenu() {
    navMenu.classList.remove("open");
    fadeOutEffect();
  }
  function fadeOutEffect() {
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() => {
      document.querySelector(".fade-out-effect").classList.remove("active");
    }, 300);
  }

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("link-item")) {
      if (event.target.hash !== "") {
        event.preventDefault();
        const hash = event.target.hash;
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");
        navMenu
          .querySelector(".active")
          .classList.add("outer-shadow", "hover-in-shadow");
        navMenu
          .querySelector(".active")
          .classList.remove("active", "inner-shadow");

        if (navMenu.classList.contains("open")) {
          event.target.classList.add("active", "inner-shadow");
          event.target.classList.remove("outer-shadow", "hover-in-shadow");
          hideNavMenu();
        } else {
          let navItem = navMenu.querySelectorAll(".link-item");
          navItem.forEach((item) => {
            if (hash === item.hash) {
              item.classList.add("active", "inner-shadow");
              item.classList.remove("outer-shadow", "hover-in-shadow");
            }
          });
          fadeOutEffect();
        }
        window.location.hash = hash;
      }
    }
  });
})();

// ABOUT SECTION TAB
(() => {
  const aboutSection = document.querySelector(".about-section");
  var tabsContainer = document.querySelector(".about-tabs");

  tabsContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("tab-item") &&
      !event.target.classList.contains("active")
    ) {
      const target = event.target.getAttribute("data-target");
      tabsContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      event.target.classList.add("active", "outer-shadow");
      aboutSection
        .querySelector(".tab-content.active")
        .classList.remove("active");
      aboutSection.querySelector(target).classList.add("active");
    }
  });
})();

// portfolio filer and popup

(() => {
  const header = document.querySelector(".header");
  const projectSection = document.querySelector(".projects-section");
  const filterContainer = document.querySelector(".project-filter");
  const projectItemsContainer = document.querySelector(".project-items");
  const projectItems = document.querySelectorAll(".project-item");
  const popup = document.querySelector(".project-popup");
  const prevBtn = document.querySelector(".pp-prev");
  const nextBtn = document.querySelector(".pp-next");
  const closeBtn = document.querySelector(".pp-close");
  const disableClick = document.querySelector(".disable-clicking");

  let itemIndex, slideIndex, screenshot;

  filterContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("filter-item") &&
      !event.target.classList.contains("active")
    ) {
      filterContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");

      event.target.classList.add("active", "outer-shadow");
      const target = event.target.getAttribute("data-target");
      projectItems.forEach((item) => {
        if (target === item.getAttribute("data-category") || target === "all") {
          item.classList.remove("hide");
          item.classList.add("show");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });
    }
  });

  projectItemsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".project-item-inner")) {
      const projectItem = event.target.closest(
        ".project-item-inner"
      ).parentElement;
      itemIndex = Array.from(projectItem.parentElement.children).indexOf(
        projectItem
      );
      screenshot = projectItems[itemIndex]
        .querySelector(".project-item-img img")
        .getAttribute("data-screenshots");
      screenshot = screenshot.split(",");
      if (screenshot.length === 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      } else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      }
      slideIndex = 0;
      popupToggle();
      popupSlideshow();
      popupDetails();
      fixedBody();
    }
  });

  closeBtn.addEventListener("click", () => {
    popupToggle();
    hiddenPopup();
  });

  function popupDetails() {
    if (!projectItems[itemIndex].querySelector(".project-item-details")) {
      return;
    }

    const details = projectItems[itemIndex].querySelector(
      ".project-item-details"
    ).innerHTML;
    popup.querySelector(".pp-project-details").innerHTML = details;
    const title = projectItems[itemIndex].querySelector(
      ".project-item-title"
    ).innerHTML;
    popup.querySelector(".pp-title h2").innerHTML = title;
    const category = projectItems[itemIndex].getAttribute("data-category");
    popup.querySelector(".pp-title p span").innerHTML = category.replace(
      "-",
      " "
    );
  }

  function fixedBody() {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
  }

  function hiddenPopup() {
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  }

  function popupToggle() {
    popup.classList.toggle("open");
    header.classList.toggle("is-blurred");
    projectSection.classList.toggle("is-blurred");
    disableClick.classList.toggle("active");
  }
  function popupSlideshow() {
    const imgSrc = screenshot[slideIndex];
    const popupImg = popup.querySelector(".pp-img");
    popup.querySelector(".pp-loader").classList.add("active");
    popupImg.src = imgSrc;
    popupImg.onload = () => {
      popup.querySelector(".pp-loader").classList.remove("active");
    };
    popup.querySelector(".pp-counter").innerHTML =
      slideIndex + 1 + " of " + screenshot.length;
  }

  nextBtn.addEventListener("click", () => {
    if (slideIndex === screenshot.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    popupSlideshow();
  });

  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = screenshot.length - 1;
    } else {
      slideIndex--;
    }
    popupSlideshow();
  });
})();

(() => {
  let name = document.querySelector(".name");
  let email = document.querySelector(".email");
  let message = document.querySelector(".message");
  let submit = document.querySelector(".submit");

  submit.addEventListener("click", (event) => {
    event.preventDefault();

    if (name.value === "" || email.value === "" || message.value === "") {
      errorMessage();
    } else {
      sendEmail();
    }
  });
  function sendEmail() {
    emailjs.send("service_96qi7vo", "template_glk9wge", {
      from_name: name.value,
      to_name: "Vio",
      message: message.value,
      from_email: email.value,
      to_email: "viomokalu@gmail.com",
    });
    success();
  }
  function success() {
    swal({
      title: "Successfully sent :)",
      text: `Hi ${name.value}, Looks like your message was successfully sent !`,
    });
  }
  function errorMessage() {
    swal({
      title: "I am sorry :(",
      text: "Something went wrong, message could not be sent !",
    });
  }
})();

// HIDE ALL SECTIONS
(() => {
  const sections = document.querySelectorAll(".section");

  sections.forEach((section) => {
    if (!section.classList.contains("active")) {
      section.classList.add("hide");
    }
  });
})();
