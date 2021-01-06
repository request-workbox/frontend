<template>
  <div class="row row-border-bottom">
    <div class="column">
      <div class="row">
        <div class="column input-text-hover">
          <input
            class="input-text"
            type="text"
            placeholder="Search"
            v-model="searchTerm"
            v-on:input="resetPage()"
          />
        </div>
      </div>
    </div>
    <div class="column spacer"></div>
    <div class="column">
      <div class="row">
        <div class="column text-button" v-on:click="previousPage()">Prev</div>
        <div class="column tiny-spacer"></div>
        <div class="column text">{{ pagination() }}</div>
        <div class="column tiny-spacer"></div>
        <div class="column text-button" v-on:click="nextPage()">Next</div>
      </div>
    </div>
    <div class="column spacer"></div>
    <div class="column">
      <div class="row" v-if="!this.editing">
        <div
          class="column filter-button filter-button-left"
          v-bind:class="{ 'filter-button-active': filterIsActive('active') }"
          v-on:click="changeFilter('active')">
            Active
          </div>
        <div
          class="column filter-button filter-button-right"
          v-bind:class="{ 'filter-button-active': filterIsActive('archived') }"
          v-on:click="changeFilter('archived')">
            Archived
          </div>
      </div>
    </div>
    <template v-if="this.selectedRequestId !== '' && !this.editing">
      <div class="column spacer"></div>
      <div class="column text-button text-button-and-logo" v-on:click="archiveRequestAction" v-if="filter === 'active'">
        <img src="/box.svg" alt="">
        <span>Archive Request</span>
      </div>
      <div class="column text-button text-button-and-logo" v-on:click="restoreRequestAction" v-if="filter === 'archived'">
        <img src="/file-1.svg" alt="">
        <span>Restore Request</span>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'RequestTableToolbar',
  computed: {
    ...mapState('request', ['editing','filter','selectedRequestId']),
    ...mapGetters('request', ['pageState']),
    ...mapFields('request', ['searchTerm']),
  },
  methods: {
    ...mapMutations('request', ['changeFilter', 'resetPage']),
    ...mapActions('request',['archiveRequest','restoreRequest','previousPage', 'nextPage']),
    filterIsActive: function(filterButton) {
      if (filterButton === this.filter) return true;
      else return false;
    },
    archiveRequestAction: async function() {
      try {
        const confirm = window.confirm('Are you sure you want to archive this request?')
        if (confirm) {
          await this.archiveRequest({ requestId: this.selectedRequestId })
        }
      } catch(err) {
        console.log('Request table toolbar error', err.message)
      }
    },
    restoreRequestAction: async function() {
      try {
        const confirm = window.confirm('Are you sure you want to restore this request?')
        if (confirm) {
          await this.restoreRequest({ requestId: this.selectedRequestId })
        }
      } catch(err) {
        console.log('Request table toolbar error', err.message)
      }
    },
  }
};
</script>