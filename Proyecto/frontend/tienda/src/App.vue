<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MenuView from './views/MenuView.vue'
</script>

<template>
  <header>
    <h1>HelloWorld</h1>
    <MenuView/>
    
  </header>

  <RouterView />
</template>

