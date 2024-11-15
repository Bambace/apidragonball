const urlDb = 'https://dragonball-api.com/api/characters'


fetch(urlDb)
  .then(response => response.json())
  .then(data => {
    if (data && data.items) {
      const characters = data.items;
      const charactersContainer = document.getElementById('characters');

      characters.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4');
        card.innerHTML = `
          <div class="card">
            <img src="${character.image}" class="card-img-top" alt="${character.name}">
            <div class="card-body">
              <h5 class="card-title">${character.name}</h5>
              <p class="card-text">Especie: ${character.species}</p>
              <p class="card-text">Raza: ${character.race}</p>
              <p class="card-text">Ki: ${character.ki}</p>
              <button class="btn btn-primary toggle-description" type="button" id="btn${character.id}">
                Ver descripción
              </button>
              <div class="collapse mt-3" id="collapseDescription${character.id}">
                <div class="card card-body">
                  <p>${character.description || "No hay descripción disponible"}</p>
                </div>
              </div>
            </div>
          </div>
        `;
        charactersContainer.appendChild(card);

        // Controlar el colapso manualmente
        const button = document.getElementById(`btn${character.id}`);
        const description = document.getElementById(`collapseDescription${character.id}`);

        button.addEventListener('click', () => {
          if (description.classList.contains('show')) {
            description.classList.remove('show'); // Ocultar descripción
          } else {
            description.classList.add('show'); // Mostrar descripción
          }
        });
      });
    } else {
      console.error('No se encontraron personajes o la estructura es incorrecta');
    }
  })
  .catch(error => {
    console.error('Error al cargar los personajes:', error);
  });
