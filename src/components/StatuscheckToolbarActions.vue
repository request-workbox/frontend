<template>
  <div class="row row-border-bottom" v-if="this.selectedWorkflow() !== ''">
    <div class="column column-full-width">
      <div class="row row-justify-between">
        <div class="column">
          <div class="row">
            <div
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
            >Cancel</div>
            <div
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
            >Save Changes</div>

            <div class="large-spacer"></div>
            <div class="text-11">Status</div>
            <div class="spacer"></div>
            <div
              class="column text-button action"
            >Stopped</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'StatuscheckToolbarActions',
  computed: {
    ...mapState('statuscheck',['editing']),
    ...mapGetters('statuscheck', ['selectedWorkflow']),
  }
}
</script>