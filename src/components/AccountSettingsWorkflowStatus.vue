<template>
  <div class="row">
    <div class="column column-full-width">

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Workflows</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Workflow Status"
            disabled
          />
        </div>
        <div class="column text-button action" v-if="globalWorkflowStatus === 'running'" v-on:click="updateGlobalWorkflowStatusAction('stopped')"><span>Stop Workflows</span></div>
        <div class="column text-button action" v-if="globalWorkflowStatus === 'stopped'" v-on:click="updateGlobalWorkflowStatusAction('running')"><span>Allow Workflows</span></div>
        <div class="column column-grow"></div>
        <span class="tiny-text tiny-text-spaced">After stopping, current instances are completed and future requests are denied.</span>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AccountSettingsWorkflowStatus',
  computed: {
    ...mapState('billing', ['globalWorkflowStatus']),
    userAttributeEmail: function () {
      return this.$store.getters['cognito/userAttributes']['email']
    }
  },
  methods: {
    ...mapActions('billing',['updateGlobalWorkflowStatus']),
    updateGlobalWorkflowStatusAction: async function(status) {
      try {
        await this.updateGlobalWorkflowStatus({globalWorkflowStatus: status})
      } catch(err) {
        console.log(err)
      }
    },
  },
}
</script>