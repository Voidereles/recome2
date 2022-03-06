import "bootstrap";
// core version + navigation, pagination modules:
import Swiper, { Autoplay, Scrollbar, Pagination } from "swiper";
Swiper.use([Autoplay, Pagination]);
// import Swiper and modules styles
// import "swiper/css";
// import "swiper/css/a11y";
// import "swiper/css/manipulation";
// import "swiper/css/lazy";
// import "swiper/css/autoplay";

import myScrollbar from "smooth-scrollbar";

import "swiper/css/bundle";
//   import 'swiper/css/navigation';
//   import 'swiper/css/pagination';

const categoriesSwiper = new Swiper("#categoriesSwiper", {
  // configure Swiper to use modules
  //   loop: true,
  direction: "horizontal",
  slidesPerView: "auto",
  spaceBetween: 13,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
});

const recommendationsSwiper = new Swiper("#recommendationsSwiper", {
  // configure Swiper to use modules
  //   loop: true,
  direction: "horizontal",
  slidesPerView: 1,
  spaceBetween: 100,
  loop: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".recommendations__pagination",
    clickable: true,
    type: "bullets",
  },
});

const blogSwiper = new Swiper("#blogSwiper", {
  // configure Swiper to use modules
  //   loop: true,
  direction: "horizontal",
  slidesPerView: "auto",
  spaceBetween: 13,
  loop: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
});

myScrollbar.initAll();

// document
//   .querySelectorAll(".dropdown-menu .dropdown-toggle")
//   .forEach((element) => {
//     element.addEventListener("click", () => {
//       element.nextElementSibling.classList.toggle("show");

//       return false;
//     });
//   });

// document
//   .querySelectorAll(".dropdown-menu .dropdown-toggle")
//   .forEach((element) => {
//     element.addEventListener("click", () => {
//       element.nextElementSibling.classList.toggle("show");

//       return false;
//     });
//   });

// document.addEventListener("click", ".hero .dropdown-menu", function (e) {
//   e.stopPropagation();
// });

// document.querySelectorAll(".go-back").forEach((element) => {
//   element.addEventListener("click", () => {
//     if (element.parentElement.parentElement.classList.contains("show")) {
//       element.parentElement.parentElement.classList.remove("show");
//     }
//   });
// });

// $('.go-back').on('click', function (e) {
//     if ($(this).parent().parent().hasClass('show')) {
//         $(this).parent().parent().removeClass('show');
//     }
// });
