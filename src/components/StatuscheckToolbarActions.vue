<template>
  <div class="row row-border-bottom" v-if="this.selectedWorkflowId !== ''">
    <div class="column column-full-width">
      <div class="row row-justify-between">
        <div class="column">
          <div class="row">
            <div
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="cancelChangesAction"
            >Cancel</div>
            <div
              class="column text-button action"
              v-bind:class="{ disabled: !this.editing }"
              v-on:click="saveChangesAction"
            >Save Changes</div>

            <div class="large-spacer"></div>
            <div class="text-11">Status</div>
            <div class="spacer"></div>
            <div
              class="column text-button action"
              v-if="statuscheck.status === 'stopped'"
              v-on:click="startStatuscheckAction"
            >Stopped</div>
            <div
              class="column text-button action"
              v-if="statuscheck.status === 'running'"
              v-on:click="stopStatuscheckAction"
            >Running</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'StatuscheckToolbarActions',
  computed: {
    ...mapState('statuscheck',['editing', 'selectedWorkflowId']),
    ...mapGetters('statuscheck', ['statuscheck']),
  },
  methods: {
    ...mapActions('statuscheck', ['cancelChanges','saveChanges', 'startStatuscheck', 'stopStatuscheck',]),
    cancelChangesAction: async function() {
      await this.cancelChanges({ statuscheckId: this.statuscheck._id })
    },
    saveChangesAction: async function() {
      await this.saveChanges(this.statuscheck)
    },
    startStatuscheckAction: async function() {
      try {
        const confirm = window.confirm('Are you sure you want to start this status check?')
        if (confirm) {
          await this.startStatuscheck({ statuscheckId: this.statuscheck._id })
        }
      } catch(err) {
        console.log(err)
      }
    },
    stopStatuscheckAction: async function() {
      try {
        const confirm = window.confirm('Are you sure you want to stop this status check?')
        if (confirm) {
          await this.stopStatuscheck({ statuscheckId: this.statuscheck._id })
        }
      } catch(err) {
        console.log(err)
      }
    },
  }
}
</script>