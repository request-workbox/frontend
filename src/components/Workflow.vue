<template>
  <div id="workflow-container">
    <WorkflowList />
    <WorkflowOptions />
    <WorkflowContext />
  </div>
  
</template>

<script>
import WorkflowList from './WorkflowList'
import WorkflowOptions from './WorkflowOptions'
import WorkflowContext from './WorkflowContext'

export default {
  name: 'Request',
  components: {
    WorkflowList,
    WorkflowOptions,
    WorkflowContext,
  }
}
</script>

<style lang="scss">
#workflow-container {
  display: flex;
  flex-direction:row;
}
</style>