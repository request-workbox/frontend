<template>
    <div class="row row-justify-between row-border-bottom row-dark">
      <div class="column">
        <div class="row">
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('payloads')}" v-on:click="changeOption('payloads')">Payloads</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('settings')}" v-on:click="changeOption('settings')">Settings</div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'WebhookToolbar',
  computed: {
    ...mapState('webhook', ['option']),
  },
  methods: {
    ...mapMutations('webhook',['changeOption']),
    optionIsSelected: function(option) { 
      return (option === this.option) ? true : false
    },
  }
}
</script>