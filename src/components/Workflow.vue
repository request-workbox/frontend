<template>
  <div id="workflow-container">
    <WorkflowList />
    <WorkflowOptions />
  </div>
  
</template>

<script>
import WorkflowList from './WorkflowList'
import WorkflowOptions from './WorkflowOptions'

export default {
  name: 'Request',
  components: {
    WorkflowList,
    WorkflowOptions,
  }
}
</script>

<style lang="scss">
#workflow-container {
  display: flex;
  flex-direction:row;
}
</style>