<template>
  <div class="row">
    <div class="column column-full-width table-row-data-light padding-left-right-15">

      <div class="row" v-if="selectedProject()._id">

        <div class="column menu-column-data-header text-11">{{ selectedProject().name }}</div>
        <div class="spacer"></div>
        <div class="column column-flex account-column-data-header go-to-link" v-on:click="goToProjects">
          <img class="width-10 margin-right-5" src="/back-arrow.svg">
          <span class="text-11">Back to projects</span>
        </div>
        
      </div>

    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'WorkflowMenu',
  computed: {
    ...mapGetters('project', ['selectedProject'])
  },
  methods: {
    goToProjects: function() {
      location.assign('/projects')
    }
  }
};
</script>

<style lang="scss">
.menu-column-data-header {
  white-space: nowrap;
    overflow: auto;
    font-size: 10px;
    font-weight: 600;
    padding: 4px 0;
}
</style>