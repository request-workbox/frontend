<template>
    <div class="row row-border-bottom">
      <div class="column">
        <div class="row">
          <div class="column text-button" v-on:click="changeAccountOptionAction('billing')" v-bind:class="{'text-button-selected':shouldBeSelected('billing')}">Billing</div>
          <div class="column text-button" v-on:click="changeAccountOptionAction('user')" v-bind:class="{'text-button-selected':shouldBeSelected('user')}">User</div>
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
    }
  }
}
</script>