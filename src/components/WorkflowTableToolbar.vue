<template>
  <div class="row row-border-bottom">
    <div class="column">
      <div class="row">
        <div class="column input-text-hover">
          <input
            class="input-text"
            type="text"
            placeholder="Search"
            v-model="searchTerm"
            v-on:input="resetPage" />
        </div>
      </div>
    </div>
    <div class="column spacer"></div>
    <div class="column">
      <div class="row">
        <div class="column text-button" v-on:click="previousPage()">Prev</div>
        <div class="column tiny-spacer"></div>
        <div class="column text">{{ pageState() }}</div>
        <div class="column tiny-spacer"></div>
        <div class="column text-button" v-on:click="nextPage()">Next</div>
      </div>
    </div>
    <div class="column spacer"></div>
    <div class="column">
      <div class="row" v-if="!this.editing">
        <div
          class="column filter-button filter-button-left"
          v-bind:class="{ 'filter-button-active': filterIsActive('active') }"
          v-on:click="changeFilter('active')">
            Active
          </div>
        <div
          class="column filter-button filter-button-right"
          v-bind:class="{ 'filter-button-active': filterIsActive('archived') }"
          v-on:click="changeFilter('archived')">
            Archived
          </div>
      </div>
    </div>
    <template v-if="this.selectedWorkflowId !== '' && !this.editing">
      <div class="column spacer"></div>
      <div class="column text-button text-button-and-logo" v-on:click="archiveWorkflowAction" v-if="filter === 'active'">
        <img src="/box.svg" alt="">
        <span>Archive Workflow</span>
      </div>
      <div class="column text-button text-button-and-logo" v-on:click="restoreWorkflowAction" v-if="filter === 'archived'">
        <img src="/file-1.svg" alt="">
        <span>Restore Workflow</span>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'WorkflowTableToolbar',
  computed: {
    ...mapState('workflow', ['editing','filter','selectedWorkflowId']),
    ...mapGetters('workflow', ['pageState']),
    ...mapFields('workflow', ['searchTerm']),
  },
  methods: {
    ...mapMutations('workflow', ['changeFilter', 'resetPage']),
    ...mapActions('workflow',['archiveWorkflow','restoreWorkflow','previousPage','nextPage']),
    filterIsActive: function(filterButton) {
      if (filterButton === this.filter) return true;
      else return false;
    },
    archiveWorkflowAction: async function() {
      try {
        const confirm = window.confirm('Are you sure you want to archive this workflow?')
        if (confirm) {
          const workflow = await this.archiveWorkflow({ workflowId: this.selectedWorkflowId })
        }
      } catch(err) {
        console.log('Table toolbar error', err.message)
      }
    },
    restoreWorkflowAction: async function() {
      try {
        const confirm = window.confirm('Are you sure you want to restore this workflow?')
        if (confirm) {
          const workflow = await this.restoreWorkflow({ workflowId: this.selectedWorkflowId })
        }
      } catch(err) {
        console.log('Table toolbar error', err.message)
      }
    },
  }
};
</script>