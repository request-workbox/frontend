<template>
    <div class="row row-justify-between row-border-bottom row-dark">
      <div class="column">
        <div class="row">
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('url')}" v-on:click="changeOption('url')" id="request-options-url">URL</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('parameters')}" v-on:click="changeOption('parameters')" id="request-options-parameters">Parameters</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('query')}" v-on:click="changeOption('query')" id="request-options-query">Query</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('headers')}" v-on:click="changeOption('headers')" id="request-options-headers">Headers</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('cookies')}" v-on:click="changeOption('cookies')" id="request-options-cookies">Cookies</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('body')}" v-on:click="changeOption('body')" id="request-options-body">Body</div>
        </div>
      </div>
      <div class="column">
        <div class="row">
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('permissions')}" v-on:click="changeOption('permissions')" id="request-options-permissions">Permissions</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('adapters')}" v-on:click="changeOption('adapters')" v-if="optionShouldBeDisplayed('adapters')" id="request-options-adapters">Adapters</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('settings')}" v-on:click="changeOption('settings')" id="request-options-settings">Settings</div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'RequestOptionsToolbar',
  computed: {
    ...mapState('table/tableTools', ['option']),
    ...mapGetters('table/tableTools', ['selectedData']),
  },
  methods: {
    ...mapMutations('table/tableTools', ['changeOption']),
    optionIsSelected: function(option) { 
      return (option === this.option) ? true : false
    },
    optionShouldBeDisplayed: function(option) {
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