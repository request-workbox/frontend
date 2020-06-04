<template>
  <div id="container">
    <Request />
    <WorkflowList />
  </div>
  
</template>

<script>
import Request from './Request'
import WorkflowList from './WorkflowList'

export default {
  name: 'Dashboard',
  components: {
    Request,
    WorkflowList,
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
    flex-direction: column;
    background: rgba(29, 30, 33, 1);
}
</style>