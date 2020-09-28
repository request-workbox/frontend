<template>
    <div class="row row-border-bottom">
      <div class="column column-full-width">
        <div class="row">
          <div class="column text-button" v-on:click="changeProductOptionAction('datetime')" v-bind:class="{'text-button-selected':shouldBeSelected('datetime')}">Dates and Time</div>
          <div class="column text-button" v-on:click="changeProductOptionAction('utilities')" v-bind:class="{'text-button-selected':shouldBeSelected('utilities')}">Utilities</div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'ProductMenu',
  computed: {
    ...mapState('product',['option']),
  },
  methods: {
    ...mapMutations('product',['changeProductOption']),
    // Account Menu Options
    shouldBeSelected: function(option) {
      if (option === this.option) return true
      else return false
    },
    changeProductOptionAction: function(option) {
      this.changeProductOption(option)
    },
  }
}
</script>