
/**
 * 
 * @returns {Object} character info
 */
const fetchCharacter = async() => {
    //traer la información
    //hay 826 personajes
    const idPersonaje = randomNumber(1, 826);
    const res = await fetch(`https://rickandmortyapi.com/api/character/${idPersonaje}`);
    //conseguir el cuerpo
    const cuerpo = await res.json();
    return cuerpo;
}

/**
 * Devuelve un número random entero según el rango dado
 * @param {Number} min 
 * @param {Number} max
 * @returns {Number} random
 */
const randomNumber = (min, max) => {
    const number = ((Math.random() *(max - min)) + min).toFixed() ;
    if (number > max || number < min) randomNumber(min, max);
    return number;
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const RickMortyApp = async( element ) => {

    document.querySelector('#app-title').innerHTML = 'Rick & Morty App';
    element.innerHTML = 'Cargando...'; //para que al menos tenga la sensación de hacer algo

    //await fetchCharacter();

    //referenciasHTML
    const imageLabel = document.createElement('img');
    const nameLabel = document.createElement('h3');
    const statusLabel = document.createElement('p');
    const specieLabel = document.createElement('p');
    const nextCharacterButton = document.createElement('button');

    nextCharacterButton.innerText = 'Siguiente personaje';
    
    const renderCharacter = ( character ) => {
        nameLabel.innerHTML = `Nombre: ${character.name}`;
        statusLabel.innerHTML = `Status: ${character.status}`;
        specieLabel.innerHTML = `Especie: ${character.species}`;
        imageLabel.src = character.image;
        imageLabel.className = 'character-img';
        element.replaceChildren(nameLabel, imageLabel, statusLabel, specieLabel, nextCharacterButton); //remplazar sus hijos
    }

    fetchCharacter()
        .then (renderCharacter);
    
    nextCharacterButton.addEventListener('click', async() => {
        element.innerHTML = 'Cargando...';
        const character = await fetchCharacter();
        renderCharacter( character );
    });
}
