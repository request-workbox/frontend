<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-10">Key</div>
        <div class="column column-data column-header-text column-20">Type</div>
        <div class="column column-data column-header-text column-grow">Value</div>
      </div>

      <div class="row row-border-bottom" v-for="value in this.selectedData().query" :key="value._id">
        <div class="column column-data column-10">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            :value="value.key"
            v-on:input="editKey('query', value._id, $event)"
          />
        </div>
        <div class="column column-data column-20">
          <select class="column-input-select" :value="value.valueType" v-on:input="editValueType('query', value._id, $event)">
              <option value="textInput">Text Input</option>
              <option value="storage">Storage</option>
              <option value="runtimeResult">Runtime Result</option>
              <option value="incomingField">Incoming Field</option>
            </select>
        </div>
        <div class="column column-data column-grow" v-if="value.valueType === 'textInput'">
          <input
            type="text"
            placeholder="Text Input Value"
            class="column-input-text"
            :value="value.value"
            v-on:input="editValue('query', value._id, $event)"
          />
        </div>
        <div class="column column-data column-grow" v-if="value.valueType === 'storage'">
          <select class="column-input-select" :value="value.value" v-on:input="editValue('query', value._id, $event)">
              <option
                  v-for="(storage) in storagesForSelect()"
                  :key="storage._id"
                  :value="storage._id"
                >{{ storage.name }}</option>
            </select>
        </div>
        <div class="column column-data column-grow" v-if="value.valueType === 'runtimeResult'">
          <input
            type="text"
            placeholder="Result Name"
            class="column-input-text"
            :value="value.value"
            v-on:input="editValue('query', value._id, $event)"
          />
        </div>
        <div class="column column-data column-grow" v-if="value.valueType === 'incomingField'">
          <input
            type="text"
            placeholder="Field Name"
            class="column-input-text"
            :value="value.value"
            v-on:input="editValue('query', value._id, $event)"
          />
        </div>
        <div class="column column-data text-button" v-on:click="deleteRequestDetailItemAction(value)">
          Delete
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  name: "RequestOptionsQuery",
  computed: {
    ...mapGetters("table", ["selectedData",'storagesForSelect'])
  },
  methods: {
    ...mapMutations('table', ['editRequestDetailKey', 'editRequestDetailValue','editRequestDetailValueType']),
    ...mapActions('table', ['deleteRequestDetailItem']),
    editKey: function(type, key, event) {
      this.editRequestDetailKey({type, key, value: event.target.value, requestId: this.selectedData()._id})
    },
    editValue: function(type, key, event) {
      this.editRequestDetailValue({type, key, value: event.target.value, requestId: this.selectedData()._id})
    },
    editValueType: function(type, key, event) {
      this.editRequestDetailValueType({type, key, value: event.target.value, requestId: this.selectedData()._id})
    },
    deleteRequestDetailItemAction: function(value) {
      this.deleteRequestDetailItem({ detailItem: value, requestId: this.selectedData()._id, option: 'query'})
    }
  },
};
</script>