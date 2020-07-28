<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-20" id="options-header-1">Setting</div>
        <div class="column column-data column-header-text column-grow" id="options-header-2">Setting Value</div>
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
            value="Timeout"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <select class="column-input-select" :value="this.selectedData().timeout">
            <option value="30">30</option>
            <option value="60">60</option>
          </select>
        </div>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedData()._id">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="On Timeout"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <select class="column-input-select" :value="this.selectedData().onTimeout" v-on:input="edit('onTimeout', 'adapterType', $event)">
            <option value="stop">Stop</option>
            <option value="send200Continue">Send 200 and continue</option>
            <option value="send500Continue">Send 500 and continue</option>
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
    edit: function(type, key, event) {
      this.editWorkflowDetail({type, key, value: event.target.value, requestId: this.selectedData()._id})
    }
  }
};
</script>