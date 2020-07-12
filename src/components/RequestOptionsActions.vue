<template>
    <div class="row row-border-bottom">
      <div class="column">
        <div class="row">
          <div class="column text-button action" v-bind:class="{ disabled: !this.editing }" v-on:click="cancelChanges">Cancel</div>
          <div class="column text-button action" v-bind:class="{ disabled: !this.editing }" v-on:click="saveChanges">Save Changes</div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'RequestOptionsActions',
  computed: {
      ...mapState('request/requestTable', ['editing'])
  },
  methods: {
      ...mapActions('request/requestTable', ['cancelChanges']),
      ...mapActions('request/requestTable', ['saveChanges']),
  }
}
</script>

<style lang="scss">
.action {
    padding: 4px 12px !important;
    margin: 4px !important;
    border-radius: 4px !important;
    border-color:#e4e4e4;
    border-style: solid;
    border-width: 1px;
}
.disabled {
    cursor: auto !important;
    background: #e4e4e4 !important;
    color:#a0a0a0 !important;
}
</style>