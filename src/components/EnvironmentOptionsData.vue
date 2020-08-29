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

      <div class="row row-border-bottom" v-for="value in this.selectedData().data" :key="value._id">
        <div class="column column-data column-checkbox">
          <input type="checkbox" id="options-data-checkbox" :checked="value.active" v-on:input="editActive('data', value._id, $event)" />
        </div>
        <div class="column column-data column-10">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            :value="value.key"
            v-on:input="editKey('data', value._id, $event)"
          />
        </div>
        <div class="column column-data column-grow">
          <input
            type="text"
            placeholder="Value"
            class="column-input-text"
            :value="value.value"
            v-on:input="editValue('data', value._id, $event)"
          />
        </div>
        <div class="column column-data text-button" v-on:click="deleteEnvironmentDetailItemAction(value)">
          Delete
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  name: "EnvironmentOptionsData",
  computed: {
    ...mapGetters("table", ["selectedData"])
  },
  methods: {
    ...mapMutations('table', ['editEnvironmentDetailKey', 'editEnvironmentDetailValue', 'editEnvironmentDetailActive']),
    ...mapActions('table', ['deleteEnvironmentDetailItem']),
    editKey: function(type, key, event) {
      this.editEnvironmentDetailKey({type, key, value: event.target.value, environmentId: this.selectedData()._id})
    },
    editValue: function(type, key, event) {
      this.editEnvironmentDetailValue({type, key, value: event.target.value, environmentId: this.selectedData()._id})
    },
    editActive: function(type, key, event) {
      this.editEnvironmentDetailActive({type, key, value: event.target.checked, environmentId: this.selectedData()._id})
    },
    deleteEnvironmentDetailItemAction: function(value) {
      this.deleteEnvironmentDetailItem({ detailItem: value, environmentId: this.selectedData()._id, option: 'data'})
    }
  },
};
</script>