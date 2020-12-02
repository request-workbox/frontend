<template>
  <div class="row row-border-bottom" v-if="this.selectedWorkflow() !== ''">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Configuration</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            class="column-input-text"
            value="On Workflow Error"
            disabled
          />
        </div>
        <div class="spacer"></div>
        <div class="column column-20">
          <select class="column-input-select column-input-select-grow">
            <option
                  v-for="(option) in onWorkflowTaskErrorOptions"
                  :key="option.key"
                  :value="option.key"
                >{{ option.text }}</option>
          </select>
        </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            class="column-input-text"
            value="Send Workflow Webhook"
            disabled
          />
        </div>
        <div class="spacer"></div>
        <div class="column column-20">
          <select class="column-input-select column-input-select-grow">
            <option
                  v-for="(option) in sendWorkflowWebhookOptions"
                  :key="option.key"
                  :value="option.key"
                >{{ option.text }}</option>
          </select>
        </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            class="column-input-text"
            value="Statuscheck Interval"
            disabled
          />
        </div>
        <div class="spacer"></div>
        <div class="column column-20">
          <select class="column-input-select column-input-select-grow">
            <option
                  v-for="(option) in statuscheckIntervalOptions"
                  :key="option.key"
                  :value="option.key"
                >{{ option.text }}</option>
          </select>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'StatuscheckOptions',
  data: function() {
    return {
      onWorkflowTaskErrorOptions: [
        { key: 'continue', text: 'Continue' },
        { key: 'exit', text: 'Exit' },
      ],
      sendWorkflowWebhookOptions: [
        { key: 'always', text: 'Always' },
        { key: 'never', text: 'Never' },
        { key: 'onError', text: 'On Error' },
        { key: 'onSuccess', text: 'On Success' },
      ],
      statuscheckIntervalOptions: [
        { key: 15, text: '15 seconds' },
        { key: 30, text: '30 seconds' },
        { key: 60, text: '60 seconds' },
      ],
    }
  },
  computed: {
    ...mapGetters('statuscheck', ['selectedWorkflow']),
  }
}
</script>

<style lang="scss" scoped>
.statuscheck-settings-form-row {
  margin: 5px 0;

  input {
    margin: 5px 5px 5px 10px;
  }
  label {
    margin-left: 10px;
    font-size: 0.85em;
    font-weight: 400;
  }
}
</style>