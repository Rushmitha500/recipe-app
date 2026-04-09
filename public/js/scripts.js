const addCards = (items) => {
  $('#card-section').empty();

  items.forEach((item) => {
    const card = `
      <div class="col s12 m6 l4">
        <div class="card medium hoverable">
          <div class="card-image">
            <img src="${item.image}" alt="${item.recipeName}">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">
              ${item.recipeName}
              <i class="material-icons right">more_vert</i>
            </span>
            <p><strong>${item.cuisineType}</strong> • ${item.cookingTime}</p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">
              ${item.recipeName}
              <i class="material-icons right">close</i>
            </span>
            <p><strong>Difficulty:</strong> ${item.difficulty}</p>
            <p>${item.description}</p>
          </div>
        </div>
      </div>
    `;
    $('#card-section').append(card);
  });
};

const getRecipes = () => {
  fetch('/recipes')
    .then((response) => response.json())
    .then((data) => {
      if (data.statusCode === 200) {
        addCards(data.data);
      }
    })
    .catch((error) => {
      console.log('Error loading recipes:', error);
    });
};

const submitForm = () => {
  const formData = {
    recipeName: $('#recipeName').val(),
    cuisineType: $('#cuisineType').val(),
    cookingTime: $('#cookingTime').val(),
    difficulty: $('#difficulty').val(),
    image: $('#image').val(),
    description: $('#description').val()
  };

  fetch('/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.statusCode === 200) {
        M.toast({ html: 'Recipe added successfully' });
        $('#recipeForm')[0].reset();
        M.updateTextFields();
        getRecipes();
        const instance = M.Modal.getInstance(document.getElementById('modal1'));
        instance.close();
      }
    })
    .catch((error) => {
      console.log('Error adding recipe:', error);
    });
};

$(document).ready(function () {
  $('.modal').modal();
  getRecipes();

  $('#recipeForm').on('submit', function (e) {
    e.preventDefault();
    submitForm();
  });
});