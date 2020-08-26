<template>
    <div class="row row-border-bottom">
      <div class="column">
        <div class="row">
          <div class="column text-button" v-if="shouldBeShown('newRequest')" id="menu-new-request" v-on:click="newRequestAction(false)">New Request</div>
          <div class="column text-button" v-if="shouldBeShown('newAdapter')" id="menu-new-adapter" v-on:click="newRequestAction(true)">New Adapter</div>
          <div class="column text-button" v-if="shouldBeShown('newWorkflow')" id="menu-new-workflow" v-on:click="newWorkflowAction()">New Workflow</div>
          <div class="column text-button" v-if="shouldBeShown('newProject')" id="menu-new-project" v-on:click="newProject()">New Project</div>
          <div class="column text-button" v-if="shouldBeShown('newEnvironment')" id="menu-new-environment" v-on:click="newEnvironmentAction()">New Environment</div>
          <!-- <div class="column text-button" id="menu-add-to-workflow" v-on:click="addToWorkflow">Add to Workflow</div> -->
          <!-- <div class="column text-button" v-if="shouldBeShown('testRequest')" id="menu-test-request" v-on:click="testRequest()">Test Request</div> -->
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Menu',
  computed: {
    ...mapState('project', ['projectId'])
  },
  methods: {
    ...mapActions('menu', [
      'newRequest',
      'newWorkflow',
      'newProject',
      'newEnvironment',
      // 'addToWorkflow',
      'testRequest',
    ]),
    shouldBeShown: function(action) {
      if (action === 'newProject') {
        return true
      } else {
        if (this.projectId !== '') return true;
        else return false;
      }
    },
    newRequestAction: function(isAdapter) {
      this.newRequest({ projectId: this.projectId, adapter: isAdapter })
    },
    newWorkflowAction: function() {
      this.newWorkflow({ projectId: this.projectId })
    },
    newEnvironmentAction: function() {
      this.newEnvironment({ projectId: this.projectId })
    },
  }
}
</script>