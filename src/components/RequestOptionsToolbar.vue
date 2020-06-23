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
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('plugins')}" v-on:click="changeOption('plugins')" id="request-options-plugins">Plugins</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('details')}" v-on:click="changeOption('details')" id="request-options-details">Details</div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'RequestOptionsToolbar',
  computed: {
    ...mapState('request/requestOptions', ['option'])
  },
  methods: {
    ...mapMutations('request/requestOptions', ['changeOption']),
    optionIsSelected: function(option) { 
      return (option === this.option) ? true : false
    }
  }
}
</script>