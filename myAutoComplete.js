import autoComplete from "@tarekraafat/autocomplete.js";
export function myAutoComplete() {
  const history = [];

  const cityConfig = {};

  const citiesData = [
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
  ];

  const categoryData = ["Matematyka, Nauka", "Chemia, Nauka", "Fizyka, Nauka", "Biologia, Nauka", "Historia, Nauka", "Geografia, Nauka", "Paznokcie, Salon kosmetyczny", "Rzęsy i brwi, Salon kosmetyczny"];

  const autoCompleteCityInputs = document.querySelectorAll(".auto-complete-city");

  if (typeof autoCompleteCityInputs != "undefined" && autoCompleteCityInputs != null) {
    autoCompleteCityInputs.forEach((cityInput) => {
      const autoCompleteJS = new autoComplete({
        placeHolder: "miejscowość",
        data: {
          src: citiesData,
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
              historyBlock.setAttribute("style", "display: flex; flex-direction: column; margin: .3rem; padding: .3rem .5rem;");
              historyBlock.innerHTML = "Ostatnie wyszukiwania";
              // Limit displayed searched to only last "2"
              recentSearch.slice(0, 2).forEach((item) => {
                const recentItem = document.createElement("span");
                recentItem.setAttribute("style", "display: flex; margin: .2rem; color: rgba(0, 0, 0, .2);");
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
        selector: () => cityInput,
      });
    });
  }

  const autoCompleteCategoryInputs = document.querySelectorAll(".auto-complete-category");

  if (typeof autoCompleteCategoryInputs != "undefined" && autoCompleteCategoryInputs != null) {
    autoCompleteCategoryInputs.forEach((categoryInput) => {
      const autoCompleteJS = new autoComplete({
        placeHolder: "szukaj kategorii",
        data: {
          src: categoryData,
          cache: true,
        },
        resultItem: {
          highlight: {
            render: true,
          },
        },
        events: {
          input: {
            selection(event) {
              const selection = event.detail.selection.value;
              autoCompleteJS.input.value = selection;
            },
            focus() {
              const inputValue = autoCompleteJS.input.value;

              if (inputValue.length) autoCompleteJS.start();
            },
          },
        },

        selector: () => categoryInput,
      });
    });
  }

  document.querySelectorAll(".autoComplete_wrapper input").forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value.length != 0) {
        input.parentNode.classList.add("characters-there");
      } else {
        input.parentNode.classList.remove("characters-there");
      }
    });
  });
}
