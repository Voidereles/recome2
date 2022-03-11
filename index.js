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

import autoComplete from "@tarekraafat/autocomplete.js";

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

const history = [];

const autoCompleteJS = new autoComplete({
  selector: ".autoCompleteCity",
  placeHolder: "miejscowość",
  data: {
    src: [
      "Poręba, zawierciański, Śląskie",
      "Poręba, pszczyński, Śląskie",
      "Poręba Dzierżna, olkuski, Małopolskie",
      "Poręba, myślenicki, Małopolskie",
      "Poręba Spytkowska, brzeski, Małopolskie",
      "Poręba test",
      "Poręba test1",
      "Poręba test2",
      "Poręba test3",
      "Poręba test4",
      "Poręba test5",
      "Poręba test6",
    ],
    cache: true,
  },
  resultItem: {
    highlight: {
      render: true,
    },
  },
  resultsList: {
    element: (list) => {
      const recentSearch = history.reverse();
      const historyLength = recentSearch.length;

      // Check if there are recent searches
      if (historyLength) {
        const historyBlock = document.createElement("div");
        historyBlock.setAttribute(
          "style",
          "display: flex; flex-direction: column; margin: .3rem; padding: .3rem .5rem;"
        );
        historyBlock.innerHTML = "Ostatnie wyszukiwania";
        // Limit displayed searched to only last "2"
        recentSearch.slice(0, 2).forEach((item) => {
          const recentItem = document.createElement("span");
          recentItem.setAttribute(
            "style",
            "display: flex; margin: .2rem; color: rgba(0, 0, 0, .2);"
          );
          recentItem.innerHTML = item;
          historyBlock.append(recentItem);
        });

        const separator = document.createElement("hr");
        separator.setAttribute("style", "margin: 5px 0 0 0;");
        historyBlock.append(separator);

        list.prepend(historyBlock);
      }
    },
  },
  events: {
    input: {
      selection(event) {
        const feedback = event.detail;
        const input = autoCompleteJS.input;
        const selection = event.detail.selection.value;
        // Get selected Value
        // const selection = feedback.selection.value.trim();
        // Add selected value to "history" array
        history.push(selection);
        // const selection = event.detail.selection.value;
        autoCompleteJS.input.value = selection;
      },
      focus() {
        const inputValue = autoCompleteJS.input.value;

        if (inputValue.length) autoCompleteJS.start();
      },
    },
  },
});

myScrollbar.initAll();
// const scrollbarAutoComplete = () => {
//   myScrollbar.init(document.querySelector(".autoComplete_wrapper>ul"));
// };

document.querySelectorAll(".autoComplete_wrapper input").forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value.length != 0) {
      input.parentNode.classList.add("characters-there");
    } else {
      input.parentNode.classList.remove("characters-there");
    }
  });
});

// document.querySelectorAll(".autoComplete_wrapper input").forEach((input) => {
//   input.addEventListener("focusout", () => {
//     if (input.value.length == 0) {
//       input.parentNode.classList.remove("child-selected");
//     }
//   });
// });

// setTimeout(scrollbarAutoComplete, 1000);
if (
  typeof document.getElementsByClassName("select-dropdown__items")[0] !=
    "undefined" &&
  document.getElementsByClassName("select-dropdown__items")[0] != null
) {
  document.querySelectorAll(".select-dropdown__items").forEach((element) => {
    myScrollbar.init(element, {
      alwaysShowTracks: true,
    });
  });

  const mySelectsContainers = document.querySelectorAll(
    ".select-dropdown__items"
  );
  const mySelectInput = document.querySelectorAll(".select-dropdown");

  mySelectInput.forEach((mainInput) => {
    const inputItems = mainInput.querySelector(".select-dropdown__items");
    const inputDropdownValueContainer = mainInput.querySelector(".d-flex");

    inputDropdownValueContainer.addEventListener("click", () => {
      inputItems.classList.toggle("open");
      if (inputItems.classList.contains("open") == true) {
        mainInput.querySelector(".select-dropdown__value~svg").style.transform =
          "rotate(180deg)";
      } else {
        mainInput.querySelector(".select-dropdown__value~svg").style.transform =
          "rotate(0deg)";
      }
    });

    document.addEventListener("click", (event) => {
      if (mainInput.contains(event.target)) {
      } else {
        // console.log("!mainInput.contains(event.target)");

        inputItems.classList.remove("open");
        mainInput.querySelector(".select-dropdown__value~svg").style.transform =
          "rotate(0deg)";
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
            mainInput.querySelector(
              ".select-dropdown__value~svg"
            ).style.transform = "rotate(0deg)";
          }, 50);
        });
      });
    }

    ///////////RADIO
    const checkedRadioElements = mainInput.querySelectorAll(
      '.select-dropdown__items input[type="radio"'
    );
    let selectedRadioValue;

    checkedRadioElements.forEach((element) => {
      const checkedRadioElementsFunction = () => {
        for (const selectedInput of checkedRadioElements) {
          if (selectedInput.checked) {
            selectedRadioValue = selectedInput.value;
            break;
          }
        }
        const selectDropdownValue = mainInput.querySelector(
          ".select-dropdown__value"
        );
        selectDropdownValue.textContent = selectedRadioValue;

        if (selectedRadioValue == null || selectedRadioValue == "undefined") {
          selectDropdownValue.textContent = inputItems.querySelector(
            '.form-check:first-child input[type="radio"]'
          ).value;
        }

        if (
          selectDropdownValue.textContent ==
          inputItems.querySelector(
            '.form-check:first-child input[type="radio"]'
          ).value
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
    const checkedCheckboxElements = mainInput.querySelectorAll(
      '.select-dropdown__items input[type="checkbox"'
    );
    let selectedCheckboxValue;
    checkedCheckboxElements.forEach((element) => {
      let selectedItems = "";

      const checkedCheckboxFunction = () => {
        for (var i = 0; i < checkedCheckboxElements.length; i++) {
          if (
            checkedCheckboxElements[i].type == "checkbox" &&
            checkedCheckboxElements[i].checked == true
          ) {
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
        const selectDropdownValue = mainInput.querySelector(
          ".select-dropdown__value"
        );
        selectDropdownValue.textContent = "Wybierz wiele opcji";

        const selectDropdownCheckedContainer = mainInput.querySelector(
          ".select-dropdown__checked"
        );

        selectDropdownCheckedContainer.innerHTML =
          '<span class="font-darkBrown fw-bold"> Wybrane opcje: </span>' +
          selectedItems;

        if (selectDropdownValue == null || selectDropdownValue == "undefined") {
          selectDropdownValue.textContent = inputItems.querySelector(
            '.form-check:first-child input[type="checkbox"]'
          ).value;
        }
      };

      checkedCheckboxFunction();

      if (
        element.getAttribute("data-remove-all") == "true" ||
        selectedItems == ""
      ) {
        const selectDropdownCheckedContainer = mainInput.querySelector(
          ".select-dropdown__checked"
        );
        selectDropdownCheckedContainer.innerHTML = "";
        checkedCheckboxElements.forEach((element) => {
          element.checked = false;
        });
      }

      element.addEventListener("click", () => {
        checkedCheckboxFunction();
        if (
          element.getAttribute("data-remove-all") == "true" ||
          selectedItems == ""
        ) {
          const selectDropdownCheckedContainer = mainInput.querySelector(
            ".select-dropdown__checked"
          );
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
  // document.getElementById("searchFavourite").oninput = function () {
  //   var matcher = new RegExp(
  //     document.getElementById("searchFavourite").value,
  //     "gi"
  //   );
  //   for (
  //     var i = 0;
  //     i < document.getElementsByClassName("itemToSearch").length;
  //     i++
  //   ) {
  //     const favouriteItemIndex =
  //       document.getElementsByClassName("itemToSearch")[i];
  //     if (matcher.test(favouriteItemIndex.getAttribute("data-text"))) {
  //       if (favouriteItemIndex.classList.contains("d-none")) {
  //         favouriteItemIndex.classList.remove("d-none");
  //       }
  //       favouriteItemIndex.classList.add("d-flex");
  //     } else {
  //       favouriteItemIndex.classList.add("d-none");
  //     }
  //   }
  // };

  document.querySelectorAll(".searchOnInput").forEach((element) => {
    element.oninput = function () {
      var matcher = new RegExp(element.value, "gi");
      const inputParent = element.parentNode;
      for (
        var i = 0;
        i < inputParent.getElementsByClassName("itemToSearch").length;
        i++
      ) {
        const favouriteItemIndex =
          inputParent.getElementsByClassName("itemToSearch")[i];
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
  typeof document.getElementsByClassName("btn-favourite-heart")[0] !=
    "undefined" &&
  document.getElementsByClassName("btn-favourite-heart")[0] != null
) {
  document.querySelectorAll(".btn-favourite-heart").forEach((heartBtn) => {
    heartBtn.addEventListener("click", () => {
      heartBtn.parentNode.classList.toggle("favourite");
    });
  });
}
