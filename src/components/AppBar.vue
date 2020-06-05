<template>
  <div id="appbar-container">
    <AppBarNav />
  </div>
  
</template>

<script>
import AppBarNav from './AppBarNav'

export default {
  name: 'AppBar',
  components: {
    AppBarNav,
  }
}
</script>

<style lang="scss">
#appbar-container {
  display: flex;
  flex-direction:row;
}
</style>