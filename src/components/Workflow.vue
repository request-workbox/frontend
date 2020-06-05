<template>
  <div id="workflow-container">
    <WorkflowList />
    <WorkflowOptions />
    <WorkflowContext />
    <WorkflowDetails />
  </div>
  
</template>

<script>
import WorkflowList from './WorkflowList'
import WorkflowOptions from './WorkflowOptions'
import WorkflowContext from './WorkflowContext'
import WorkflowDetails from './WorkflowDetails'

export default {
  name: 'Workflow',
  components: {
    WorkflowList,
    WorkflowOptions,
    WorkflowContext,
    WorkflowDetails,
  }
}
</script>

<style lang="scss">
#workflow-container {
  display: flex;
  flex-direction:row;
}
</style>