<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-10" id="options-header-1">Key</div>
        <div class="column column-data column-header-text column-grow" id="options-header-2">Value</div>
      </div>

      <div class="row row-border-bottom" v-for="(value, key) in this.selectedRequest().url" :key="key">
        <div class="column column-data column-10">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            :value="key | capitalize"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <input
            type="text"
            placeholder="Value"
            class="column-input-text"
            :value="value"
            v-on:input="edit('url', key, $event)"
          />
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
    ...mapGetters("request/requestTable", ['selectedRequest']),
  },
  methods: {
    ...mapMutations('request/requestTable', ['editRequestDetail']),
    edit: function(type, key, event) {
      this.editRequestDetail({type, key, value: event.target.value, requestId: this.selectedRequest()._id})
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