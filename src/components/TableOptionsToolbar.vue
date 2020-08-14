<template>
    <div class="row row-justify-between row-border-bottom row-dark">
      <div class="column">
        <div class="row" v-if="this.$route.name === 'Requests'">
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('url')}" v-on:click="changeOption('url')">URL</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('parameters')}" v-on:click="changeOption('parameters')">Parameters</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('query')}" v-on:click="changeOption('query')">Query</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('headers')}" v-on:click="changeOption('headers')">Headers</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('cookies')}" v-on:click="changeOption('cookies')">Cookies</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('body')}" v-on:click="changeOption('body')">Body</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('permissions')}" v-on:click="changeOption('permissions')">Permissions</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('adapters')}" v-on:click="changeOption('adapters')" v-if="requestOptionShouldBeDisplayed('adapters')">Adapters</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('inputs')}" v-on:click="changeOption('inputs')" v-if="requestOptionShouldBeDisplayed('adapters')">Adapter Inputs</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('settings')}" v-on:click="changeOption('settings')">Settings</div>
        </div>

        <div class="row" v-if="this.$route.name === 'Workflows'">
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('settings')}" v-on:click="changeOption('settings')">Settings</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('tasks')}" v-on:click="changeOption('tasks')">Tasks</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('inputs')}" v-on:click="changeOption('inputs')">Task Inputs</div>
        </div>

        <div class="row" v-if="this.$route.name === 'Environments'">
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('settings')}" v-on:click="changeOption('settings')">Settings</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('data')}" v-on:click="changeOption('data')">Data</div>
        </div>

        <div class="row" v-if="this.$route.name === 'Statistics'">
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('details')}" v-on:click="changeOption('details')">Details</div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'TableOptionsToolbar',
  computed: {
    ...mapState('table', ['option']),
    ...mapGetters('table', ['selectedData']),
  },
  methods: {
    ...mapMutations('table', ['changeOption']),
    optionIsSelected: function(option) { 
      return (option === this.option) ? true : false
    },
    requestOptionShouldBeDisplayed: function(option) {
      if (!this.selectedData() || !this.selectedData().requestSettings) return true;

      if (this.selectedData().requestSettings.requestType === 'adapter') {
        return false;
      } else {
        return true;
      }
    }
  }
}
</script>