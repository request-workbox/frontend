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
    top: 0;
    left: 0;
    right: 0;
    height: auto;
    position: absolute;
    display: flex;
    flex-direction: column;
    background: rgba(29, 30, 33, 1);
}
</style>