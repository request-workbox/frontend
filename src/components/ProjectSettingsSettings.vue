<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Description</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Project Name"
            disabled
          />
        </div>
        <div class="column column-data column-15">
          <input
            type="text"
            class="column-input-text"
            :value="this.selectedData().name"
            v-on:input="changeProjectNameAction($event)"
          />
        </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Permissions</div>
      </div>

      <!-- Return request -->
      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Return Request"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <input type="radio" id="returnRequestOwner" value="owner" v-model="returnRequestPermissions">
          <label for="returnRequestOwner">Owner</label>
          <input type="radio" id="returnRequestTeam" value="team" v-model="returnRequestPermissions">
          <label for="returnRequestTeam">Team</label>
          <input type="radio" id="returnRequestPublic" value="public" v-model="returnRequestPermissions">
          <label for="returnRequestPublic">Public (allow unauthenticated requests)</label>
        </div>
      </div>

      <!-- Queue request -->
      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Queue Request"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <input type="radio" id="queueRequestOwner" value="owner" v-model="queueRequestPermissions">
          <label for="queueRequestOwner">Owner</label>
          <input type="radio" id="queueRequestTeam" value="team" v-model="queueRequestPermissions">
          <label for="queueRequestTeam">Team</label>
          <input type="radio" id="queueRequestPublic" value="public" v-model="queueRequestPermissions">
          <label for="queueRequestPublic">Public (allow unauthenticated requests)</label>
        </div>
      </div>

      <!-- Schedule request -->
      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Schedule Request"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <input type="radio" id="scheduleRequestOwner" value="owner" v-model="scheduleRequestPermissions">
          <label for="scheduleRequestOwner">Owner</label>
          <input type="radio" id="scheduleRequestTeam" value="team" v-model="scheduleRequestPermissions">
          <label for="scheduleRequestTeam">Team</label>
          <input type="radio" id="scheduleRequestPublic" value="public" v-model="scheduleRequestPermissions">
          <label for="scheduleRequestPublic">Public (allow unauthenticated requests)</label>
        </div>
      </div>

      <!-- Return workflow -->
      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Return Workflow"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <input type="radio" id="returnWorkflowOwner" value="owner" v-model="returnWorkflowPermissions">
          <label for="returnWorkflowOwner">Owner</label>
          <input type="radio" id="returnWorkflowTeam" value="team" v-model="returnWorkflowPermissions">
          <label for="returnWorkflowTeam">Team</label>
          <input type="radio" id="returnWorkflowPublic" value="public" v-model="returnWorkflowPermissions">
          <label for="returnWorkflowPublic">Public (allow unauthenticated requests)</label>
        </div>
      </div>

      <!-- Queue workflow -->
      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Queue Workflow"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <input type="radio" id="queueWorkflowOwner" value="owner" v-model="queueWorkflowPermissions">
          <label for="queueWorkflowOwner">Owner</label>
          <input type="radio" id="queueWorkflowTeam" value="team" v-model="queueWorkflowPermissions">
          <label for="queueWorkflowTeam">Team</label>
          <input type="radio" id="queueWorkflowPublic" value="public" v-model="queueWorkflowPermissions">
          <label for="queueWorkflowPublic">Public (allow unauthenticated requests)</label>
        </div>
      </div>


      <!-- Schedule workflow -->
      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Schedule Workflow"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <input type="radio" id="scheduleWorkflowOwner" value="owner" v-model="scheduleWorkflowPermissions">
          <label for="scheduleWorkflowOwner">Owner</label>
          <input type="radio" id="scheduleWorkflowTeam" value="team" v-model="scheduleWorkflowPermissions">
          <label for="scheduleWorkflowTeam">Team</label>
          <input type="radio" id="scheduleWorkflowPublic" value="public" v-model="scheduleWorkflowPermissions">
          <label for="scheduleWorkflowPublic">Public (allow unauthenticated requests)</label>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import moment from 'moment-timezone'

export default {
  name: "ProjectSettingsSettings",
  computed: {
    ...mapGetters('project',['selectedData']),
    returnRequestPermissions: {
      get() {
        if (!this.selectedData() || !this.selectedData().returnRequest) return ''
        return this.selectedData().returnRequest || ''
      },
      set (value) {
        this.changePermissions({
          projectId: this.selectedData()._id,
          permissionKey: 'returnRequest',
          value,
        })
      }
    },
    queueRequestPermissions: {
      get() {
        if (!this.selectedData() || !this.selectedData().queueRequest) return ''
        return this.selectedData().queueRequest || ''
      },
      set (value) {
        this.changePermissions({
          projectId: this.selectedData()._id,
          permissionKey: 'queueRequest',
          value,
        })
      }
    },
    scheduleRequestPermissions: {
      get() {
        if (!this.selectedData() || !this.selectedData().scheduleRequest) return ''
        return this.selectedData().scheduleRequest || ''
      },
      set (value) {
        this.changePermissions({
          projectId: this.selectedData()._id,
          permissionKey: 'scheduleRequest',
          value,
        })
      }
    },
    returnWorkflowPermissions: {
      get() {
        if (!this.selectedData() || !this.selectedData().returnWorkflow) return ''
        return this.selectedData().returnWorkflow || ''
      },
      set (value) {
        this.changePermissions({
          projectId: this.selectedData()._id,
          permissionKey: 'returnWorkflow',
          value,
        })
      }
    },
    queueWorkflowPermissions: {
      get() {
        if (!this.selectedData() || !this.selectedData().queueWorkflow) return ''
        return this.selectedData().queueWorkflow || ''
      },
      set (value) {
        this.changePermissions({
          projectId: this.selectedData()._id,
          permissionKey: 'queueWorkflow',
          value,
        })
      }
    },
    scheduleWorkflowPermissions: {
      get() {
        if (!this.selectedData() || !this.selectedData().scheduleWorkflow) return ''
        return this.selectedData().scheduleWorkflow || ''
      },
      set (value) {
        this.changePermissions({
          projectId: this.selectedData()._id,
          permissionKey: 'scheduleWorkflow',
          value,
        })
      }
    },
  },
  methods: {
    ...mapMutations('project',['changeProjectName','changePermissions']),
    changeProjectNameAction: function(event) {
      this.changeProjectName({value: event.target.value, projectId: this.selectedData()._id})
    },
  }
};
</script>

<style lang="scss">
label {
  margin-right: 15px;
}
</style>