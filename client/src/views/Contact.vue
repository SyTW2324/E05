<template>
  <div class="Contacto">
  <div class="background">
  <div class="content-box">
    <h1>Sobre Nosotros</h1>
  </div>
  <br>
  <div class="content-box">
    <h2>¿Quiénes somos?</h2>
    <p>Somos un grupo de estudiantes de la Universidad de La Laguna (Tenerife) amantes de los juegos de cartas con el objetivo de crear una aplicacion web que todos los amantes de cartas puedan usar comodamente para compartir sus barajas.</p>
  </div>
  <br>
  <div class="content-box">
    <h2>Contactanos</h2>
    <p>Si tienes alguna duda, comentario, o ves algo que no funciona correctamente, ponte en contacto con nosostros. somos:</p>
    <lu>
      <p>Fernando: alu0101413549@ull.edu.es</p>
      <p>Pablo: alu0101398327@ull.edu.es</p>
    </lu>
    <p>O en el telefono: +34 111 22 33 44</p>
  </div>
  </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.background {
  background-image: url('https://wallpapercosmos.com/w/middle-retina/4/1/1/1430-3840x2160-desktop-4k-hearthstone-background-photo.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  text-align: center;
  margin-top: 0px;
  height: 100vh;
}

.content-box {
  background-color: rgba(255, 255, 255, 0.8); /* Fondo blanco semi-transparente */
  border: 1px solid #ccc; /* Borde gris */
  border-radius: 10px; /* Borde redondeado */
  padding: 20px;
  text-align: center;
}
</style>
