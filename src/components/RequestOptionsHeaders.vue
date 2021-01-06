<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom row-border-bottom-tall">
        <div class="column column-data column-uparrow-hidden">
          <input type="checkbox" class="visibility-hidden">
        </div>
        <div class="column column-data column-header-text column-10">Key</div>
        <div class="column column-data column-header-text column-20">Type</div>
        <div class="column column-data column-header-text column-20">Value</div>
      </div>

      <div class="row row-border-bottom" 
        v-for="detailItem in this.selectedRequest().headers"
        :key="detailItem._id">
        <div class="column column-data column-uparrow-hidden">
          <input 
            type="checkbox"
            :checked="detailItem.active"
            @change="editActive('headers', detailItem._id, $event)">
        </div>
        <div class="column column-data column-10">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            :value="detailItem.key"
            v-on:input="editKey('headers', detailItem._id, $event)"
          />
        </div>
        <div class="column column-data column-20">
          <select class="column-input-select border-hidden column-input-select-stretch" 
            :value="detailItem.valueType" 
            v-on:input="editValueType('headers', detailItem._id, $event)">
              <option value="textInput">Text Input</option>
              <option value="storage">Storage</option>
              <option value="runtimeResult">Runtime Result</option>
              <option value="incomingField">Incoming Field</option>
            </select>
        </div>
        <div class="column column-data column-20" 
          v-if="detailItem.valueType === 'textInput'">
          <input
            type="text"
            placeholder="Text Input Value"
            class="column-input-text"
            :value="detailItem.value"
            v-on:input="editValue('headers', detailItem._id, $event)"
          />
        </div>
        <div class="column column-data column-20" 
          v-if="detailItem.valueType === 'storage'">
          <select class="column-input-select border-hidden column-input-select-stretch" 
            :value="detailItem.value" 
            v-on:input="editValue('headers', detailItem._id, $event)">
              <option
                v-for="(storage) in storagesForSelect()"
                :key="storage._id"
                :value="storage._id">{{ storage.name }}</option>
            </select>
        </div>
        <div class="column column-data column-20" v-if="detailItem.valueType === 'runtimeResult'">
          <input
            type="text"
            placeholder="Request result name"
            class="column-input-text"
            :value="detailItem.value"
            v-on:input="editValue('headers', detailItem._id, $event)"
          />
        </div>
        <div class="column column-data column-20" v-if="detailItem.valueType === 'incomingField'">
          <input
            type="text"
            placeholder="Field Name"
            class="column-input-text"
            :value="detailItem.value"
            v-on:input="editValue('headers', detailItem._id, $event)"
          />
        </div>
        <div class="column text-button action" v-on:click="deleteRequestDetailItemAction(detailItem)">
          Delete
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'RequestOptionsHeaders',
  computed: {
    ...mapGetters('request', ['selectedRequest']),
  },
  methods: {
    ...mapMutations('request', ['editRequestDetailKey', 'editRequestDetailValue','editRequestDetailValueType','editRequestDetailActive','editRequestDetailActive']),
    ...mapActions('request', ['deleteRequestDetailItem']),
    editKey: function(type, key, event) {
      this.editRequestDetailKey({type, key, value: event.target.value, requestId: this.selectedRequest()._id})
    },
    editValue: function(type, key, event) {
      this.editRequestDetailValue({type, key, value: event.target.value, requestId: this.selectedRequest()._id})
    },
    editValueType: function(type, key, event) {
      this.editRequestDetailValueType({type, key, value: event.target.value, requestId: this.selectedRequest()._id})
    },
    editActive: function(type, key, event) {
      this.editRequestDetailActive({type, key, value: event.target.checked, requestId: this.selectedRequest()._id})
    },
    deleteRequestDetailItemAction: function(detailItem) {
      try {
        const confirm = window.confirm('Are you sure you want to delete this item?')
        if (confirm) {
          this.deleteRequestDetailItem({ detailItem, requestId: this.selectedRequest()._id, option: 'headers'})
        }
      } catch(err) {
        console.log('Request options headers error', err.message)
      }
    }
  },
};
</script>