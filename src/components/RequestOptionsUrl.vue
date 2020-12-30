<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom row-border-bottom-tall">
        <div class="column column-data column-header-text column-20">Key</div>
        <div class="column column-data column-header-text column-grow">Value</div>
      </div>

    <!-- URL -->
      <div class="row row-border-bottom row-border-bottom-tall">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="URL"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <input
            type="text"
            placeholder="Value"
            class="column-input-text"
            :value="this.selectedData().url"
            v-on:input="edit('url', $event)"
          />
        </div>
      </div>

      <!-- Name -->
      <div class="row row-border-bottom row-border-bottom-tall">
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
            v-on:input="edit('name', $event)"
          />
        </div>
      </div>

      <!-- Method -->
      <div class="row row-border-bottom row-border-bottom-tall">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Method"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
            <select class="column-input-select column-input-select-min-width" :value="this.selectedData().method" v-on:input="edit('method', $event)">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>
          </div>
      </div>

      <!-- Locked / Sensitive -->
      <div class="row row-border-bottom row-border-bottom-tall">
        <div class="column column-data column-grow">
          <input 
            id="team"
            type="checkbox"
            :checked="this.selectedData().lockedResource"
            @change="editPermission('lockedResource', $event)">
          <label for="team">Locked Resource</label>
          <input 
            id="prevent"
            type="checkbox"
            :checked="this.selectedData().preventExecution"
            @change="editPermission('preventExecution', $event)">
          <label for="prevent">Prevent Execution</label>
          <input 
            id="owner"
            type="checkbox"
            :checked="this.selectedData().sensitiveResponse"
            @change="editPermission('sensitiveResponse', $event)">
          <label for="owner">Sensitive Response</label>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

export default {
  name: "RequestOptionsUrl",
  computed: {
    ...mapGetters("table", ['selectedData']),
  },
  methods: {
    ...mapMutations('table', ['editRequestKey']),
    edit: function(key, event) {
      this.editRequestKey({key, value: event.target.value, requestId: this.selectedData()._id})
    },
    editPermission: function(key, event) {
      this.editRequestKey({key, value: event.target.checked, requestId: this.selectedData()._id})
    }
  },
  filters: {
    capitalize: function (key) {
      if (!key) return ''
      return key.charAt(0).toUpperCase() + key.slice(1)
    }
  }
};
</script>

<style lang="scss">
label {
  margin-left: 5px;
}
</style>