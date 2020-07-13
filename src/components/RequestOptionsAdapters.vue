<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-20" id="options-header-1">Adapter</div>
        <div class="column column-data column-header-text column-grow" id="options-header-2">On Adapter Failure</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Request Adapters</div>
      </div>

      <div class="row row-border-bottom" v-if="this.requestDetails._id">
        <div class="column column-data column-20">
          <select class="column-input-select column-input-select-grow">
            <option value="request">Request Adapter</option>
            <option value="adapter">Request Adapter 2</option>
          </select>
        </div>
        <div class="column column-data column-grow">
          <select class="column-input-select">
            <option value="continueWorkflow">Continue Workflow</option>
            <option value="stopWorkflow">Stop Workflow</option>
            <option value="repeatAttempt">Repeat Attempt</option>
          </select>
        </div>
        <div class="column column-data text-button" v-on:click="removeRequestAdapter()">
          Remove
        </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Response Adapters</div>
      </div>

      <div class="row row-border-bottom" v-if="this.requestDetails._id">
        <div class="column column-data column-20">
          <select class="column-input-select column-input-select-grow">
            <option value="request">Response Adapter</option>
            <option value="adapter">Response Adapter 2</option>
          </select>
        </div>
        <div class="column column-data column-grow">
          <select class="column-input-select">
            <option value="continueWorkflow">Continue Workflow</option>
            <option value="stopWorkflow">Stop Workflow</option>
            <option value="repeatAttempt">Repeat Attempt</option>
          </select>
        </div>
        <div class="column column-data text-button" v-on:click="removeResponseAdapter()">
          Remove
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "RequestOptionsAdapters",
  computed: {
    ...mapState('request/requestTable', ['requestDetails']),
  },
  methods: {
      removeRequestAdapter: function() {
        console.log('remove request adapter')
      },
      removeResponseAdapter: function() {
        console.log('remove response adapter')
      },
    }
};
</script>