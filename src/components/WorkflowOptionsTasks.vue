<template>
  <div class="column column-full-width">
    <WorkflowOptionsTasksPayload />
    <WorkflowOptionsTasksList />
    <WorkflowOptionsTasksWebhook />
  </div>
</template>

<script>
import WorkflowOptionsTasksPayload from './WorkflowOptionsTasksPayload'
import WorkflowOptionsTasksList from './WorkflowOptionsTasksList'
import WorkflowOptionsTasksWebhook from './WorkflowOptionsTasksWebhook'

export default {
  name: 'WorkflowOptionsTasks',
  components: {
    WorkflowOptionsTasksPayload,
    WorkflowOptionsTasksList,
    WorkflowOptionsTasksWebhook,
  }
};
</script>