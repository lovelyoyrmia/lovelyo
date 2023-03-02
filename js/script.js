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

// FETCH ABOUT SECTION
(() => {
  const skillsContainer = document.querySelector(".skills");
  const experienceContainer = document.querySelector(".experience");
  const timelineEx = experienceContainer.querySelector(".timeline");
  const educationContainer = document.querySelector(".education");
  const timelineEd = educationContainer.querySelector(".timeline");

  try {
    fetch("http://ec2-18-141-174-30.ap-southeast-1.compute.amazonaws.com/about/")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          alert(res.status);
        }
      })
      .then((data) => {
        const skills = data.about["skills"];
        const experience = data.about["experience"];
        const education = data.about["education"];

        const skillRow = [];
        const skillItem = [];
        const skillTitle = [];
        const skillProgress = [];
        const skillProgressBar = [];
        const skillSpan = [];

        const experienceRow = [];
        const experienceTimelineItem = [];
        const experienceTimelineItemInner = [];
        const experienceSpan = [];
        const experienceH3 = [];
        const experienceH4 = [];
        const experienceP = [];

        const educationRow = [];
        const educationTimelineItem = [];
        const educationTimelineItemInner = [];
        const educationSpan = [];
        const educationH3 = [];
        const educationH4 = [];
        const educationP = [];

        // SKILL SECTION
        let index = 0;
        for (let i = 0; i < 4; i++) {
          skillRow[i] = document.createElement("div");
          skillRow[i].classList.add("row");
          for (let j = 0; j < skills.length; j++) {
            if (j < 2) {
              index++;
              skillItem[index] = document.createElement("div");
              skillItem[index].classList.add("skill-item");
              skillTitle[index] = document.createElement("p");
              skillTitle[index].innerHTML = skills[index - 1]["skill_title"];

              skillProgress[index] = document.createElement("div");
              skillProgress[index].classList.add("progress", "inner-shadow");

              skillProgressBar[index] = document.createElement("div");
              skillProgressBar[index].classList.add("progress-bar");
              skillProgressBar[index].style.width = skills[index - 1]["width"];

              skillSpan[index] = document.createElement("span");
              skillSpan[index].innerHTML = skills[index - 1]["percent"];

              skillRow[i].appendChild(skillItem[index]);
              skillItem[index].appendChild(skillTitle[index]);
              skillItem[index].appendChild(skillProgress[index]);
              skillProgress[index].appendChild(skillProgressBar[index]);
              skillItem[index].appendChild(skillSpan[index]);
            }
          }
          skillsContainer.appendChild(skillRow[i]);
        }

        // EXPERIENCE SECTION
        for (let i = 0; i < experience.length; i++) {
          experienceRow[i] = document.createElement("div");
          experienceRow[i].classList.add("row", experience[i]["row"]);
          experienceTimelineItem[i] = document.createElement("div");
          experienceTimelineItem[i].classList.add(
            "timeline-item",
            "inner-shadow"
          );
          experienceTimelineItemInner[i] = document.createElement("div");
          experienceTimelineItemInner[i].classList.add(
            "timeline-item-inner",
            "outer-shadow"
          );

          experienceSpan[i] = document.createElement("span");
          experienceSpan[i].innerHTML = experience[i]["date"];
          experienceH3[i] = document.createElement("h3");
          experienceH3[i].innerHTML = experience[i]["title"];
          experienceH4[i] = document.createElement("h4");
          experienceH4[i].innerHTML = experience[i]["company"];
          experienceP[i] = document.createElement("p");
          experienceP[i].innerHTML = experience[i]["description"];

          timelineEx.appendChild(experienceRow[i]);
          experienceRow[i].appendChild(experienceTimelineItem[i]);
          experienceTimelineItem[i].appendChild(experienceTimelineItemInner[i]);
          experienceTimelineItemInner[i].appendChild(experienceSpan[i]);
          experienceTimelineItemInner[i].appendChild(experienceH3[i]);
          experienceTimelineItemInner[i].appendChild(experienceH4[i]);
          experienceTimelineItemInner[i].appendChild(experienceP[i]);
        }

        // EDUCATION SECTION
        for (let i = 0; i < education.length; i++) {
          educationRow[i] = document.createElement("div");
          educationRow[i].classList.add("row", education[i]["row"]);
          educationTimelineItem[i] = document.createElement("div");
          educationTimelineItem[i].classList.add(
            "timeline-item",
            "inner-shadow"
          );
          educationTimelineItemInner[i] = document.createElement("div");
          educationTimelineItemInner[i].classList.add(
            "timeline-item-inner",
            "outer-shadow"
          );

          educationSpan[i] = document.createElement("span");
          educationSpan[i].innerHTML = education[i]["date"];
          educationH3[i] = document.createElement("h3");
          educationH3[i].innerHTML = education[i]["student_title"];
          educationH4[i] = document.createElement("h4");
          educationH4[i].innerHTML = education[i]["school_name"];
          educationP[i] = document.createElement("p");
          educationP[i].innerHTML = education[i]["description"];

          timelineEd.appendChild(educationRow[i]);
          educationRow[i].appendChild(educationTimelineItem[i]);
          educationTimelineItem[i].appendChild(educationTimelineItemInner[i]);
          educationTimelineItemInner[i].appendChild(educationSpan[i]);
          educationTimelineItemInner[i].appendChild(educationH3[i]);
          educationTimelineItemInner[i].appendChild(educationH4[i]);
          educationTimelineItemInner[i].appendChild(educationP[i]);
        }
      });
  } catch (error) {
    alert(error);
  }
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

// SERVICES SECTION
(() => {
  const servicesSection = document.querySelector(".service-section");
  const servicesContainer = servicesSection.querySelector(".container");
  try {
    fetch("http://ec2-18-141-174-30.ap-southeast-1.compute.amazonaws.com/services/")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          alert(res.status);
        }
      })
      .then((data) => {
        const service = data.services;
        const serviceItem = [];
        const serviceItemInner = [];
        const serviceIconContainer = [];
        const serviceIcon = [];
        const serviceTitle = [];
        const serviceDescription = [];
        let serviceRow = [];

        serviceRow = document.createElement("div");
        serviceRow.className = "row";
        servicesContainer.appendChild(serviceRow);

        for (let i = 0; i < service.length; i++) {
          serviceItem[i] = document.createElement("div");
          serviceItem[i].classList.add("service-item");

          serviceItemInner[i] = document.createElement("div");
          serviceItemInner[i].classList.add(
            "service-item-inner",
            "outer-shadow"
          );
          serviceIconContainer[i] = document.createElement("div");
          serviceIconContainer[i].classList.add("icon", "inner-shadow");
          serviceIcon[i] = document.createElement("i");
          if (i == 3) {
            serviceIcon[i].classList.add("fab", service[i]["icon"]);
          } else {
            serviceIcon[i].classList.add("fas", service[i]["icon"]);
          }
          serviceTitle[i] = document.createElement("h3");
          serviceTitle[i].innerHTML = service[i]["title"];
          serviceDescription[i] = document.createElement("p");
          serviceDescription[i].innerHTML = service[i]["description"];

          serviceRow.appendChild(serviceItem[i]);
          serviceItem[i].appendChild(serviceItemInner[i]);
          serviceItemInner[i].appendChild(serviceIconContainer[i]);
          serviceIconContainer[i].appendChild(serviceIcon[i]);
          serviceItemInner[i].appendChild(serviceTitle[i]);
          serviceItemInner[i].appendChild(serviceDescription[i]);
        }
      });
  } catch (error) {
    alert(error);
  }
})();

// FETCH PROJECTS SECTION
(() => {
  const projectItems = document.querySelector(".row.project-items");

  try {
    fetch("http://ec2-18-141-174-30.ap-southeast-1.compute.amazonaws.com/projects/")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          alert(res.status);
        }
      })
      .then((data) => {
        const projectItem = [];
        const projectItemInner = [];
        const projectsItemImg = [];
        const image = [];
        const spanImage = [];
        const projectItemTitle = [];
        const projectItemDetails = [];
        const row = [];
        const divDesc = [];
        const divDescTitle = [];
        const divDescParagraph = [];
        const divInfo = [];
        const divInfoTitle = [];
        const infoUl = [];
        const infoLiTitle = [];
        const infoSpan = [];
        const infoLiTools = [];
        const infoToolsSpan = [];
        const infoLiLink = [];
        const infoLinkSpan = [];
        const infoLinkWeb = [];

        const lenProjects = data.projects.length;

        for (let i = 0; i < lenProjects; i++) {
          const dataProject = data.projects[i];
          projectItem[i] = document.createElement("div");
          projectItem[i].classList.add("project-item");
          projectItem[i].setAttribute("data-category", dataProject["category"]);
          projectItemInner[i] = document.createElement("div");
          projectItemInner[i].classList.add(
            "project-item-inner",
            "outer-shadow"
          );
          projectsItemImg[i] = document.createElement("div");
          projectsItemImg[i].classList.add("project-item-img");
          image[i] = document.createElement("img");
          image[i].src = dataProject["image_path"];
          image[i].alt = i.toString();
          image[i].setAttribute(
            "data-screenshots",
            dataProject["image_list"].join(",")
          );
          spanImage[i] = document.createElement("span");
          spanImage[i].classList.add("view-project");
          spanImage[i].innerHTML = "view project";
          projectItemTitle[i] = document.createElement("p");
          projectItemTitle[i].classList.add("project-item-title");
          projectItemTitle[i].innerHTML = dataProject["project_name"];
          projectItemDetails[i] = document.createElement("div");
          projectItemDetails[i].classList.add("project-item-details");
          row[i] = document.createElement("div");
          row[i].classList.add("row");
          divDesc[i] = document.createElement("div");
          divDesc[i].classList.add("description");
          divDescTitle[i] = document.createElement("h3");
          divDescTitle[i].innerHTML = "Description";
          divDescParagraph[i] = document.createElement("p");
          divDescParagraph[i].innerHTML = dataProject["description"];
          divInfo[i] = document.createElement("div");
          divInfo[i].classList.add("info");
          divInfoTitle[i] = document.createElement("h3");
          divInfoTitle[i].innerHTML = "Info";
          infoUl[i] = document.createElement("ul");
          infoLiTitle[i] = document.createElement("li");
          infoSpan[i] = document.createElement("span");
          infoSpan[i].innerHTML = dataProject["date"];
          infoLiTitle[i].innerHTML = "Date - ";
          infoLiTools[i] = document.createElement("li");
          infoLiTools[i].innerHTML = "Tools - ";
          infoToolsSpan[i] = document.createElement("span");
          infoToolsSpan[i].innerHTML = dataProject["tools"];
          infoLiLink[i] = document.createElement("li");
          infoLiLink[i].innerHTML = "Web - ";
          infoLinkSpan[i] = document.createElement("span");
          infoLinkWeb[i] = document.createElement("a");
          infoLinkWeb[i].href = dataProject["link_web"];
          infoLinkWeb[i].target = "_blank";
          infoLinkWeb[i].rel = "noopener noreferrer";
          infoLinkWeb[i].innerHTML = "Click Here";

          projectItems.appendChild(projectItem[i]);
          projectItem[i].appendChild(projectItemInner[i]);
          projectItemInner[i].appendChild(projectsItemImg[i]);
          projectsItemImg[i].appendChild(image[i]);
          projectsItemImg[i].appendChild(spanImage[i]);
          projectItemInner[i].appendChild(projectItemTitle[i]);
          projectItemInner[i].appendChild(projectItemDetails[i]);
          projectItemDetails[i].appendChild(row[i]);
          row[i].appendChild(divDesc[i]);
          divDesc[i].appendChild(divDescTitle[i]);
          divDesc[i].appendChild(divDescParagraph[i]);
          row[i].appendChild(divInfo[i]);
          divInfo[i].appendChild(divInfoTitle[i]);
          divInfo[i].appendChild(infoUl[i]);
          infoUl[i].appendChild(infoLiTitle[i]);
          infoLiTitle[i].appendChild(infoSpan[i]);
          infoUl[i].appendChild(infoLiTools[i]);
          infoLiTools[i].appendChild(infoToolsSpan[i]);
          infoUl[i].appendChild(infoLiLink[i]);
          infoLiLink[i].appendChild(infoLinkSpan[i]);
          infoLinkSpan[i].appendChild(infoLinkWeb[i]);
        }

        const header = document.querySelector(".header");
        const projectSection = document.querySelector(".projects-section");
        const filterContainer = document.querySelector(".project-filter");
        const projectItemsContainer = document.querySelector(".project-items");
        const project = document.querySelectorAll(".project-item");
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
            project.forEach((item) => {
              if (
                target === item.getAttribute("data-category") ||
                target === "all"
              ) {
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
            screenshot = project[itemIndex]
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
          if (!project[itemIndex].querySelector(".project-item-details")) {
            return;
          }

          const details = project[itemIndex].querySelector(
            ".project-item-details"
          ).innerHTML;
          popup.querySelector(".pp-project-details").innerHTML = details;
          const title = project[itemIndex].querySelector(
            ".project-item-title"
          ).innerHTML;
          popup.querySelector(".pp-title h2").innerHTML = title;
          const category = project[itemIndex].getAttribute("data-category");
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
      });
  } catch (error) {
    alert(error);
  }
})();

// CONTACT SECTION AND SEND EMAIL
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

// COURSES SECTION
(() => {
  const coursesItemContainer = document.querySelector(
    ".courses-slider-container"
  );
  const slideWidth = coursesItemContainer.offsetWidth;
  const prevBtn = document.querySelector(".courses-slider-nav .prev");
  const nextBtn = document.querySelector(".courses-slider-nav .next");

  fetch("http://ec2-18-141-174-30.ap-southeast-1.compute.amazonaws.com/certificates/")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        alert(res.status);
      }
    })
    .then((data) => {
      const coursesItem = [];
      const iconLeft = [];
      const iconRight = [];
      const coursesTitle = [];
      const desc = [];
      const image = [];
      const issuedDate = [];

      for (let i = 0; i < data.certificates.length; i++) {
        coursesItem[i] = document.createElement("div");
        coursesItem[i].className = "courses-item";
        if (i == 0) {
          coursesItem[i].classList.add("active");
        }
        coursesItem[i].style.width = slideWidth + "px";
        /* ICON ELEMENT */
        iconLeft[i] = document.createElement("i");
        iconLeft[i].classList.add("fas", "fa-quote-left", "left");
        iconRight[i] = document.createElement("i");
        iconRight[i].classList.add("fas", "fa-quote-right", "right");
        /* TITLE ELEMENT */
        coursesTitle[i] = document.createElement("h3");
        coursesTitle[i].classList.add("courses-item-title");
        coursesTitle[i].innerHTML = data.certificates[i]["name"];
        /* DESC ELEMENT */
        desc[i] = document.createElement("h4");
        desc[i].innerHTML = data.certificates[i]["description"];
        /* IMAGE ELEMENT */
        image[i] = document.createElement("img");
        image[i].src = data.certificates[i]["image"];
        image[i].alt = "certificates";
        /* ISSUED ELEMENT */
        issuedDate[i] = document.createElement("p");
        issuedDate[i].classList.add("courses-item-info");
        issuedDate[i].innerHTML =
          "Issued Date - " + data.certificates[i]["issued_date"];
        /* APPEND ELEMENT */
        coursesItemContainer.appendChild(coursesItem[i]);
        coursesItem[i].appendChild(iconLeft[i]);
        coursesItem[i].appendChild(iconRight[i]);
        coursesItem[i].appendChild(coursesTitle[i]);
        coursesItem[i].appendChild(desc[i]);
        coursesItem[i].appendChild(image[i]);
        coursesItem[i].appendChild(issuedDate[i]);
      }
      coursesItemContainer.style.width =
        slideWidth * data.certificates.length + "px";

      let activeSlide = coursesItemContainer.querySelector(
        ".courses-item.active"
      );
      let slides = coursesItem.length;
      let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(
        activeSlide
      );

      nextBtn.addEventListener("click", () => {
        if (slideIndex === slides - 1) {
          slideIndex = 0;
        } else {
          slideIndex++;
        }
        slider();
      });

      prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
          slideIndex = slides - 1;
        } else {
          slideIndex--;
        }
        slider();
      });
      function slider() {
        coursesItemContainer
          .querySelector(".courses-item.active")
          .classList.remove("active");
        coursesItem[slideIndex].classList.add("active");
        coursesItemContainer.style.marginLeft =
          -(slideWidth * slideIndex) + "px";
      }
      slider();
    });
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
