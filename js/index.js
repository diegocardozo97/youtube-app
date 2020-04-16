function $(query) {
  return document.querySelector(query);
}

function onClickSearchButton(event) {
  event.preventDefault();
  return false;
}

function onClickPreviousButton() {

}

function onClickNextButton() {
  
}

function registerEventListeners() {
  $("#searchButton").addEventListener('click', onClickSearchButton);
  $("#previousButton").addEventListener('click', onClickPreviousButton);
  $("#nextButton").addEventListener('click', onClickNextButton);
}

(function init() {
  registerEventListeners();
})();