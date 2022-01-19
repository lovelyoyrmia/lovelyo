// about section tab
(() => {
  const aboutSection = document.querySelector(".about-section");
  var tabsContainer = document.querySelector(".about-tabs");

  tabsContainer.addEventListener("click", () => {
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

// function bodyScrollingToggle() {
//   document.body.classList.toggle("stop-scrolling");
// }

// portfolio filer and popup

(() => {
  const filterContainer = document.querySelector(".project-filter");
  const projectItemsContainer = document.querySelector(".project-items");
  const projectItems = document.querySelectorAll(".project-item");
  const popup = document.querySelector(".project-popup");
  const prevBtn = document.querySelector(".pp-prev");
  const nextBtn = document.querySelector(".pp-next");
  const closeBtn = document.querySelector(".pp-close");
  const projectDetailsContainer = document.querySelector(".pp-details");

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
    }
  });

  closeBtn.addEventListener("click", () => {
    popupToggle();
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

  function popupToggle() {
    popup.classList.toggle("open");
  }
  function popupSlideshow() {
    const imgSrc = screenshot[slideIndex];
    const popupImg = popup.querySelector(".pp-img");
    popup.querySelector(".pp-loader").classList.add("active");
    popupImg.src = imgSrc;
    popupImg.onload = () => {
      popup.querySelector(".pp-loader").classList.remove("active");
    };
  }

  nextBtn.addEventListener("click", () => {
    if (slideIndex === screenshot.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    popupSlideshow();
    console.log("slide index:" + slideIndex);
  });

  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = screenshot.length - 1;
    } else {
      slideIndex--;
    }
    popupSlideshow();
    console.log("slide index:" + slideIndex);
  });
})();
