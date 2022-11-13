import { getAllProducts, getProductsByCategory } from "../Request/request.js";
import { modelCardProduct } from "../Cards/Card.js";

let productsFiltered = [];

// Función para desaprecer mensajes de error renderizados y mostrar el catálogo de productos.
function displayGrid(){
  document.getElementById("containerProducts").style.display = "grid";
  document.getElementById('divWithoutProduct').style.display = "none";
  document.getElementById('divProductNotFound').style.display = "none";
  $('.categoryLink').removeClass('selected');
  $("#containerProducts").empty(); //Vacío el contenedor para cargar las nuevas cards
}

// Función para mostrar mensajes de error, vaciar el contenedor y ocultar el catálogo de productos.
function displayMessageError(){
  $("#containerProducts").empty();
  document.getElementById("containerProducts").style.display = "none";
  document.getElementById('divProductNotFound').style.display = "none";
  document.getElementById('divWithoutProduct').style.display = "block";
}

//Para filtrar por categoria.
$(".list-group").on("click", async (e) => {
  e.preventDefault();
  if (e.target.id === "") {
    // Si no se le pasa un identificador de categoria, devuelve un error.
    throw ("Null filter");

  } else if(e.target.id === 'allCategories'){
    //Me traigo todos los productos.
      productsFiltered = await getAllProducts();
      if(productsFiltered.hasOwnProperty("error_message")){displayMessageError()}
      if (productsFiltered.length) {
        displayGrid();
        $(`#${e.target.id}`).addClass('selected');
        document.getElementById("titleResult").style.display = "none";
        productsFiltered.forEach((product) => {
          $(modelCardProduct(product)).appendTo("#containerProducts");
        });
        $('body, html').animate({scrollTop: '0px'}, 300); //Me permite volver al principio de la página.
      }

    }else if(e.target.id !== 'allCategories'){
      //Me traigo los productos filtrados por categoría.
      productsFiltered = await getProductsByCategory(e.target.id);
      if(productsFiltered.hasOwnProperty("error_message")){displayMessageError()}
      try {
        if (productsFiltered.products) {
          displayGrid();
          $(`#${e.target.id}`).addClass('selected');
          document.getElementById("titleResult").style.display = "block";
          $("#titleResult").text(`Resultados para: ${e.target.name}`);
          productsFiltered.products.forEach((product) => {
            $(modelCardProduct(product)).appendTo("#containerProducts");
          });
          $('body, html').animate({scrollTop: '0px'}, 300); //Me permite volver al principio de la página.
        }  
      } catch (error) {
        displayMessageError();
      }
      
    }else{
      displayMessageError()
    }
  }
);