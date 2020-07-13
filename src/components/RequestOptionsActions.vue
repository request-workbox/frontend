<template>
  <div class="row row-border-bottom">
    <div class="column column-full-width">
      <div class="row row-justify-between">
        <div class="column">
          <div class="row">
            <div
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="cancelChanges"
            >Cancel</div>
            <div
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="saveChanges"
            >Save Changes</div>
          </div>
        </div>
        <div class="column" v-if="allowAddingItem()">
          <div
            class="column text-button action"
            v-on:click="addRequestDetailItem"
          >Add Item</div>
        </div>
        <div class="column" v-if="allowAddingAdapter()">
          <div class="row">
            <div
            class="column text-button action"
            v-on:click="addRequestAdapter"
          >Add Request Adapter</div>
          <div
            class="column text-button action"
            v-on:click="addResponseAdapter"
          >Add Response Adapter</div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "RequestOptionsActions",
  computed: {
    ...mapState("request/requestTable", ["editing", 'requestDetails']),
    ...mapState('request/requestOptions', ['option'])
  },
  methods: {
    ...mapActions("request/requestTable", ["cancelChanges", 'saveChanges', 'addRequestDetailItem']),
    allowAddingItem: function() {
      if (!this.requestDetails._id) return false;

      const allowOptions = ['parameters','query','headers','cookies','body']
      if (_.includes(allowOptions,this.option)) return true;
      else return false;
    },
    allowAddingAdapter: function() {
      if (!this.requestDetails._id) return false;

      const allowOptions = ['adapters']
      if (_.includes(allowOptions,this.option)) return true;
      else return false;
    },
    addRequestAdapter: function() {
      console.log('add request adapter')
    },
    addResponseAdapter: function() {
      console.log('add response adapter')
    },
  }
};
</script>

<style lang="scss">
.action {
  padding: 4px 12px !important;
  margin: 4px !important;
  border-radius: 4px !important;
  border-color: #e4e4e4;
  border-style: solid;
  border-width: 1px;
}
.disabled {
  cursor: auto !important;
  background: #e4e4e4 !important;
  color: #a0a0a0 !important;
}
</style>