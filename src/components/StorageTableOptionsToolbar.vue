<template>
    <div class="row row-justify-between row-border-bottom row-dark">
      <div class="column">
        <div class="row">
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('details')}" v-on:click="editOptionAction('details')">Details</div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'StorageTableOptionsToolbar',
  computed: {
    ...mapState('storage', ['option']),
    ...mapGetters('storage', ['selectedStorage']),
  },
  methods: {
    ...mapMutations('storage', ['editOption']),
    optionIsSelected: function(option) { 
      return (option === this.option) ? true : false
    },
    editOptionAction: function(option) {
      this.editOption(option)

      if (this.selectedStorage()._id) {
        this.$router.replace({ path: this.$route.name, query: { id: this.selectedStorage()._id, option: option }}).catch((err) => err)
      } else {
        this.$router.replace({ path: this.$route.name, query: { option: option }}).catch((err) => err)
      }
      
    },
  }
}
</script>