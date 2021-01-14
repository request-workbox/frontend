<template>
  <div class="row">
    <div class="column column-full-width table-row-data-light">

      <div class="row row-border-bottom">
        <div class="column column-grow account-column-data-header">Project Name</div>
        <div class="column column-20 account-column-data-header">Date Created</div>
      </div>

      <div class="row row-border-bottom-light padding-top-bottom-5 account-row" v-bind:class="{'account-row-selected':shouldBeSelected(project._id)}" v-for="(project) in visibleProjects()" :key="project._id" v-on:click="selectOrDeselectRowAction(project)">
        <div class="column column-grow account-column-data">{{ project.name }}</div>
        <div class="column column-20 account-column-data">{{ projectCreatedAt(project.createdAt) }}</div>
      </div>

      <div class="row row-border-bottom-light padding-top-bottom-5" v-if="!numberOfProjects">
        <div class="column column-grow text-center text-12 text-light-grey">You don't have any projects here.</div>
      </div>

    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProjectsList',
  computed: {
    ...mapState('project', ['selectedProjectId']),
    ...mapGetters('project', ['visibleProjects']),
    numberOfProjects: function() {
      if (!this.visibleProjects()) return 0
      else return _.size(this.visibleProjects())
    }
  },
  methods: {
    ...mapActions('project', ['selectOrDeselectRow']),
    selectOrDeselectRowAction: function(project) {
      this.selectOrDeselectRow(project)
    },
    shouldBeSelected: function(projectId) {
      if (projectId === this.selectedProjectId) return true
      else return false
    },
    projectCreatedAt: function(createdAt) {
      if (!createdAt) return ''
      return `${moment(createdAt).format('M-D-YYYY, h:mm a')}`
    }
  }
};
</script>