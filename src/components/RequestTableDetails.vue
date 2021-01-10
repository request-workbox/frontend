<template>
    <div class="row row-border-bottom row-dark">
      <div class="column column-full-width">
        <div class="row row-justify-between table-detail-row">
          <div class="column section-header">{{ requestName() }}</div>
          <div class="column text">{{ requestLastEdited() }}</div>
        </div>
      </div>
    </div>
</template>

<script>
import moment from 'moment-timezone'
import { mapGetters } from 'vuex'

export default {
  name: 'RequestTableDetails',
  computed: {
    ...mapGetters('request', ['selectedRequest']),
  },
  methods: {
    requestName: function() {
      return this.selectedRequest().name
    },
    requestLastEdited: function() {
      if (!this.selectedRequest()._id) return ''

      const updatedAt = this.selectedRequest().updatedAt
      return `Last edited: ${moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}`
    },
  }
}
</script>