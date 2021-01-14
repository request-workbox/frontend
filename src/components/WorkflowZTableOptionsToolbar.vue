<template>
    <div class="row row-justify-between row-border-bottom row-dark">
      <div class="column">
        <div class="row">
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('instance')}" v-on:click="editOptionAction('instance')">Instance</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('tasks')}" v-on:click="editOptionAction('tasks')">Tasks</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('queue')}" v-on:click="editOptionAction('queue')">Queue</div>
          <div class="column">
              <span class="tiny-text tiny-text-spaced">{{ pendingQueuesToolbar() }}</span>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'WorkflowTableOptionsToolbar',
  computed: {
    ...mapState('workflow', ['option']),

    ...mapGetters('queue', ['pendingQueues']),
    ...mapGetters('workflow', ['selectedWorkflow']),
  },
  methods: {
    ...mapMutations('workflow', ['editOption']),
    optionIsSelected: function(option) { 
      return (option === this.option) ? true : false
    },
    editOptionAction: function(option) {
      this.editOption(option)

      if (this.selectedWorkflow()._id) {
        this.$router.replace({ path: this.$route.name, query: { id: this.selectedWorkflow()._id, option: option }}).catch((err) => err)
      } else {
        this.$router.replace({ path: this.$route.name, query: { option: option }}).catch((err) => err)
      }
    },
    pendingQueuesToolbar: function() {
      const pendingQueues = this.pendingQueues()
      if (!pendingQueues || pendingQueues.total === 0) return ''
      else return `${pendingQueues.total} Pending Instances`
    },
  }
}
</script>