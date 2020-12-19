<template>
    <div class="row row-border-bottom row-dark">
      <div class="column column-full-width margin-top-100">
        <div class="row row-justify-between table-detail-row" v-if="this.selectedData()._id">
          <div class="column section-header">{{ this.selectedData().name }}</div>
          <div class="column text">{{ projectLastEdited }}</div>
        </div>
      </div>
    </div>
</template>

<script>
import moment from 'moment-timezone'
import { mapGetters } from 'vuex'
export default {
  name: 'ProjectDetails',
  computed: {
    ...mapGetters('project', ['selectedData']),
    projectLastEdited: function() {
      const projectDetails = this.selectedData()

      if (!projectDetails.updatedAt) return ''
      return `Last edited: ${moment(projectDetails.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}`
    },
  },
}
</script>