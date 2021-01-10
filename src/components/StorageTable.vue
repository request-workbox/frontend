<template>
  <div class="row" id="table-row">
    <div class="column column-full-width table-row-data">
      <div class="row row-border-bottom">
        <div class="column column-data column-header column-20">
          <span class="column-text-button" v-on:click="toggleStorageOrderDirection">Date Created</span>
        </div>
        <div class="column column-data column-header column-10">Name</div>
        <div class="column column-data column-header column-grow">Storage Type</div>
        <div class="column column-data column-header column-20">Storage ID</div>
      </div>

      <div
        v-for="(storage) in visibleStorages()"
        v-bind:key="storage._id"
        class="row row-border-bottom table-row-selectable"
        v-bind:class="{ 'table-row-selected': rowIsActive(storage) }"
        v-on:click="selectOrDeselectRowAction(storage)">
          <div class="column column-data column-20">{{ dateCreated(storage.createdAt) }}</div>
          <div class="column column-data column-10">{{ storage.name }}</div>
          <div class="column column-data column-grow">{{ storageType(storage) }}</div>
          <div class="column column-data column-20">{{ storage._id }}</div>
      </div>

      <div
        v-for="(row) in leftoverRows"
        v-bind:key="row._id"
        class="row row-border-bottom table-row-selectable">
          <div class="column column-data column-20 column-filler"></div>
          <div class="column column-data column-10 column-filler"></div>
          <div class="column column-data column-grow column-filler"></div>
          <div class="column column-data column-20 column-filler"></div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import moment from 'moment-timezone'
import _ from 'lodash'

export default {
  name: 'StorageTable',
  computed: {
    ...mapState('storage', ['option','editing']),
    ...mapGetters('storage', ['visibleStorages','selectedStorage']),

    leftoverRows: function() {
      const leftover = 7 - _.size(this.visibleStorages())
      return leftover
    }
  },
  methods: {
    ...mapMutations('storage', ['toggleStorageOrderDirection']),
    ...mapActions('storage', ['selectOrDeselectRow']),
    rowIsActive: function (data) {
      if (data._id === this.selectedStorage()._id) return true
      else return false
    },
    storageType: function(storage) {
      if (storage.storageType === 'file') return 'File'
      if (storage.storageType === 'text') return 'Text'
    },
    dateCreated: function(createdAt) {
      if (!createdAt) return ''
      return `${moment(createdAt).format('M-D-YYYY, h:mm a')}`
    },
    selectOrDeselectRowAction: function(storage) {
      this.selectOrDeselectRow(storage)

      if (this.selectedStorage()._id === storage._id) {
        this.$router.replace({ path: this.$route.name, query: { option: this.option, }}).catch((err) => err)
      } else {
        this.$router.replace({ path: this.$route.name, query: { id: storage._id, option: this.option, }}).catch((err) => err)
      }
    },
  },
};
</script>