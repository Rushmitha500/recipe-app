const submitForm = () => {
  const formData = {
    first_name: $('#first_name').val(),
    last_name: $('#last_name').val(),
    password: $('#password').val(),
    email: $('#email').val()
  };

  console.log('Form Data Submitted:', formData);
};

const addCards = (items) => {
  $('#card-section').empty();

  items.forEach((item) => {
    const itemToAppend = `
      <div class="col s12 m6 l4 center-align">
        <div class="card medium hoverable">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="${item.image}" alt="${item.title}">
          </div>

          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">
              ${item.title}
              <i class="material-icons right">more_vert</i>
            </span>
            <p><a href="#">${item.link}</a></p>
          </div>

          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">
              ${item.title}
              <i class="material-icons right">close</i>
            </span>
            <p class="card-text">${item.description}</p>
          </div>
        </div>
      </div>
    `;

    $('#card-section').append(itemToAppend);
  });
};

const getRecipes = () => {
  fetch('/recipes')
    .then((response) => response.json())
    .then((result) => {
      if (result.statusCode === 200) {
        addCards(result.data);
      }
    })
    .catch((error) => {
      console.error('Error loading recipes:', error);
    });
};

$(document).ready(function () {
  $('.materialboxed').materialbox();
  $('.modal').modal();

  getRecipes();

  $('#recipeForm').on('submit', function (event) {
    event.preventDefault();
    submitForm();
    M.toast({ html: 'Form submitted successfully' });
    $('#recipeForm')[0].reset();
    M.updateTextFields();
    const instance = M.Modal.getInstance(document.getElementById('modal1'));
    instance.close();
  });
});