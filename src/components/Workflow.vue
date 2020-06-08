<template>
  <div id="workflow-container">
    <WorkflowList />
    <WorkflowDetails />
  </div>
  
</template>

<script>
import WorkflowList from './WorkflowList'
import WorkflowDetails from './WorkflowDetails'

export default {
  name: 'Workflow',
  components: {
    WorkflowList,
    WorkflowDetails,
  }
}
</script>

<style lang="scss">
#workflow-container {
  display: flex;
  flex-direction:column;
  align-items: flex-start;

  background: #04012e;
  // background: #0059c1;
  
  // padding: 15px 0 0 15px;
}
</style>