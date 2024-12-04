<template>
  <div id="app">
    <GameCardsStack
      :cards="visibleCards"
      @cardAccepted="handleCardAccepted"
      @cardRejected="handleCardRejected"
      @cardSkipped="handleCardSkipped"
      @hideCard="removeCardFromDeck"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import GameCardsStack from "@/components/GameCardsStack.vue";




// Definición de la propiedad reactiva
const visibleCards = ref([
{ title: "Hi!! I'm Belén,", text: "a Multimedia and Graphic Designer and currently studying a Master's degree in UX/UI, in Madrid." },
{ title: "2", text: "Texto de la segunda carta." },
  { title: "Título 3", text: "Más detalles de la tercera carta." }
]);

// Definición de los métodos
function handleCardAccepted() {
  console.log("handleCardAccepted");
}

function handleCardRejected() {
  console.log("handleCardRejected");
}

function handleCardSkipped() {
  console.log("handleCardSkipped");
}

function removeCardFromDeck() {
  visibleCards.value.shift(); // Usar .value para acceder a la propiedad de ref
}
</script>

<style lang="scss" scoped >
body {
  background-color: #f7fdfb;
  color: #062016;
}

.dark-mode body {
  background-color: #020806;
  color: #e1f9f0;
}

</style>
