<template>
    <div class="row row-border-bottom">
      <div class="column">
        <div class="row">
          <div class="column text-button" id="menu-new-request" v-on:click="newRequest({ projectId, adapter: false })">New Request</div>
          <div class="column text-button" id="menu-new-adapter" v-on:click="newRequest({ projectId, adapter: true })">New Adapter</div>
          <div class="column text-button" id="menu-new-workflow" v-on:click="newWorkflow()">New Workflow</div>
          <div class="column text-button" id="menu-new-project" v-on:click="newProject()">New Project</div>
          <!-- <div class="column text-button" id="menu-add-to-workflow" v-on:click="addToWorkflow">Add to Workflow</div> -->
          <div class="column text-button" id="menu-test-request" v-on:click="testRequest()">Test Request</div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'RequestMenu',
  props: ['projectId'],
  methods: {
    ...mapActions('request/requestMenu', [
      'newRequest',
      'newWorkflow',
      'newProject',
      // 'addToWorkflow',
      'testRequest',
    ])
  }
}
</script>