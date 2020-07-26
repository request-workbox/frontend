<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-20" id="options-header-1">Permission</div>
        <div class="column column-data column-header-text column-grow" id="options-header-2">Permission Value</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Request</div>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedData()._id">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Available As"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <input
            type="text"
            placeholder="Value"
            class="column-input-text"
            :value="this.selectedData().taskPermissions.requestAvailableAs"
            v-on:input="edit('taskPermissions', 'requestAvailableAs', $event)"
          />
        </div>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedData()._id">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Available To"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <select class="column-input-select" :value="this.selectedData().taskPermissions.requestAvailableTo" v-on:input="edit('taskPermissions', 'requestAvailableTo', $event)">
            <option value="any">Any Workflow Task</option>
            <option value="project">Any Workflow Task From This Project</option>
            <option value="none">No Other Task</option>
          </select>
        </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Response</div>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedData()._id">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Available As"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <input
            type="text"
            placeholder="Value"
            class="column-input-text"
            :value="this.selectedData().taskPermissions.responseAvailableAs"
            v-on:input="edit('taskPermissions', 'responseAvailableAs', $event)"
          />
        </div>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedData()._id">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Available To"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <select class="column-input-select" :value="this.selectedData().taskPermissions.responseAvailableTo" v-on:input="edit('taskPermissions', 'responseAvailableTo', $event)">
            <option value="any">Any Workflow Task</option>
            <option value="project">Any Workflow Task From This Project</option>
            <option value="none">No Other Task</option>
          </select>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "RequestOptionsPermissions",
  computed: {
    ...mapGetters("table", ["selectedData"])
  },
  methods: {
    ...mapMutations('table', ['editRequestDetail']),
    edit: function(type, key, event) {
      this.editRequestDetail({type, key, value: event.target.value, requestId: this.selectedData()._id})
    }
  }
};
</script>