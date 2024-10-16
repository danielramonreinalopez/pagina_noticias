(function () {
  console.log("Cargando Noticias");
})();

function noticiasIniciales() {
  const noticia1 = new Noticia(
    "Descubrimiento de un nuevo planeta",
    "Astrónomos han descubierto un nuevo planeta fuera del sistema solar. El planeta tiene características similares a la Tierra y podría albergar vida.",
    "https://static.nationalgeographic.es/files/styles/image_3200/public/8877.600x450.webp?w=760&h=570"
  );

  const noticia2 = new Noticia(
    "Innovación en energía renovable",
    "Científicos han desarrollado una nueva tecnología para generar energía a partir de fuentes renovables, prometiendo una revolución en el sector energético.",
    "https://www.energias-renovables.com/ficheroenergias/fotos/agenda/ampliada/p/proyectocelsos.jpg"
  );

  const noticia3 = new Noticia(
    "Cumbre mundial del cambio climático",
    "Líderes mundiales se reúnen para discutir estrategias y acciones para combatir el cambio climático, buscando acuerdos para reducir emisiones de carbono.",
    "https://www.consilium.europa.eu/media/46292/eucoclimate-infocus.jpg"
  );

  const noticia4 = new Noticia(
    "Avances en inteligencia artificial",
    "Un nuevo algoritmo de inteligencia artificial promete cambiar la manera en que interactuamos con la tecnología, aumentando la automatización en múltiples industrias.",
    "https://www.iberdrola.com/documents/20125/40288/Inteligencia_746x419.jpeg/36dfd4a5-da70-2f11-2c48-1a1f30934cc5?t=1627271717751"
  );

  const noticia5 = new Noticia(
    "Exploración de los océanos profundos",
    "Un equipo de científicos ha logrado explorar las zonas más profundas de los océanos, descubriendo nuevas formas de vida y sorprendentes paisajes submarinos.",
    "https://www.fundacionbankinter.org/wp-content/uploads/2022/01/image-2-1024x683.jpeg"
  );

  let noticias = [noticia1, noticia2, noticia3, noticia4, noticia5];
  console.log("Cargando " + noticias.length + " Noticias");

  
  noticias.forEach((noticia) => {
    let html = noticia.render(); 
    rNoticia(html);
  });

  noticias.forEach((n) => {
    console.log(n);
  });
}

function rNoticia($html) {
  document.getElementById("contenedorNoticias").innerHTML += $html;
}

let auxid = 1;
class Noticia {
  constructor(titulo, descripcion, imagen) {
    this.id = auxid++;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.likes = 0;
    this.dislikes = 0;
  }

  render() {
    return `
      <div class="post my-4 p-3 border rounder" id="post-${this.id}">
        <h2>${this.titulo}</h2>
        <img src="${this.imagen}" alt="${this.titulo}">
        <p>${this.descripcion}</p>
        <p>Likes: ${this.likes} - Dislikes: ${this.dislikes}</p>
        <button onclick="gestorNoticias.addLike(${this.id})">Like</button>
        <button onclick="gestorNoticias.addDislike(${this.id})">Dislike</button>
        <button onclick="gestorNoticias.removePost(${this.id})">Eliminar</button>
      </div>
    `;
  }
}

class GestorNoticias {
  constructor() {
    this.noticias = [];
  }

  agregarNoticia(titulo, descripcion, imagen) {
    const nuevaNoticia = new Noticia(titulo, descripcion, imagen);
    this.noticias.push(nuevaNoticia);
    this.renderNoticias();
  }

  addLike(id) {
    const noticia = this.noticias.find((n) => n.id === id);
    if (noticia) {
      noticia.likes++;
      this.renderNoticias();
    }
  }

  addDislike(id) {
    const noticia = this.noticias.find((n) => n.id === id);
    if (noticia) {
      noticia.dislikes++;
      this.renderNoticias();
    }
  }

  removePost(id) {
    this.noticias = this.noticias.filter((n) => n.id !== id);
    this.renderNoticias();
  }

  renderNoticias() {
    const contenedorNoticias = document.getElementById("contenedorNoticias");
    contenedorNoticias.innerHTML = "";
    this.noticias.forEach((noticia) => {
      contenedorNoticias.innerHTML += noticia.render();
    });
  }
}

const gestorNoticias = new GestorNoticias();

function agregarNoticia() {
  const titulo = document.getElementById("cTitulo").value;
  const descripcion = document.getElementById("cDescripcion").value;
  const imagen = document.getElementById("cImagen").value;

  if (titulo && descripcion && imagen) {
    gestorNoticias.agregarNoticia(titulo, descripcion, imagen);
    document.getElementById("cTitulo").value = "";
    document.getElementById("cDescripcion").value = "";
    document.getElementById("cImagen").value = "";
  } else {
    alert("Por favor, completa todos los campos.");
  }
}
