<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-20" id="options-header-1">Setting</div>
        <div class="column column-data column-header-text column-grow" id="options-header-2">Setting Value</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Description</div>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedData()._id">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Name"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <input
            type="text"
            placeholder="Value"
            class="column-input-text"
            :value="this.selectedData().name"
            v-on:input="editWorkflowDetailAction('name', $event)"
          />
        </div>
      </div>



      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Timeout</div>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedData()._id">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Timeout Length"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <select class="column-input-select" :value="this.selectedData().timeout" v-on:input="editWorkflowDetailAction('timeout', $event)">
            <option value="30seconds">30 Seconds</option>
            <option value="60seconds">60 Seconds</option>
          </select>
        </div>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedData()._id">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Timeout Action"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <select class="column-input-select" :value="this.selectedData().onTimeout" v-on:input="editWorkflowDetailAction('onTimeout', $event)">
            <option value="stop">Stop</option>
            <option value="send200Continue">Send 200 and Continue</option>
            <option value="send500Continue">Send 500 and Continue</option>
          </select>
        </div>
      </div>


      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Environment</div>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedData()._id">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Environment"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <select class="column-input-select" :value="this.selectedData().environment" v-on:input="editWorkflowDetailAction('environment', $event)">
            <option value="">Environment</option>
          </select>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "WorkflowOptionsSettings",
  computed: {
    ...mapGetters("table", ["selectedData"])
  },
  methods: {
    ...mapMutations('table', ['editWorkflowDetail']),
    editWorkflowDetailAction: function(key, event) {
      this.editWorkflowDetail({key, value: event.target.value, workflowId: this.selectedData()._id})
    }
  }
};
</script>