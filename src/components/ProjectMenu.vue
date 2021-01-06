<template>
    <div class="row row-border-bottom">
      <div class="column">
        <div class="row">
          <div class="column text-button text-button-and-logo" v-on:click="createProjectAction()">
            <img src="/folder.svg" alt="">
            <span>New Project</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ProjectMenu',
  methods: {
    ...mapActions('project', ['createProject']),
    createProjectAction: async function() {
      try {
        const project = await this.createProject()
      } catch(err) {
        console.log('Project menu error', err.message)
      }
    },
  }
}
</script>