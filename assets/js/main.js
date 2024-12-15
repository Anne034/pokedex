const pokemonList = document.getElementById('pokemonList')
const headerDiv = document.querySelector('.pokemon-header');
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" 
            data-pokemon-name="${pokemon.name}" 
            data-pokemon-id="${pokemon.number}" 
            data-pokemon-photo="${pokemon.photo}"
            data-pokemon-type="${pokemon.type}"
            data-pokemon-types="${pokemon.types}"
            data-pokemon-height="${pokemon.height}"
            data-pokemon-weight="${pokemon.weight}"
            data-pokemon-abilities="${pokemon.abilities}"
            data-pokemon-hp="${pokemon.hp}"
            data-pokemon-attack="${pokemon.attack}"
            data-pokemon-defense="${pokemon.defense}"
            data-pokemon-specialattack="${pokemon.specialattack}"
            data-pokemon-specialdefense="${pokemon.specialdefense}"
            data-pokemon-speed="${pokemon.speed}">

            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
    -
        pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
            const newHtml = pokemons.map(convertPokemonToLi).join('')
            pokemonList.innerHTML += newHtml

            const firstPokemon = pokemonList.querySelector('li.pokemon');
            if (firstPokemon) {
                firstPokemon.click();
            }
        })
}

pokemonList.addEventListener('click', (event) => {
    const li = event.target.closest('li.pokemon');
    if (li) {
        const pokemonName = li.getAttribute('data-pokemon-name');
        const pokemonId = `#${li.getAttribute('data-pokemon-id')}`;
        const pokemonPhoto = li.getAttribute('data-pokemon-photo');
        const pokemonType = li.getAttribute('data-pokemon-type');
        const pokemonTypes = li.getAttribute('data-pokemon-types');
        const pokemonHeight = li.getAttribute('data-pokemon-height');
        const pokemonWeight = li.getAttribute('data-pokemon-weight');
        const pokemonAbilities = li.getAttribute('data-pokemon-abilities');
        const pokemonHp = li.getAttribute('data-pokemon-hp');
        const pokemonAttack = li.getAttribute('data-pokemon-attack');
        const pokemonDefense = li.getAttribute('data-pokemon-defense');
        const pokemonSpecialAttack = li.getAttribute('data-pokemon-specialattack');
        const pokemonSpecialDefense = li.getAttribute('data-pokemon-specialdefense');
        const pokemonSpeed = li.getAttribute('data-pokemon-speed');

        const pokemonNameText = document.getElementById('pokemonName');
        const pokemonIdText = document.getElementById('pokemonId');
        const pokemonImg = document.getElementById('pokemonImg');
        const pokemonTypesText = document.getElementById('pokemonTypes');
        const pokemonHeightText = document.getElementById('pokemonHeight');
        const pokemonWeightText = document.getElementById('pokemonWeight');
        const pokemonAbilitiesText = document.getElementById('pokemonAbilities');
        const pokemonHpText = document.getElementById('pokemonHp');
        const pokemonAttackText = document.getElementById('pokemonAttack');
        const pokemonDefenseText = document.getElementById('pokemonDefense');
        const pokemonSpecialAttackText = document.getElementById('pokemonSpecialAttack');
        const pokemonSpecialDefenseText = document.getElementById('pokemonSpecialDefense');
        const pokemonSpeedText = document.getElementById('pokemonSpeed');
        const pokemonTotalText = document.getElementById('pokemonTotal');

        const pokemonHeader = document.querySelector('.pokemon-header');

        pokemonNameText.innerHTML = pokemonName;
        pokemonIdText.innerHTML = pokemonId;
        pokemonTypesText.innerHTML = `<strong>Types:</strong> ${pokemonTypes}`;
        pokemonHeightText.innerHTML = `<strong>Height:</strong> ${pokemonHeight} m`;
        pokemonWeightText.innerHTML = `<strong>Weight:</strong> ${pokemonWeight} kg`;
        pokemonAbilitiesText.innerHTML = `<strong>Abilities:</strong> ${pokemonAbilities}`;

        //Stats
        pokemonHpText.innerHTML = `<strong>HP:</strong> ${pokemonHp}`;
        pokemonAttackText.innerHTML = `<strong>Attack:</strong> ${pokemonAttack}`;
        pokemonDefenseText.innerHTML = `<strong>Defense:</strong> ${pokemonDefense}`;
        pokemonSpecialAttackText.innerHTML = `<strong>Special Attack:</strong> ${pokemonSpecialAttack}`;
        pokemonSpecialDefenseText.innerHTML = `<strong>Special Defense:</strong> ${pokemonSpecialDefense}`;
        pokemonSpeedText.innerHTML = `<strong>Speed:</strong> ${pokemonSpeed}`;
        const totalStats =
            Number(pokemonHp) +
            Number(pokemonAttack) +
            Number(pokemonDefense) +
            Number(pokemonSpecialAttack) +
            Number(pokemonSpecialDefense) +
            Number(pokemonSpeed);

        pokemonTotalText.innerHTML = `<strong>Total:</strong> ${totalStats}`;

        pokemonImg.src = pokemonPhoto;
        pokemonImg.alt = pokemonName;

        pokemonHeader.className = `pokemon ${pokemonType} pokemon-header`;
    }
});

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const pokemonDetails = button.closest('.pokemon-details');

        const tabButtons = pokemonDetails.querySelectorAll('.tab-button');
        const tabContents = pokemonDetails.querySelectorAll('.tab-content');

        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        button.classList.add('active');

        const targetTab = button.getAttribute('data-tab');
        pokemonDetails.querySelector(`#${targetTab}`).classList.add('active');
    });
});
