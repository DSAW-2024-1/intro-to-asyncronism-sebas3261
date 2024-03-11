document.addEventListener('DOMContentLoaded', () => {
    const quoteContainer = document.getElementById('characters');
    const loadMoreButton = document.getElementById('load');
    let offset = 0;
    const charactersPerPage = 10; // Ajuste para limitar la cantidad de personajes por página

    async function loadQuotes() {
        try {
            const response = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=${charactersPerPage}&offset=${offset}`);
            const data = await response.json();
            
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

            // Incrementar el offset para la próxima carga
            offset += charactersPerPage;
        } catch (error) {
            console.error('Error al obtener las citas:', error);
        }
    }

    // Cargar citas al cargar la página
    loadQuotes();

    // Agregar evento al botón "Cargar más"
    loadMoreButton.addEventListener('click', () => {
        loadQuotes();
    });
});
