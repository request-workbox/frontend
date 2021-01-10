<template>
    <div class="row row-border-bottom row-dark">
      <div class="column column-full-width">
        <div class="row row-justify-between table-detail-row">
          <div class="column section-header">{{ storageName() }}</div>
          <div class="column text">{{ storageLastEdited() }}</div>
        </div>
      </div>
    </div>
</template>

<script>
import moment from 'moment-timezone'
import { mapGetters } from 'vuex'

export default {
  name: 'StorageTableDetails',
  computed: {
    ...mapGetters('storage', ['selectedStorage']),
  },
  methods: {
    storageName: function() {
      return this.selectedStorage().name
    },
    storageLastEdited: function() {
      if (!this.selectedStorage()._id) return ''

      const updatedAt = this.selectedStorage().updatedAt
      return `Last edited: ${moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}`
    },
  }
}
</script>