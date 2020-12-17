<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom row-border-bottom-tall">
        <div class="column column-data column-header-text column-20 padding-10">Type</div>
        <div class="column column-data column-header-text column-grow padding-10">Configuration</div>
      </div>

      <div class="row row-border-bottom row-border-bottom-tall row-align-start">
        <div class="column column-data column-20 padding-10 break-spaces">
          <select class="column-input-select column-input-select-stretch">
            <option value="textInput">No Auth</option>
            <option value="storage">API Key</option>
          </select>
          <p>The authorization header will be automatically generated when you send the request. Learn more about authorization</p>
        </div>
        <div class="column column-data column-header-text column-grow padding-10">
          asd
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

export default {
  name: "RequestOptionsAuthorization",
  computed: {
    ...mapGetters("table", ['selectedData']),
  },
  methods: {
    ...mapMutations('table', ['editRequestKey']),
    edit: function(key, event) {
      this.editRequestKey({key, value: event.target.value, requestId: this.selectedData()._id})
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