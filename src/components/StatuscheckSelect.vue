<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-30 column-padded">
          <select
              class="input-select-stretch min-height-35 text-15 text-weight-500"
              :value="selectedWorkflowId"
              v-on:input="changeSelectedWorkflowId($event)"
            >
              <option value="">Select Workflow</option>
              <option
                v-for="(workflow) in workflowsForSelect()"
                :key="workflow._id"
                :value="workflow._id"
              >{{ workflow.name }}</option>
            </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "StatuscheckSelect",
  computed: {
    ...mapState('statuscheck', ['selectedWorkflowId']),
    ...mapGetters('statuscheck', ['workflowsForSelect']),
  },
  methods: {
    ...mapMutations('statuscheck', ['changeSelectedWorkflowId'])
  }
};
</script>

<style lang="scss">
.input-select-stretch {
  width: stretch !important;
}
.min-height-35 {
  min-height:35px;
}
</style>