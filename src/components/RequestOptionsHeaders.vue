<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-checkbox">
          <input type="checkbox" id="options-header-checkbox" disabled />
        </div>
        <div class="column column-data column-header-text column-10" id="options-header-1">Key</div>
        <div class="column column-data column-header-text column-grow" id="options-header-2">Value</div>
      </div>

      <div class="row row-border-bottom" v-for="value in this.requestDetails.headers" :key="value._id">
        <div class="column column-data column-checkbox">
          <input type="checkbox" id="options-data-checkbox" :checked="value.acceptInput" v-on:input="editAcceptInput('headers', value._id, $event)" />
        </div>
        <div class="column column-data column-10">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            :value="value.key"
            v-on:input="editKey('headers', value._id, $event)"
          />
        </div>
        <div class="column column-data column-grow">
          <input
            type="text"
            placeholder="Value"
            class="column-input-text"
            :value="value.value"
            v-on:input="editValue('headers', value._id, $event)"
          />
        </div>
        <div class="column column-data text-button" v-on:click="deleteRequestDetailItem(value)">
          Delete
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "RequestOptionsHeaders",
  computed: {
    ...mapState("request/requestTable", ["requestDetails"])
  },
  methods: {
    ...mapMutations('request/requestTable', ['editRequestDetailKey', 'editRequestDetailValue', 'editRequestDetailAcceptInput']),
    ...mapActions('request/requestTable', ['deleteRequestDetailItem']),
    editKey: function(type, key, event) {
      this.editRequestDetailKey({type, key, value: event.target.value})
    },
    editValue: function(type, key, event) {
      this.editRequestDetailValue({type, key, value: event.target.value})
    },
    editAcceptInput: function(type, key, event) {
      this.editRequestDetailAcceptInput({type, key, value: event.target.checked})
    },
  },
};
</script>