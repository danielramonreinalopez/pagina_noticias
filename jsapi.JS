(function () {

    //alert("Ready Dom!!!");
    console.log(" Cargando Noticias");
  
  
  })();
  
  function cargaInicial() {
    const url = "https://pokeapi.co/api/v2/pokemon/";
  
    for (let index = 1; index < 100; index++) {
      fetch(url+index)
      .then(response => response.json())
      .then(data => mostrarBicho(data));
      
    }
  }
  
  function agregarPost($html) {
    document.getElementById("contenedorPokemones").innerHTML += $html;
    }
  
  function mostrarBicho(pokemon) {
    //console.log(pokemon);
    let id = pokemon.id
    let name = pokemon.name;
    let height = pokemon.height;
    let weight = pokemon.weight;
    let abilities = pokemon.abilities;
    let stats = pokemon.stats;
  
    let image = pokemon.sprites.other['official-artwork'].front_default;
  
    let nuevo_html = `<div class="row post" id="${id}">
                           <div class="row">
                               <div class="col-sm-4">
                                 <img class="img-thumbnail" alt="Noticia" src="${image} " /> 
                               </div>
                               <div class="col-sm-4">
                                 <h5> ${id}-${name}  </h5>
                                 <p> Con una altura de  ${height}M  
                                 y un peso de ${weight}KG 
                                 y habilidades ${abilities.map( aux => {return `<p> ${aux.base_ability} </p>`} ).flat().join(" ")} </p>
                                 y los stats ${stats.map( aux => {return `<p> ${aux.base_stat} </p>`} ).flat().join(" ")} </p>
                               </div>
                             </div>
                             <div class="row">
                               <div class="col-sm-3">  fechas</div>
                               <div class="col-sm-3"><i onclick="addLike('like${id}')" class="bi bi-hand-thumbs-up-fill"></i> <span id='like${id}'>0</span> </div>
                               <div class="col-sm-3"><i class="bi bi-hand-thumbs-down-fill"></i></div>
                               <div class="col-sm-3"><i onclick="remove(${id})"class="bi bi-x-circle-fill"></i></div>
                             </div>
                         </div>`;
  
                         agregarPost(nuevo_html);
  
  }
  
  function addLike(id) {
  
    let actual = document.getElementById(id).innerHTML;
    let nuevo = parseInt(actual) + 1;
    document.getElementById(id).innerHTML = nuevo;
  }