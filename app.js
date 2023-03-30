"use strict";

// when the window loads, call initApp function
window.addEventListener("load", initApp);

// initialize the application
async function initApp() {
  console.log("initApp: app.js is working!!");
  // get the list of pokemons from the API
  const pokemons = await getPokemons();
  // display the list of pokemons
  showPokemons(pokemons);
}

// get the list of pokemons from the API
async function getPokemons() {
  // fetch the data from the API
  const response = await fetch(
    "https://zenkhalil.github.io/jsonapi/data.json"
  );
  // convert the response to JSON
  const data = await response.json();
  console.log(data);
  // return the list of pokemons
  return data;
}

// display the list of pokemons
function showPokemons(characterList) {
  let counter = 1;
  // loop through each pokemon in the list and display it
  for (const pokemon of characterList) {
    showPokemon(pokemon, counter);
    counter++;
  }
}

// display a single pokemon and its details
function showPokemon(pokemon, index) {
  // add the pokemon details to the HTML
  document.querySelector("#pokemons").insertAdjacentHTML(
    "beforeend",
    /*html*/ `
      <article>
        <h1>${pokemon.name}</h1>
        <img src="${pokemon.image}">
        <p>${pokemon.description}</p>
        <dialog id="dialog-box-${index}">
          <h3 id="name">${pokemon.name}</h3>
          <p id="image">
            <img src="${pokemon.image}">
          </p>
          <p id="ability"> Ability: ${pokemon.ability}</p>
          <p id="indexNumber">Index number #${pokemon.dexindex}</p>
          <p id="type">Type: ${pokemon.type}</p>
          <p id="subtype">Subtype: ${pokemon.subtype}</p>
          <p id="weaknesses">Weaknesses: ${pokemon.weaknesses}</p>
          <p id="gender">The pokemon can be: ${pokemon.gender}</p>
          <p id="weight">${pokemon.name}'s' weight is ${pokemon.weight} g</p>
          <p id="height">${pokemon.name}'s height is ${pokemon.height} cm</p>
          <p id="generation">Generation: ${pokemon.generation}</p>
          <p id="firstVersion">First gameversion: ${pokemon.spilversion}</p> 
          <form method="dialog">
            <button id="close-button-${index}">Close</button>
          </form>
        </dialog>
      </article>
    `
  );

  // add an event listener for when the user clicks on a pokemon
  document.querySelector(`#pokemons article:last-child`).addEventListener("click", () => {
    // get the dialog box and close button for this pokemon
    const dialogBox = document.querySelector(`#dialog-box-${index}`);
      const closeButton = document.querySelector(`#close-button-${index}`);

       // set the pokemon details in the dialog box
      document.querySelector("#name").textContent = `${pokemon.name}`;
      document.querySelector("#image").set = `${pokemon.image}`;
      
      // show the dialog box and scroll to the top
      dialogBox.showModal();
      dialogBox.scrollTop = 0; // scroll to the top

      // add an event listener for when the user clicks the close button
      closeButton.addEventListener("click", () => {
        dialogBox.close();
      });
    });
    
}
