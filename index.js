// import "bootstrap";
// import { Modal } from "bootstrap";
import * as Bootstrap from "bootstrap";

// core version + navigation, pagination modules:
import Swiper, { Autoplay, Scrollbar, Pagination, Navigation } from "swiper";
Swiper.use([Autoplay, Pagination, Navigation, Scrollbar]);
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

import { myAutoComplete } from "./myAutoComplete";

myAutoComplete();

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
  breakpoints: {
    // when window width is >= 480px
    768: {
      slidesPerView: 2,
      spaceBetween: 60,
    },
    // when window width is >= 640px
    992: {
      slidesPerView: 3,
      spaceBetween: 70,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 70,
      navigation: {
        prevEl: ".recommendations__swiper-container .swiper-button-prev",
        nextEl: ".recommendations__swiper-container .swiper-button-next",
      },
    },
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
  breakpoints: {
    // when window width is >= 480px
    1200: {
      slidesPerView: 4,
      spaceBetween: 34,
    },
  },
});

myScrollbar.initAll();
// const scrollbarAutoComplete = () => {
//   myScrollbar.init(document.querySelector(".autoComplete_wrapper>ul"));
// };

// document.querySelectorAll(".autoComplete_wrapper input").forEach((input) => {
//   input.addEventListener("focusout", () => {
//     if (input.value.length == 0) {
//       input.parentNode.classList.remove("child-selected");
//     }
//   });
// });

// setTimeout(scrollbarAutoComplete, 1000);
if (
  typeof document.getElementsByClassName("select-dropdown__items")[0] != "undefined" &&
  document.getElementsByClassName("select-dropdown__items")[0] != null
) {
  document.querySelectorAll(".select-dropdown__items").forEach((element) => {
    myScrollbar.init(element, {
      alwaysShowTracks: true,
    });
  });

  const mySelectsContainers = document.querySelectorAll(".select-dropdown__items");
  const mySelectInput = document.querySelectorAll(".select-dropdown");

  mySelectInput.forEach((mainInput) => {
    const inputItems = mainInput.querySelector(".select-dropdown__items");
    const inputDropdownValueContainer = mainInput.querySelector(".d-flex");

    inputDropdownValueContainer.addEventListener("click", () => {
      inputItems.classList.toggle("open");
      if (inputItems.classList.contains("open") == true) {
        mainInput.querySelector(".select-dropdown__value~svg").style.transform = "rotate(180deg)";
      } else {
        mainInput.querySelector(".select-dropdown__value~svg").style.transform = "rotate(0deg)";
      }
    });

    document.addEventListener("click", (event) => {
      if (mainInput.contains(event.target)) {
      } else {
        // console.log("!mainInput.contains(event.target)");

        inputItems.classList.remove("open");
        mainInput.querySelector(".select-dropdown__value~svg").style.transform = "rotate(0deg)";
      }
    });

    if (
      inputItems.querySelector('input[type="radio"]') != "undefined" &&
      inputItems.querySelector('input[type="radio"]') != null
    ) {
      const formChecks = inputItems.querySelectorAll(".form-check");
      formChecks.forEach((element) => {
        element.addEventListener("click", () => {
          setTimeout(() => {
            inputItems.classList.remove("open");
            // inputDropdownValueContainer.classList.remove("open");
            mainInput.querySelector(".select-dropdown__value~svg").style.transform = "rotate(0deg)";
          }, 50);
        });
      });
    }

    ///////////RADIO
    const checkedRadioElements = mainInput.querySelectorAll('.select-dropdown__items input[type="radio"');
    let selectedRadioValue;

    checkedRadioElements.forEach((element) => {
      const checkedRadioElementsFunction = () => {
        for (const selectedInput of checkedRadioElements) {
          if (selectedInput.checked) {
            selectedRadioValue = selectedInput.value;
            break;
          }
        }
        const selectDropdownValue = mainInput.querySelector(".select-dropdown__value");
        selectDropdownValue.textContent = selectedRadioValue;

        if (selectedRadioValue == null || selectedRadioValue == "undefined") {
          selectDropdownValue.textContent = inputItems.querySelector(
            '.form-check:first-child input[type="radio"]'
          ).value;
        }

        if (
          selectDropdownValue.textContent ==
          inputItems.querySelector('.form-check:first-child input[type="radio"]').value
        ) {
          selectDropdownValue.classList.remove("font-darkBrown");
          selectDropdownValue.classList.remove("fw-bold");
          selectDropdownValue.textContent = inputItems.querySelector(
            '.form-check:first-child input[type="radio"]'
          ).value;
        } else {
          selectDropdownValue.classList.add("font-darkBrown");
          selectDropdownValue.classList.add("fw-bold");
        }
      };
      checkedRadioElementsFunction();
      element.addEventListener("click", () => {
        checkedRadioElementsFunction();
      });
    });

    ///////////CHECKBOX
    const checkedCheckboxElements = mainInput.querySelectorAll('.select-dropdown__items input[type="checkbox"');
    let selectedCheckboxValue;
    checkedCheckboxElements.forEach((element) => {
      let selectedItems = "";

      const checkedCheckboxFunction = () => {
        for (var i = 0; i < checkedCheckboxElements.length; i++) {
          if (checkedCheckboxElements[i].type == "checkbox" && checkedCheckboxElements[i].checked == true) {
            selectedItems += checkedCheckboxElements[i].value + ", ";
          }
        }

        for (const selectedInput of checkedCheckboxElements) {
          if (selectedInput.checked) {
            selectedCheckboxValue = selectedInput.value;
            console.log(selectedInput);
            break;
          }
        }
        const selectDropdownValue = mainInput.querySelector(".select-dropdown__value");
        selectDropdownValue.textContent = "Wybierz wiele opcji";

        const selectDropdownCheckedContainer = mainInput.querySelector(".select-dropdown__checked");

        selectDropdownCheckedContainer.innerHTML =
          '<span class="font-darkBrown fw-bold"> Wybrane opcje: </span>' + selectedItems;

        if (selectDropdownValue == null || selectDropdownValue == "undefined") {
          selectDropdownValue.textContent = inputItems.querySelector(
            '.form-check:first-child input[type="checkbox"]'
          ).value;
        }
      };

      checkedCheckboxFunction();

      if (element.getAttribute("data-remove-all") == "true" || selectedItems == "") {
        const selectDropdownCheckedContainer = mainInput.querySelector(".select-dropdown__checked");
        selectDropdownCheckedContainer.innerHTML = "";
        checkedCheckboxElements.forEach((element) => {
          element.checked = false;
        });
      }

      element.addEventListener("click", () => {
        checkedCheckboxFunction();
        if (element.getAttribute("data-remove-all") == "true" || selectedItems == "") {
          const selectDropdownCheckedContainer = mainInput.querySelector(".select-dropdown__checked");
          selectDropdownCheckedContainer.innerHTML = "";
          checkedCheckboxElements.forEach((element) => {
            element.checked = false;
          });
        }
      });
    });
  });
}

if (
  typeof document.getElementsByClassName("itemToSearch")[0] != "undefined" &&
  document.getElementsByClassName("itemToSearch")[0] != null
) {
  document.querySelectorAll(".searchOnInput").forEach((element) => {
    element.oninput = function () {
      var matcher = new RegExp(element.value, "gi");
      const inputParent = element.parentNode;
      for (var i = 0; i < inputParent.getElementsByClassName("itemToSearch").length; i++) {
        const favouriteItemIndex = inputParent.getElementsByClassName("itemToSearch")[i];
        if (matcher.test(favouriteItemIndex.getAttribute("data-text"))) {
          if (favouriteItemIndex.classList.contains("d-none")) {
            favouriteItemIndex.classList.remove("d-none");
          }
          favouriteItemIndex.classList.add("d-flex");
        } else {
          favouriteItemIndex.classList.add("d-none");
        }
      }
    };
  });
}

if (
  typeof document.getElementsByClassName("btn-favourite-heart")[0] != "undefined" &&
  document.getElementsByClassName("btn-favourite-heart")[0] != null
) {
  document.querySelectorAll(".btn-favourite-heart").forEach((heartBtn) => {
    heartBtn.addEventListener("click", (event) => {
      heartBtn.parentNode.classList.toggle("favourite");
      heartBtn.classList.toggle("favourited-btn");
      event.preventDefault();
    });
  });
}

if (
  typeof document.querySelector("[data-dismiss]") != "undefined" &&
  document.querySelector("[data-dismiss]") != null
) {
  document.querySelectorAll('[data-dismiss="parent"]').forEach((element) => {
    console.log(element);
    element.addEventListener("click", () => {
      console.log(element.closest("[data-element-to-dismiss]"));
      element.closest("[data-element-to-dismiss]").classList.add("hide");
    });
  });
}

if (
  typeof document.querySelector(".remove-hide-on-start") != "undefined" &&
  document.querySelector(".remove-hide-on-start") != null
) {
  document.querySelectorAll(".remove-hide-on-start").forEach((element) => {
    element.classList.remove("hide");
  });
}

if (typeof document.querySelector(".first-time") != "undefined" && document.querySelector(".first-time") != null) {
  const firstTimeModal = new Bootstrap.Modal(document.getElementById("firstTimeModal"), {
    // keyboard: false,
  });
  firstTimeModal.show();
}

let maxXl = window.innerWidth < 1200;
let maxLg = window.innerWidth < 992;
let maxMd = window.innerWidth < 768;
let minLg = window.innerWidth >= 992;
let afterLoaded = false;

const headerRightButtons = document.getElementsByClassName("header__right-buttons")[0];
const mobileMenuOffcanvas = document.querySelector("#mobileMenu");
const moveHeaderRightButtonsToOffcanvas = () => {
  if (maxMd) {
    mobileMenuOffcanvas.appendChild(headerRightButtons);
    headerRightButtons.classList.remove("d-none");
  } else {
    if (afterLoaded) {
      document.querySelector(".header__nav-content").appendChild(headerRightButtons);
    }
  }
};

const mobileCategoriesOffcanvas = document.querySelector("#offcanvasCategories .offcanvas-body");
const categoriesContainer = document.querySelector(".hero__categories-container");
const moveCategoriesInMobile = () => {
  if (
    typeof document.querySelector(".hero__categories-container") != "undefined" &&
    document.querySelector(".hero__categories-container") != null
  ) {
    if (maxMd) {
      mobileCategoriesOffcanvas.appendChild(categoriesContainer);
      categoriesContainer.classList.remove("d-none");
    } else {
      if (afterLoaded) {
        document.querySelector(".hero").prepend(categoriesContainer);
      }
    }
  }
};
moveCategoriesInMobile();

const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const handleMobileMenuToggle = () => {
  if (
    typeof document.querySelector("#mobileMenuToggle") != "undefined" &&
    document.querySelector("#mobileMenuToggle") != null
  ) {
    if (maxMd) {
      mobileMenuToggle.addEventListener("click", () => {
        mobileMenuToggle.classList.toggle("opened");
        mobileMenuOffcanvas.classList.toggle("opened");
      });
    }
  }
};

moveHeaderRightButtonsToOffcanvas();
handleMobileMenuToggle();

const searchBar = document.getElementsByClassName("search")[0];
const searchOffcanvasBody = document.querySelector("#searchModal .modal-body");
const moveSearchToOffcanvas = () => {
  if (searchOffcanvasBody != "undefined" && searchOffcanvasBody != null) {
    if (maxLg) {
      searchOffcanvasBody.appendChild(searchBar);
      searchBar.classList.remove("d-none");
    } else {
      if (afterLoaded) {
        document.querySelector(".header__nav-content").insertBefore(searchBar, headerRightButtons);
      }
    }
  }
};
moveSearchToOffcanvas();

//coś z resizem!

const popularCategoriesSwiper = new Swiper("#popular-categoriesSwiper", {
  // configure Swiper to use modules
  //   loop: true,
  direction: "horizontal",
  slidesPerView: 3,
  spaceBetween: 16,
  loop: false,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".popular-categories__pagination",
    clickable: true,
    type: "bullets",
  },
  navigation: {
    prevEl: ".popular-categories__swiper-container .swiper-button-prev",
    nextEl: ".popular-categories__swiper-container .swiper-button-next",
  },
  scrollbar: {
    el: ".popular-categories__swiper-container .swiper-scrollbar",
    draggable: true,
  },
});

const doneResizing = () => {
  maxXl = window.innerWidth < 1200;
  maxLg = window.innerWidth < 992;
  maxMd = window.innerWidth < 768;
  minLg = window.innerWidth >= 992;
  afterLoaded = true;

  if (
    typeof document.querySelector(".hero__categories-container") != "undefined" &&
    document.querySelector(".hero__categories-container") != null
  ) {
    moveCategoriesInMobile();
  }
  moveHeaderRightButtonsToOffcanvas();
  handleMobileMenuToggle();
  moveSearchToOffcanvas();

  switchChatLinksOffcanvas();
};

let rtime;
let timeout = false;
const delta = 200;
let prevWidth = window.width;

window.addEventListener("resize", () => {
  if (window.width !== prevWidth) {
    prevWidth = width;

    rtime = new Date();
    if (timeout === false) {
      timeout = true;
      setTimeout(resizeend, delta);
    }
  }
});

function resizeend() {
  if (new Date() - rtime < delta) {
    setTimeout(resizeend, delta);
  } else {
    timeout = false;
    doneResizing();
  }
}

const passwordStrength = () => {
  let strength;
  function passwordCheck(password) {
    if (password.length >= 8) strength += 1;

    if (password.match(/(?=.*[0-9])/)) strength += 1;

    if (password.match(/(?=.*[!,%,&,@,#,$,^,*,?,_,~,<,>,])/)) strength += 1;

    if (password.match(/(?=.*[a-z])/)) strength += 1;

    if (password.match(/(?=.*[A-Z])/)) strength += 1;

    displayBar(strength);
  }

  function displayBar(strength) {
    let passStrengthSpan = document.querySelector("#password-strength span");
    switch (strength) {
      case 1:
        passStrengthSpan.style.width = "20%";
        passStrengthSpan.style.backgroundColor = "#de1616";

        break;

      case 2:
        passStrengthSpan.style.width = "40%";
        passStrengthSpan.style.backgroundColor = "#de1616";
        break;

      case 3:
        passStrengthSpan.style.width = "60%";
        passStrengthSpan.style.backgroundColor = "#de1616";
        break;

      case 4:
        passStrengthSpan.style.width = "80%";
        passStrengthSpan.style.backgroundColor = "#FFA200";
        break;

      case 5:
        passStrengthSpan.style.width = "100%";
        passStrengthSpan.style.backgroundColor = "#06bf06";

        break;

      default:
        passStrengthSpan.style.width = "0%";
        passStrengthSpan.style.backgroundColor = "#de1616";
    }
  }

  document.querySelectorAll("[data-strength]").forEach((element) => {
    const tags = '<div id="password-strength" class="strength"><span></span></div>';
    element.insertAdjacentHTML("afterend", tags);

    element.addEventListener("focus", () => {
      document.querySelector("#password-strength").style.height = "7px";
    });

    // element.addEventListener("blur", () => {
    //   document.querySelector("#password-strength").style.height = "0px";
    // });

    element.addEventListener("keyup", () => {
      strength = 0;
      let password = element.value;
      passwordCheck(password);
    });
  });
};

// passwordStrength();

const chatContent = document.querySelector(".chat__content");
if (typeof chatContent != "undefined" && chatContent != null) {
  window.setTimeout(() => {
    chatContent.scrollTo({ top: 5000, behavior: "smooth" });
  }, 200);
}

const chatOffcanvas = document.querySelector("#offcanvasChat .offcanvas-body");
const chatContainer = document.querySelector(".chat");
const moveChatInMobile = () => {
  if (typeof document.querySelector(".chat") != "undefined" && document.querySelector(".chat") != null) {
    if (maxMd) {
      chatOffcanvas.appendChild(chatContainer);
      chatContainer.classList.remove("d-none");
    } else {
      if (afterLoaded) {
        document.querySelector(".messages").prepend(chatContainer);
      }
    }
  }
};
moveChatInMobile();

const productThumbnailsSwiper = new Swiper("#productThumbnailsSwiper", {
  // configure Swiper to use modules
  //   loop: true,
  direction: "horizontal",
  slidesPerView: "auto",
  spaceBetween: 9,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
});

if (
  typeof document.querySelector(".product__my-comment-editable") != "undefined" &&
  document.querySelector(".product__my-comment-editable") != null
) {
  document.querySelectorAll(".product__my-comment-btn-edit").forEach((element) => {
    element.addEventListener("click", () => {
      const myCommentForm = element.parentNode.parentNode.querySelector(".product__my-comment-editable");
      myCommentForm.classList.remove("d-none");

      const myCommentFormClose = myCommentForm.querySelector(".product__my-comment-close");
      myCommentFormClose.addEventListener("click", () => {
        myCommentForm.classList.add("d-none");
      });
    });
  });
}

if (
  typeof document.querySelector("[data-maxlengthDisplay='true']") != "undefined" &&
  document.querySelector("[data-maxlengthDisplay]") != null
) {
  document.querySelectorAll("[data-maxlengthDisplay='true']").forEach((element) => {
    console.log("dasd");
    const maxValueContainer = document.createElement("small");
    maxValueContainer.classList.add("d-block", "text-end");
    let maxValue = element.getAttribute("maxlength");
    maxValueContainer.innerHTML = element.value.length + " / " + maxValue;

    element.addEventListener("keyup", () => {
      maxValueContainer.innerHTML = element.value.length + " / " + maxValue;
    });

    element.parentNode.append(maxValueContainer);
  });
}

const switchChatLinksOffcanvas = () => {
  if (
    typeof document.querySelector(".messages-list") != "undefined" &&
    document.querySelector(".messages-list") != null
  ) {
    const links = document.querySelectorAll('.messages-list a[href="#offcanvasChat"]');

    if (!maxMd) {
      links.forEach((link) => {
        link.setAttribute("data-bs-toggle", "");
      });
    } else {
      links.forEach((link) => {
        link.setAttribute("data-bs-toggle", "offcanvas");
      });
    }
  }
};
switchChatLinksOffcanvas();

const filePreview = document.querySelector(".add-product .file-preview");
const filePreviewThumbnails = document.querySelector(".file-preview-thumbnails");
let imagesCount, filePreviewMax;
const checkGalleryCount = () => {
  if (typeof filePreview != "undefined" && filePreview != null) {
    imagesCount = document.querySelectorAll(".file-drop-zone .file-preview-thumbnails .kv-preview-thumb").length;
    filePreviewThumbnails.setAttribute("images-count", imagesCount);
    filePreviewMax = filePreview.getAttribute("maxitems");
    if (imagesCount <= 0 || imagesCount >= filePreviewMax) {
      filePreviewThumbnails.classList.remove("add-available");
    } else {
      filePreviewThumbnails.classList.add("add-available");
    }
  }
};
checkGalleryCount();
