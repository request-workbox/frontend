<template>
  <div id="container">
    <Request />
    <Workflow />
  </div>
  
</template>

<script>
import Request from './Request'
import Workflow from './Workflow'

export default {
  name: 'Dashboard',
  components: {
    Request,
    Workflow,
  }
}
</script>

<style lang="scss">
#container {
    height: auto;
    display: flex;
    flex-direction: column;
    background: rgba(29, 30, 33, 1);
}
</style>