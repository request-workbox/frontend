<template>
  <div id="workflowlist-container">
      <WorkflowListActionButtons />
      <WorkflowListRows />
  </div>
  
</template>

<script>
import WorkflowListRows from './WorkflowListRows'
import WorkflowListActionButtons from './WorkflowListActionButtons'

export default {
  name: 'WorkflowList',
  components: {
    WorkflowListRows,
    WorkflowListActionButtons,
  }
}
</script>

<style lang="scss">
#workflowlist-container {
  display: flex;
  flex-direction:column;
  width: 100%;
}
</style>