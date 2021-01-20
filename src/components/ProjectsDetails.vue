<template>
    <div class="row" v-if="this.selectedProject()._id">
      <div class="column column-full-width">
        <div class="row">
          <div class="column">
            <h3 class="account-header">{{ this.selectedProject().name }}</h3>
          </div>
        </div>

        <div class="row margin-bottom-25 text-12 text-weight-600 text-light-blue">
          <div class="column column-flex go-to-link" v-on:click="goToProject">
            <span>Go to project workflows</span>
            <img class="width-13 margin-left-5" src="/share-link.svg">
          </div>
        </div>

        <div class="row row-border-bottom">
          <div class="column column-full-width text-13 text-light-grey">
            Workflow Details
          </div>
        </div>

        <div class="row margin-top-10">
          <div class="column-20">
            <div class="row">
              <div class="column text-12 text-weight-600">Current workflow count</div>
            </div>
          </div>
          <div class="column-20">
            <div class="row">
              <div class="column text-12 text-weight-600">Last workflow sent</div>
            </div>
          </div>
        </div>

        <div class="row margin-top-10">
          <div class="column-20">
            <div class="row">
              <div class="column text-12">{{ this.selectedProject().workflowCount }}</div>
            </div>
          </div>
          <div class="column-20">
            <div class="row">
              <div class="column text-12">{{ projectLastWorkflowSent }}</div>
            </div>
          </div>
        </div>

        <div class="row row-border-bottom margin-top-10">
          <div class="column column-full-width text-13 text-light-grey">
            Usage Details
          </div>
        </div>

        <div class="row margin-top-10">
          <div class="column-20">
            <div class="row">
              <div class="column text-12 text-weight-600">Usage remaining</div>
            </div>
          </div>
          <div class="column-20">
            <div class="row">
              <div class="column text-12 text-weight-600">Usage total</div>
            </div>
          </div>
        </div>

        <div class="row margin-top-10">
          <div class="column-20">
            <div class="row">
              <div class="column text-12">{{ projectUsageRemaining }}</div>
            </div>
          </div>
          <div class="column-20">
            <div class="row">
              <div class="column text-12">{{ projectUsageTotal }}</div>
            </div>
          </div>
        </div>

        <div class="row margin-top-10">
          <div class="column-20">
            <div class="row">
              <div class="column text-12 text-weight-600">Last edited</div>
            </div>
          </div>
        </div>

        <div class="row margin-top-10 margin-bottom-10">
          <div class="column-20">
            <div class="row">
              <div class="column text-12">{{ projectLastEdited }}</div>
            </div>
          </div>
        </div>


      </div>
    </div>
</template>

<script>
import moment from 'moment-timezone'
import { mapGetters } from 'vuex'

export default {
  name: 'ProjectsDetails',
  computed: {
    ...mapGetters('project', ['selectedProject']),
    projectLastWorkflowSent: function() {
      if (!this.selectedProject()._id) return ''

      const lastWorkflowSent = this.selectedProject().workflowLast
      return moment(lastWorkflowSent).format('MMMM D, YYYY h:mm a')
    },
    projectLastEdited: function() {
      if (!this.selectedProject()._id) return ''
      
      const updatedAt = this.selectedProject().updatedAt
      return moment(updatedAt).format('MMMM D, YYYY h:mm a')
    },
    projectUsageRemaining: function() {
      if (!this.selectedProject()._id) return ''

      const remaining = this.selectedProject().usageTotal - this.selectedProject().usage
      
      return `${remaining.toFixed(2)} MB`
    },
    projectUsageTotal: function() {
      if (!this.selectedProject()._id) return ''

      return `${this.selectedProject().usageTotal.toFixed(2)} MB`
    },
  },
  methods: {
    goToProject: function(projectId) {
      location.assign(`/projects/${this.selectedProject()._id}/workflow`)
    }
  }
}
</script>

<style lang="scss">

</style>