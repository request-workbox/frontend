<template>
    <div class="row row-justify-between row-border-bottom row-dark">
      <div class="column">
        <div class="row" v-if="this.$route.name === 'Requests'">
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('url')}" v-on:click="changeOptionAction('url')">URL</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('authorization')}" v-on:click="changeOptionAction('authorization')">Authorization</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('query')}" v-on:click="changeOptionAction('query')">Parameters</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('headers')}" v-on:click="changeOptionAction('headers')">Headers</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('body')}" v-on:click="changeOptionAction('body')">Body</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('schedule')}" v-on:click="changeOptionAction('schedule')">Schedule</div>
        </div>

        <div class="row" v-if="this.$route.name === 'Workflows'">
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('instance')}" v-on:click="changeOptionAction('instance')">Instance</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('tasks')}" v-on:click="changeOptionAction('tasks')">Tasks</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('schedule')}" v-on:click="changeOptionAction('schedule')">Schedule</div>
          <div class="column">
              <span class="tiny-text tiny-text-spaced">{{ pendingQueuesToolbar() }}</span>
            </div>
        </div>

        <div class="row" v-if="this.$route.name === 'Storage'">
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('details')}" v-on:click="changeOptionAction('details')">Details</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('usage')}" v-on:click="changeOptionAction('usage')">Usage</div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'TableOptionsToolbar',
  computed: {
    ...mapState('table', ['option','editing']),
    ...mapGetters('table', ['selectedData']),
    ...mapGetters('schedule', ['pendingQueues']),
  },
  methods: {
    ...mapMutations('table', ['changeOption']),
    optionIsSelected: function(option) { 
      return (option === this.option) ? true : false
    },
    pendingQueuesToolbar: function() {
      const pendingQueues = this.pendingQueues()
      if (!pendingQueues || pendingQueues.total === 0) {
        return ''
      } else {
        return `${pendingQueues.total} Pending Instances`
      }
    },
    changeOptionAction: function(option) {
      if (this.editing) return;

      if (this.selectedData()._id) {
        this.$router.replace({ path: this.$route.name, query: { id: this.selectedData()._id, option: option }}).catch((err) => err)
      } else {
        this.$router.replace({ path: this.$route.name, query: { option: option }}).catch((err) => err)
      }
      this.changeOption(option)
    },
  }
}
</script>