<template>
    <div class="row row-border-bottom">
      <div class="column">
        <div class="row">
          <div class="column text-button text-button-and-logo" v-if="shouldBeShown('newProject')" id="menu-new-project" v-on:click="newProject()">
            <img src="/folder.svg" alt="">
            <span>New Project</span>
          </div>
          <div class="column text-button text-button-and-logo" v-if="shouldBeShown('newRequest')" id="menu-new-request" v-on:click="newRequestAction()">
            <img src="/cursor.svg" alt="">
            <span>New Request</span>
          </div>
          <div class="column text-button text-button-and-logo" v-if="shouldBeShown('newWorkflow')" id="menu-new-workflow" v-on:click="newWorkflowAction()">
            <img src="/layers.svg" alt="">
            <span>New Workflow</span>
          </div>
          <div class="column text-button text-button-and-logo" v-if="shouldBeShown('newStorage')" id="menu-new-storage" v-on:click="newStorageAction('text')">
            <img src="/file-2.svg" alt="">
            <span>New Text Storage</span>
          </div>
          <div class="column text-button text-button-and-logo" v-if="shouldBeShown('newStorage')" id="menu-new-storage" v-on:click="newStorageAction('file')">
            <img src="/file.svg" alt="">
            <span>New File Storage</span>
          </div>
          <!-- <div class="column text-button text-button-and-logo text-button-warning" v-if="shouldBeShown('deleteEntireProject') && !loading && this.$route.name === 'Projects'" v-on:click="deleteEntireProjectAction">
            <img src="/trash.svg" alt="">
            <span>Delete Entire Project</span>
          </div>
          <div class="column text-button text-button-and-logo text-button-warning" v-if="loading">
            <img src="/trash.svg" alt="">
            <span>Deleting...</span>
          </div> -->
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Menu',
  data: function() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapState('project', ['projectId'])
  },
  methods: {
    ...mapActions('menu', [
      'newRequest',
      'newWorkflow',
      'newProject',
      'newStorage',
      'deleteEntireProject'
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
    deleteEntireProjectAction: async function() {
      try {
        const confirm = window.confirm('Are you sure you want to delete the entire project?')
        if (confirm) {
          this.loading = true
          await this.deleteEntireProject({ projectId: this.projectId })
        }
      } catch(err) {
        console.log(err)
      } finally {
        this.loading = false
      }
      
    }
  }
}
</script>