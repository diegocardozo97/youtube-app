const KEY = "AIzaSyA8A1hLA9B0NBy5PzLfEf89iJE1hwUv_tw";


let previousToken = "";
let nextToken = "";

let searchQuery = "";


function $(query) {
  return document.querySelector(query);
}

function handleJSONResult(JSONResult) {
  console.log(JSONResult);

  if (!("prevPageToken" in JSONResult)) {
    previousToken = "";
    $("#previousButton").disabled = true;
  } else {
    previousToken = JSONResult.prevPageToken;
    $("#previousButton").disabled = false;
  }
  nextToken = JSONResult.nextPageToken;

  $("#results").innerHTML = "";
  for (const result of JSONResult.items) {
    const linkVideo = `https://www.youtube.com/watch?v=${result.id.videoId}`;

    const resultDiv = document.createElement("div");

    const linkText = document.createElement("a");
    linkText.innerText = result.snippet.title;
    linkText.href = linkVideo;
    linkText.target = "_blank";
    resultDiv.appendChild(linkText);

    const linkImg = document.createElement("a");
    linkImg.href = linkVideo;
    linkImg.target = "_blank";
    const img = document.createElement("img");
    img.src = result.snippet.thumbnails.default.url;
    linkImg.appendChild(img);
    resultDiv.appendChild(linkImg);

    $("#results").appendChild(resultDiv);
  }
}

function searchForResults(pageToken="") {
  fetch(
    `https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=${searchQuery}&key=${KEY}&maxResults=10&pageToken=${pageToken}`,
    {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      },
    },
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }).then(handleJSONResult).catch((error) => {
    console.error('There has been a error:', error);
  });
}

function onClickSearchButton(event) {
  event.preventDefault();

  searchQuery = $("#searchTerm").value;
  searchForResults();

  return false;
}

function onClickPreviousButton() {
  searchForResults(previousToken);
}

function onClickNextButton() {
  searchForResults(nextToken);
}

function registerEventListeners() {
  $("#searchButton").addEventListener('click', onClickSearchButton);
  $("#previousButton").addEventListener('click', onClickPreviousButton);
  $("#nextButton").addEventListener('click', onClickNextButton);
}

(function init() {
  registerEventListeners();
})();