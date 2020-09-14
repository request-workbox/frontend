<template>
    <div class="row row-border-bottom">
      <div class="column">
        <div class="row">
          <div class="column text-button" v-if="shouldBeShown('newProject')" id="menu-new-project" v-on:click="newProject()">New Project</div>
          <div class="column text-button" v-if="shouldBeShown('newRequest')" id="menu-new-request" v-on:click="newRequestAction()">New Request</div>
          <div class="column text-button" v-if="shouldBeShown('newWorkflow')" id="menu-new-workflow" v-on:click="newWorkflowAction()">New Workflow</div>
          <div class="column text-button" v-if="shouldBeShown('newStorage')" id="menu-new-storage" v-on:click="newStorageAction('text')">New Text Storage</div>
          <div class="column text-button" v-if="shouldBeShown('newStorage')" id="menu-new-storage" v-on:click="newStorageAction('file')">New File Storage</div>
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
      'newStorage',
    ]),
    shouldBeShown: function(action) {
      if (action === 'newProject') {
        return true
      } else {
        if (this.projectId !== '') return true;
        else return false;
      }
    },
    newRequestAction: function() {
      this.newRequest({ projectId: this.projectId })
    },
    newWorkflowAction: function() {
      this.newWorkflow({ projectId: this.projectId })
    },
    newStorageAction: function(storageType) {
      this.newStorage({ projectId: this.projectId, storageType })
    },
  }
}
</script>