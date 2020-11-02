<template>
  <div class="column column-full-width">
    <WorkflowOptionsTasksList />
    <WorkflowOptionsTasksWebhook />
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

import WorkflowOptionsTasksList from './WorkflowOptionsTasksList'
import WorkflowOptionsTasksWebhook from './WorkflowOptionsTasksWebhook'

export default {
  name: "WorkflowOptionsTasks",
  components: {
    WorkflowOptionsTasksList,
    WorkflowOptionsTasksWebhook,
  }
};
</script>