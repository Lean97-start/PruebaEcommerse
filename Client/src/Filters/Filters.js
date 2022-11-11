import { getAllProducts, getProductsByCategory } from "../Request/request.js";
import { modelCardProduct } from "../Cards/Card.js";

let productsFiltered = [];

//Para filtrar por categoria.
$(".list-group").on("click", async (e) => {
  e.preventDefault();
  if (e.target.id === "") {
    console.log("Null filter");
  } else if(e.target.id === 'allCategories'){
      productsFiltered = await getAllProducts();
      if (productsFiltered.length) {
        $("#containerProducts").empty(); //Vacío el contenedor para cargar las nuevas cards
        productsFiltered.forEach((product) => {
          $(modelCardProduct(product)).appendTo("#containerProducts");
        });
      }
    }
    productsFiltered = await getProductsByCategory(e.target.id);
    if (productsFiltered.length) {
      $("#containerProducts").empty(); //Vacío el contenedor para cargar las nuevas cards
      productsFiltered.forEach((product) => {
        $(modelCardProduct(product)).appendTo("#containerProducts");
      });
    }
  }
);
