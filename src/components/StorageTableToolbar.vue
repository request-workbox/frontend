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
            v-on:input="resetPage" />
        </div>
      </div>
    </div>
    <div class="column spacer"></div>
    <div class="column">
      <div class="row">
        <div class="column text-button" v-on:click="previousPage()">Prev</div>
        <div class="column tiny-spacer"></div>
        <div class="column text">{{ pageState() }}</div>
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
    <template v-if="this.selectedStorageId !== '' && !this.editing">
      <div class="column spacer"></div>
      <div class="column text-button text-button-and-logo" v-on:click="archiveStorageAction" v-if="filter === 'active'">
        <img src="/box.svg" alt="">
        <span>Archive Storage</span>
      </div>
      <div class="column text-button text-button-and-logo" v-on:click="restoreStorageAction" v-if="filter === 'archived'">
        <img src="/file-1.svg" alt="">
        <span>Restore Storage</span>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'StorageTableToolbar',
  computed: {
    ...mapState('storage', ['editing','filter','selectedStorageId']),
    ...mapGetters('storage', ['pageState']),
    ...mapFields('storage', ['searchTerm']),
  },
  methods: {
    ...mapMutations('storage', ['changeFilter', 'resetPage']),
    ...mapActions('storage',['archiveStorage','restoreStorage','previousPage','nextPage']),
    filterIsActive: function(filterButton) {
      if (filterButton === this.filter) return true
      else return false
    },
    archiveStorageAction: async function() {
      try {
        const confirm = window.confirm('Are you sure you want to archive this storage?')
        if (confirm) {
          const storage = await this.archiveStorage({ storageId: this.selectedStorageId })
        }
      } catch(err) {
        console.log('Table toolbar error', err.message)
      }
    },
    restoreStorageAction: async function() {
      try {
        const confirm = window.confirm('Are you sure you want to restore this storage?')
        if (confirm) {
          const storage = await this.restoreStorage({ storageId: this.selectedStorageId })
        }
      } catch(err) {
        console.log('Table toolbar error', err.message)
      }
    },
  }
};
</script>