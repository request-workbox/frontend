<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom-light">
        <div class="column account-column-data column-grow account-table-header text-light-grey margin-top-bottom-5">
          Description
        </div>
      </div>

      <div class="row row-border-bottom-light">
        <div class="column account-column-data column-10">
          <p class="text-12">Project Name</p>
        </div>
        <div class="column account-column-data column-15">
          <input
            type="text"
            class="column-input-text"
            :value="this.selectedProject().name"
            v-on:input="editProjectNameAction($event)"
          />
        </div>
      </div>

      <div class="row row-border-bottom-light">
        <div class="column account-column-data column-grow account-table-header text-light-grey margin-top-bottom-5">
          Permissions
        </div>
      </div>

      <!-- Return request -->
      <div class="row row-border-bottom-light">
        <div class="column account-column-data column-10">
          <p class="text-12">Return Request</p>
        </div>
        <div class="column account-column-data column-grow">
          <input type="radio" id="returnRequestOwner" value="owner" v-model="returnRequestPermissions">
          <label class="margin-left-5 text-weight-600" for="returnRequestOwner">Owner</label>
          <input type="radio" id="returnRequestTeam" value="team" v-model="returnRequestPermissions">
          <label class="margin-left-5 text-weight-600" for="returnRequestTeam">Team</label>
          <input type="radio" id="returnRequestPublic" value="public" v-model="returnRequestPermissions">
          <label class="margin-left-5 text-weight-600" for="returnRequestPublic">Public (allow unauthenticated requests)</label>
        </div>
      </div>

      <!-- Queue request -->
      <div class="row row-border-bottom-light">
        <div class="column account-column-data column-10">
          <p class="text-12">Queue Request</p>
        </div>
        <div class="column account-column-data column-grow">
          <input type="radio" id="queueRequestOwner" value="owner" v-model="queueRequestPermissions">
          <label class="margin-left-5 text-weight-600" for="queueRequestOwner">Owner</label>
          <input type="radio" id="queueRequestTeam" value="team" v-model="queueRequestPermissions">
          <label class="margin-left-5 text-weight-600" for="queueRequestTeam">Team</label>
          <input type="radio" id="queueRequestPublic" value="public" v-model="queueRequestPermissions">
          <label class="margin-left-5 text-weight-600" for="queueRequestPublic">Public (allow unauthenticated requests)</label>
        </div>
      </div>

      <!-- Schedule request -->
      <div class="row row-border-bottom-light">
        <div class="column account-column-data column-10">
          <p class="text-12">Schedule Request</p>
        </div>
        <div class="column account-column-data column-grow">
          <input type="radio" id="scheduleRequestOwner" value="owner" v-model="scheduleRequestPermissions">
          <label class="margin-left-5 text-weight-600" for="scheduleRequestOwner">Owner</label>
          <input type="radio" id="scheduleRequestTeam" value="team" v-model="scheduleRequestPermissions">
          <label class="margin-left-5 text-weight-600" for="scheduleRequestTeam">Team</label>
          <input type="radio" id="scheduleRequestPublic" value="public" v-model="scheduleRequestPermissions">
          <label class="margin-left-5 text-weight-600" for="scheduleRequestPublic">Public (allow unauthenticated requests)</label>
        </div>
      </div>

      <!-- Return workflow -->
      <div class="row row-border-bottom-light">
        <div class="column account-column-data column-10">
          <p class="text-12">Return Workflow</p>
        </div>
        <div class="column account-column-data column-grow">
          <input type="radio" id="returnWorkflowOwner" value="owner" v-model="returnWorkflowPermissions">
          <label class="margin-left-5 text-weight-600" for="returnWorkflowOwner">Owner</label>
          <input type="radio" id="returnWorkflowTeam" value="team" v-model="returnWorkflowPermissions">
          <label class="margin-left-5 text-weight-600" for="returnWorkflowTeam">Team</label>
          <input type="radio" id="returnWorkflowPublic" value="public" v-model="returnWorkflowPermissions">
          <label class="margin-left-5 text-weight-600" for="returnWorkflowPublic">Public (allow unauthenticated requests)</label>
        </div>
      </div>

      <!-- Queue workflow -->
      <div class="row row-border-bottom-light">
        <div class="column account-column-data column-10">
          <p class="text-12">Queue Workflow</p>
        </div>
        <div class="column account-column-data column-grow">
          <input type="radio" id="queueWorkflowOwner" value="owner" v-model="queueWorkflowPermissions">
          <label class="margin-left-5 text-weight-600" for="queueWorkflowOwner">Owner</label>
          <input type="radio" id="queueWorkflowTeam" value="team" v-model="queueWorkflowPermissions">
          <label class="margin-left-5 text-weight-600" for="queueWorkflowTeam">Team</label>
          <input type="radio" id="queueWorkflowPublic" value="public" v-model="queueWorkflowPermissions">
          <label class="margin-left-5 text-weight-600" for="queueWorkflowPublic">Public (allow unauthenticated requests)</label>
        </div>
      </div>


      <!-- Schedule workflow -->
      <div class="row row-border-bottom-light">
        <div class="column account-column-data column-10">
          <p class="text-12">Schedule Workflow</p>
        </div>
        <div class="column account-column-data column-grow">
          <input type="radio" id="scheduleWorkflowOwner" value="owner" v-model="scheduleWorkflowPermissions">
          <label class="margin-left-5 text-weight-600" for="scheduleWorkflowOwner">Owner</label>
          <input type="radio" id="scheduleWorkflowTeam" value="team" v-model="scheduleWorkflowPermissions">
          <label class="margin-left-5 text-weight-600" for="scheduleWorkflowTeam">Team</label>
          <input type="radio" id="scheduleWorkflowPublic" value="public" v-model="scheduleWorkflowPermissions">
          <label class="margin-left-5 text-weight-600" for="scheduleWorkflowPublic">Public (allow unauthenticated requests)</label>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import moment from 'moment-timezone'

export default {
  name: 'ProjectsSettingsSettings',
  methods: {
    ...mapMutations('project',['editProjectName','editPermissions']),
    editProjectNameAction: function(event) {
      this.editProjectName({value: event.target.value, projectId: this.selectedProject()._id})
    },
  },
  computed: {
    ...mapGetters('project',['selectedProject']),
    returnRequestPermissions: {
      get() {
        if (!this.selectedProject() || !this.selectedProject().returnRequest) return ''
        return this.selectedProject().returnRequest || ''
      },
      set (value) {
        this.editPermissions({ projectId: this.selectedProject()._id, permissionKey: 'returnRequest', value, })
      }
    },
    queueRequestPermissions: {
      get() {
        if (!this.selectedProject() || !this.selectedProject().queueRequest) return ''
        return this.selectedProject().queueRequest || ''
      },
      set (value) {
        this.editPermissions({ projectId: this.selectedProject()._id, permissionKey: 'queueRequest', value, })
      }
    },
    scheduleRequestPermissions: {
      get() {
        if (!this.selectedProject() || !this.selectedProject().scheduleRequest) return ''
        return this.selectedProject().scheduleRequest || ''
      },
      set (value) {
        this.editPermissions({ projectId: this.selectedProject()._id, permissionKey: 'scheduleRequest', value, })
      }
    },
    returnWorkflowPermissions: {
      get() {
        if (!this.selectedProject() || !this.selectedProject().returnWorkflow) return ''
        return this.selectedProject().returnWorkflow || ''
      },
      set (value) {
        this.editPermissions({ projectId: this.selectedProject()._id, permissionKey: 'returnWorkflow', value, })
      }
    },
    queueWorkflowPermissions: {
      get() {
        if (!this.selectedProject() || !this.selectedProject().queueWorkflow) return ''
        return this.selectedProject().queueWorkflow || ''
      },
      set (value) {
        this.editPermissions({ projectId: this.selectedProject()._id, permissionKey: 'queueWorkflow', value, })
      }
    },
    scheduleWorkflowPermissions: {
      get() {
        if (!this.selectedProject() || !this.selectedProject().scheduleWorkflow) return ''
        return this.selectedProject().scheduleWorkflow || ''
      },
      set (value) {
        this.editPermissions({ projectId: this.selectedProject()._id, permissionKey: 'scheduleWorkflow', value, })
      }
    },
  },
};
</script>

<style lang="scss">
label {
  margin-right: 15px;
}
</style>