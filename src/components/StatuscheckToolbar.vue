<template>
    <div class="row row-justify-between row-border-bottom row-dark">
      <div class="column">
        <div class="row">
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('settings')}">Settings</div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'StatuscheckToolbar',
  computed: {
    ...mapState('statuscheck', ['option']),
  },
  methods: {
    optionIsSelected: function(option) { 
      return (option === this.option) ? true : false
    },
  }
}
</script>