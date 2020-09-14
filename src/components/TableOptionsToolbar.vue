<template>
    <div class="row row-justify-between row-border-bottom row-dark">
      <div class="column">
        <div class="row" v-if="this.$route.name === 'Requests'">
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('url')}" v-on:click="changeOption('url')">URL</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('query')}" v-on:click="changeOption('query')">Query</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('headers')}" v-on:click="changeOption('headers')">Headers</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('body')}" v-on:click="changeOption('body')">Body</div>
        </div>

        <div class="row" v-if="this.$route.name === 'Workflows'">
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('instance')}" v-on:click="changeOption('instance')">Instance</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('tasks')}" v-on:click="changeOption('tasks')">Tasks</div>
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
  }
}
</script>