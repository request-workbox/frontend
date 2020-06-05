<template>
  <div id="container">
    <Request />
    <Workflow />
    <Instance />
  </div>
  
</template>

<script>
import Request from './Request'
import Workflow from './Workflow'
import Instance from './Instance'

export default {
  name: 'Dashboard',
  components: {
    Request,
    Workflow,
    Instance,
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