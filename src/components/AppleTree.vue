<script setup>
import { useAppleTreeStore } from '../stores/index'

const appleStore = useAppleTreeStore()


function shakeTree() {
  appleStore.setShackingStatus(true)
  setTimeout(() => {
    appleStore.dropDownApples()
  }, 100)
}

</script>

<template>
  <div :class="{ shake: appleStore.shackingStatus }" @contextmenu.prevent>
    <img src="../assets/appletree.svg" width="800" height="800" alt="Apple Tree" @click="shakeTree" />
  </div>
</template>

<style scoped>

</style>