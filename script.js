const urlDb = 'https://dragonball-api.com/api/characters'



// Hacer la solicitud a la API de Dragon Ball
fetch(urlDb)
  .then(response => response.json()) // Convertir la respuesta a JSON
  .then(data => {
    console.log(data); // Ver la estructura de la respuesta
    if (data && data.items) { // Verificar si hay personajes en los datos
      const characters = data.items; // Obtener la lista de personajes
      const charactersContainer = document.getElementById('characters'); // Contenedor para las tarjetas
      
      // Recorrer cada personaje y crear su tarjeta
      characters.forEach(character => {
        const card = document.createElement('div'); // Crear un contenedor para la tarjeta
        card.classList.add('col-md-4', 'mb-4'); // Añadir clases de Bootstrap para la columna y el espaciado
        
        // Crear el HTML de la tarjeta
        card.innerHTML = `
          <div class="card">
            <img src="${character.image}" class="card-img-top" alt="${character.name}">
            <div class="card-body">
              <h5 class="card-title">${character.name}</h5>
              <p class="card-text">Especie: ${character.species}</p>
              <p class="card-text">Raza: ${character.race}</p>
              <p class="card-text">ki: ${character.ki}</p>
              <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDescription${character.id}" aria-expanded="false" aria-controls="collapseDescription${character.id}">
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
        
        charactersContainer.appendChild(card); // Añadir la tarjeta al contenedor
        
        // Agregar el comportamiento de alternancia de collapse manualmente
        const collapseElement = document.getElementById(`collapseDescription${character.id}`); // Obtener el div de la descripción
        const button = card.querySelector("button"); // Obtener el botón de la tarjeta
        
        button.addEventListener('click', function() { // Agregar evento de clic al botón
          // Alternar el estado de la clase collapse/show
          if (collapseElement.classList.contains('collapse')) {
            collapseElement.classList.remove('collapse'); // Mostrar la descripción
            collapseElement.classList.add('show');
          } else {
            collapseElement.classList.remove('show'); // Ocultar la descripción
            collapseElement.classList.add('collapse');
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
