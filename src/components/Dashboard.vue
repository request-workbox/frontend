<template>
  <div id="container">
    <CreateRequest />
    <CreateRequestBeta />
  </div>
  
</template>

<script>
import CreateRequest from './CreateRequest'
import CreateRequestBeta from './CreateRequestBeta'

export default {
  name: 'Dashboard',
  components: {
    CreateRequest,
    CreateRequestBeta
  }
}
</script>

<style lang="scss">
#container {
    top: 0;
    bottom:0;
    left: 0;
    right: 0;
    position: absolute;
    display: flex;
    background: rgba(29, 30, 33, 1);
}
</style>