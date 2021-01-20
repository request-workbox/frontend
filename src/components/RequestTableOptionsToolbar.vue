<template>
    <div class="row row-justify-between row-border-bottom-light" v-if="this.selectedRequest()._id">
      <div class="column">
        <div class="row">
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('url')}" v-on:click="editOptionAction('url')">URL</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('authorization')}" v-on:click="editOptionAction('authorization')">Authorization</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('query')}" v-on:click="editOptionAction('query')">Parameters</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('headers')}" v-on:click="editOptionAction('headers')">Headers</div>
          <div class="column text-button" v-bind:class="{'text-button-selected':optionIsSelected('body')}" v-on:click="editOptionAction('body')">Body</div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'RequestTableOptionsToolbar',
  computed: {
    ...mapState('request', ['option']),
    ...mapGetters('request', ['selectedRequest']),
  },
  methods: {
    ...mapMutations('request', ['editOption']),
    optionIsSelected: function(option) { 
      return (option === this.option) ? true : false
    },
    editOptionAction: function(option) {
      this.editOption(option)

      if (this.selectedRequest()._id) {
        this.$router.replace({ path: this.$route.name, query: { id: this.selectedRequest()._id, option: option }}).catch((err) => err)
      } else {
        this.$router.replace({ path: this.$route.name, query: { option: option }}).catch((err) => err)
      }
    },
  }
}
</script>