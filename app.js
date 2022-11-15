const listOfCharcters = document.getElementById("characterList");
const showCharacters = document.getElementById("fetch");
const searchField = document.getElementById("search-word");
const myPageNum = document.getElementById("pageNum");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
let currentPage = 1;
let maxPages = 1;
const url = "https://rickandmortyapi.com/api/character";
const data = fetch(url).then((res) => res.json());

async function abc() {
  const enteredValue = searchField.value;
  const myData = await data;
  myArray = [];
  listOfCharcters.innerHTML = "";
  for (const character of myData.results) {
    if (character.name.includes(enteredValue)) {
      myArray.push(character);
    }
  }
  maxPages = Math.round(myArray.length / 3);
  console.log(myArray);
  renderList(myArray);
  myPageNum.textContent = `Page ${currentPage}`;

  if (currentPage === 1) {
    prevPage.disabled = true;
  } else prevPage.disabled = false;

  if (currentPage === maxPages) {
    nextPage.disabled = true;
  } else nextPage.disabled = false;
}
function renderList(arr) {
  listOfCharcters.innerHTML = "";
  arr.map((el, index) => {
    if (index >= currentPage * 3 - 3 && index < currentPage * 3) {
      const newLi = document.createElement("li");
      newLi.classList.add("newLi");
      newLi.textContent = el.name + "  " + el.species;
      listOfCharcters.appendChild(newLi);
    }
  });
}
function lowerPage() {
  if (currentPage > 1) currentPage--;
  abc();
}
function higherPage() {
  console.log(maxPages);
  if (currentPage != maxPages) {
    currentPage++;
  }
  abc();
}
function searchFunc() {
  currentPage = 1;
  abc();
}
showCharacters.addEventListener("click", searchFunc);
nextPage.addEventListener("click", higherPage);
prevPage.addEventListener("click", lowerPage);
