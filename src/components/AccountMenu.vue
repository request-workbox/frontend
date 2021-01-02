<template>
    <div class="row row-border-bottom">
      <div class="column column-full-width">
        <div class="row">
          <div class="column text-button" v-if="this.$store.getters['cognito/isLoggedIn']" v-on:click="changeAccountOptionAction('settings')" v-bind:class="{'text-button-selected':shouldBeSelected('settings')}">Settings</div>
          <div class="column text-button" v-if="this.$store.getters['cognito/isLoggedIn']" v-on:click="changeAccountOptionAction('billing')" v-bind:class="{'text-button-selected':shouldBeSelected('billing')}">Billing</div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'AccountMenu',
  computed: {
    ...mapState('account',['option']),
  },
  methods: {
    ...mapMutations('account',['changeAccountOption']),
    shouldBeSelected: function(option) {
      if (option === this.option) return true
      else return false
    },
    changeAccountOptionAction: function(option) {
      this.changeAccountOption(option)
    },
  }
}
</script>