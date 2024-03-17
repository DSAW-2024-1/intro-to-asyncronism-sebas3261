document.addEventListener('DOMContentLoaded', () => {
    const quoteContainer = document.getElementById('characters');
    const loadMoreButton = document.getElementById('load');
    const searchInput = document.getElementById('searchInput');
    const characterDirectionSelect = document.getElementById('characterDirection');
    let offset = 0;
    const charactersPerPage = 10;

    async function loadQuotes() {
        try {
            let url = `https://thesimpsonsquoteapi.glitch.me/quotes?count=${charactersPerPage}&offset=${offset}`;
            const searchTerm = searchInput.value.trim();
            const characterDirection = characterDirectionSelect.value;
            if (searchTerm !== "") {
                url += `&character=${searchTerm}`;
            }
            if (characterDirection !== "") {
                url += `&characterDirection=${characterDirection}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            
            quoteContainer.innerHTML = ""; // Limpiar el contenido actual

            data.forEach(quoteData => {
                const { quote, character, image } = quoteData;
                const quoteElement = document.createElement('div');
                const textElement = document.createElement('div');
                const imgElement = document.createElement('div');
                imgElement.classList.add('pic');
                textElement.classList.add('info');
                quoteElement.classList.add('container');

                const imageElement = document.createElement('img');
                imageElement.src = image;
                imageElement.alt = character;

                const quoteTextElement = document.createElement('p');
                quoteTextElement.textContent = quote;

                const characterElement = document.createElement('p');
                characterElement.textContent = character;

                imgElement.appendChild(imageElement);
                textElement.appendChild(characterElement);
                textElement.appendChild(quoteTextElement);
                quoteElement.appendChild(imgElement);
                quoteElement.appendChild(textElement);
            
                quoteContainer.appendChild(quoteElement);
            });

            offset += charactersPerPage;
        } catch (error) {
            console.error('Error al obtener las citas:', error);
        }
    }

    loadQuotes(); // Cargar citas al cargar la página

    loadMoreButton.addEventListener('click', () => {
        loadQuotes();
    });

    searchInput.addEventListener('input', () => {
        offset = 0; // Reiniciar el offset al cambiar la búsqueda
        loadQuotes();
    });

    characterDirectionSelect.addEventListener('change', () => {
        offset = 0; // Reiniciar el offset al cambiar el filtro de dirección del personaje
        loadQuotes();
    });
});
