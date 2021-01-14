<template>
    <div class="row row-border-bottom row-dark">
      <div class="column column-full-width">
        <div class="row row-justify-between table-detail-row" v-if="this.selectedProject()._id">
          <div class="column section-header">{{ this.selectedProject().name }}</div>
          <div class="column text">{{ projectLastEdited }}</div>
        </div>
      </div>
    </div>
</template>

<script>
import moment from 'moment-timezone'
import { mapGetters } from 'vuex'

export default {
  name: 'TeamProjectsDetails',
  computed: {
    ...mapGetters('project', ['selectedProject']),
    projectLastEdited: function() {
      if (!this.selectedProject()._id) return ''
      
      const updatedAt = this.selectedProject().updatedAt
      return `Last edited: ${moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}`
    },
  },
}
</script>