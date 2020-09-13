<template>
  <div class="row row-border-bottom">
    <div class="column">
      <div class="row">
        <div class="column input-text-hover">
          <input
            class="input-text"
            type="text"
            placeholder="Search"
            id="table-toolbar-search-input"
            v-model="searchTerm"
            v-on:input="resetPage()"
          />
        </div>
      </div>
    </div>
    <div class="column spacer"></div>
    <div class="column">
      <div class="row">
        <div class="column text-button" id="table-toolbar-prev" v-on:click="previousPage()">Prev</div>
        <div class="column tiny-spacer"></div>
        <div class="column text" id="table-toolbar-pagination">{{ pagination() }}</div>
        <div class="column tiny-spacer"></div>
        <div class="column text-button" id="table-toolbar-next" v-on:click="nextPage()">Next</div>
      </div>
    </div>
    <div class="column spacer"></div>
    <div class="column" v-if="this.$route.name !== 'Statistics'">
      <div class="row" v-if="!this.editing">
        <div
          class="column filter-button filter-button-left"
          v-bind:class="{ 'filter-button-active': filterIsActive('active') }"
          id="table-toolbar-filter-active"
          v-on:click="changeFilter({ filter: 'active' })"
        >Active</div>
        <div
          class="column filter-button filter-button-right"
          v-bind:class="{ 'filter-button-active': filterIsActive('archived') }"
          id="table-toolbar-filter-archived"
          v-on:click="changeFilter({ filter: 'archived' })"
        >Archived</div>
      </div>
    </div>
    <template v-if="this.$route.name === 'Requests' && this.selectedId !== '' && !this.editing">
      <div class="column spacer"></div>
      <div class="column text-button" v-on:click="archiveRequestAction" v-if="filter === 'active'">Archive Request</div>
      <div class="column text-button" v-on:click="restoreRequestAction" v-if="filter === 'archived'">Restore Request</div>
      <div class="column spacer"></div>
      <div class="column text-button" v-on:click="deleteRequestAction">Delete Request</div>
    </template>
    <template v-if="this.$route.name === 'Workflows' && this.selectedId !== '' && !this.editing">
      <div class="column spacer"></div>
      <div class="column text-button" v-on:click="archiveWorkflowAction" v-if="filter === 'active'">Archive Workflow</div>
      <div class="column text-button" v-on:click="restoreWorkflowAction" v-if="filter === 'archived'">Restore Workflow</div>
      <div class="column spacer"></div>
      <div class="column text-button" v-on:click="deleteWorkflowAction">Delete Workflow</div>
    </template>
    <template v-if="this.$route.name === 'Environments' && this.selectedId !== '' && !this.editing">
      <div class="column spacer"></div>
      <div class="column text-button" v-on:click="archiveEnvironmentAction" v-if="filter === 'active'">Archive Environment</div>
      <div class="column text-button" v-on:click="restoreEnvironmentAction" v-if="filter === 'archived'">Restore Environment</div>
      <div class="column spacer"></div>
      <div class="column text-button" v-on:click="deleteEnvironmentAction">Delete Environment</div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";

export default {
  name: "TableToolbar",
  computed: {
    ...mapState("table", ["filter", 'selectedId', 'editing']),
    ...mapGetters("table", ["pagination"]),
    ...mapFields("table", ["searchTerm"])
  },
  methods: {
    ...mapActions("table", [
      "previousPage",
      "nextPage",
      // requests
      "archiveRequest",
      "restoreRequest",
      "deleteRequest",
      // workflows
      "archiveWorkflow",
      "restoreWorkflow",
      "deleteWorkflow",
      // environments
      "archiveEnvironment",
      "restoreEnvironment",
      "deleteEnvironment",
    ]),
    ...mapMutations("table", ["changeFilter", "resetPage"]),
    filterIsActive: function(filterButton) {
      if (filterButton === this.filter) return true;
      else return false;
    },
    // requests
    archiveRequestAction: function() {
      this.archiveRequest({ requestId: this.selectedId })
    },
    restoreRequestAction: function() {
      this.restoreRequest({ requestId: this.selectedId })
    },
    deleteRequestAction: function() {
      const confirm = window.confirm('Are you sure you want to delete this request?')
      if (confirm) {
        this.deleteRequest({ requestId: this.selectedId })
      }
    },
    // workflows
    archiveWorkflowAction: function() {
      this.archiveWorkflow({ workflowId: this.selectedId })
    },
    restoreWorkflowAction: function() {
      this.restoreWorkflow({ workflowId: this.selectedId })
    },
    deleteWorkflowAction: function() {
      const confirm = window.confirm('Are you sure you want to delete this workflow?')
      if (confirm) {
        this.deleteWorkflow({ workflowId: this.selectedId })
      }
    },
    // environments
    archiveEnvironmentAction: function() {
      this.archiveEnvironment({ environmentId: this.selectedId })
    },
    restoreEnvironmentAction: function() {
      this.restoreEnvironment({ environmentId: this.selectedId })
    },
    deleteEnvironmentAction: function() {
      const confirm = window.confirm('Are you sure you want to delete this workflow?')
      if (confirm) {
        this.deleteEnvironment({ environmentId: this.selectedId })
      }
    },
  }
};
</script>