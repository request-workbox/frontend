<template>
    <div class="row row-border-bottom">
      <div class="column column-full-width">
        <div class="row">
          <div class="column text-button" v-on:click="changeAccountOptionAction('billing')" v-bind:class="{'text-button-selected':shouldBeSelected('billing')}">Billing</div>
          <div class="column text-button" v-if="this.option !=='user'" v-on:click="changeAccountOptionAction('user')" v-bind:class="{'text-button-selected':shouldBeSelected('user')}">User</div>
          
          <div class="column text-button" v-if="this.option !=='billing'" v-on:click="changeAccountUserOptionAction('signup')" v-bind:class="{'text-button-selected':userOptionShouldBeSelected('signup')}">Sign Up</div>
          <div class="column text-button" v-if="this.option !=='billing'" v-on:click="changeAccountUserOptionAction('confirm')" v-bind:class="{'text-button-selected':userOptionShouldBeSelected('confirm')}">Confirm Sign Up</div>
          <div class="column text-button" v-if="this.option !=='billing'" v-on:click="changeAccountUserOptionAction('reset')" v-bind:class="{'text-button-selected':userOptionShouldBeSelected('reset')}">Reset Password</div>
          <div class="column text-button" v-if="this.option !=='billing'" v-on:click="changeAccountUserOptionAction('login')" v-bind:class="{'text-button-selected':userOptionShouldBeSelected('login')}">Log In</div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'AccountMenu',
  computed: {
    ...mapState('account',['option','userOption']),
  },
  methods: {
    ...mapMutations('account',['changeAccountOption','changeAccountUserOption']),
    // Account Menu Options
    shouldBeSelected: function(option) {
      if (option === this.option) return true
      else return false
    },
    changeAccountOptionAction: function(option) {
      this.changeAccountOption(option)
    },
    // Account User Options
    userOptionShouldBeSelected: function(userOption) {
      if (userOption === this.userOption) return true
      else return false
    },
    changeAccountUserOptionAction: function(userOption) {
      this.changeAccountUserOption(userOption)
    },
  }
}
</script>