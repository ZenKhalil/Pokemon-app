"use strict";

window.addEventListener("load", initApp);

async function initApp() {
  console.log("initApp: app.js is working!!");
  const pokemons = await getPokemons();
  showPokemons(pokemons);
}

async function getPokemons() {
  const response = await fetch(
    "https://zenkhalil.github.io/jsonapi/data.json"
  );
  const data = await response.json();
  console.log(data);
  return data;
}

function showPokemons(characterList) {
  let counter = 1;
  for (const pokemon of characterList) {
    showPokemon(pokemon, counter);
    counter++;
  }
}

function showPokemon(pokemon, index) {
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

  document
    .querySelector(`#pokemons article:last-child`)
    .addEventListener("click", () => {
      const dialogBox = document.querySelector(`#dialog-box-${index}`);
      const closeButton = document.querySelector(`#close-button-${index}`);

      document.querySelector("#name").textContent = `${pokemon.name}`;
      document.querySelector("#image").set = `${pokemon.image}`;
      dialogBox.showModal();
      dialogBox.scrollTop = 0; // scroll to the top

      closeButton.addEventListener("click", () => {
        dialogBox.close();
      });
    });
    
}
