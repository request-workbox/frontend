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
    <div class="column">
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
      <div class="column text-button text-button-and-logo" v-on:click="archiveRequestAction" v-if="filter === 'active'">
        <img src="/box.svg" alt="">
        <span>Archive Request</span>
      </div>
      <div class="column text-button text-button-and-logo" v-on:click="restoreRequestAction" v-if="filter === 'archived'">
        <img src="/file-1.svg" alt="">
        <span>Restore Request</span>
      </div>
      <!-- <div class="column spacer"></div>
      <div class="column text-button text-button-and-logo" v-on:click="deleteRequestAction">
        <img src="/trash.svg" alt="">
        <span>Delete Request</span>
      </div> -->
      <div class="column text">Archives are deleted after 30 days</div>
    </template>
    <template v-if="this.$route.name === 'Workflows' && this.selectedId !== '' && !this.editing">
      <div class="column spacer"></div>
      <div class="column text-button text-button-and-logo" v-on:click="archiveWorkflowAction" v-if="filter === 'active'">
        <img src="/box.svg" alt="">
        <span>Archive Workflow</span>
      </div>
      <div class="column text-button text-button-and-logo" v-on:click="restoreWorkflowAction" v-if="filter === 'archived'">
        <img src="/file-1.svg" alt="">
        <span>Restore Workflow</span>
      </div>
      <!-- <div class="column spacer"></div>
      <div class="column text-button text-button-and-logo" v-on:click="deleteWorkflowAction">
        <img src="/trash.svg" alt="">
        <span>Delete Workflow</span>
      </div> -->
      <div class="column text">Archives are deleted after 30 days</div>
    </template>
    <template v-if="this.$route.name === 'Storage' && this.selectedId !== '' && !this.editing">
      <div class="column spacer"></div>
      <div class="column text-button text-button-and-logo" v-on:click="archiveStorageAction" v-if="filter === 'active'">
        <img src="/box.svg" alt="">
        <span>Archive Storage</span>
      </div>
      <div class="column text-button text-button-and-logo" v-on:click="restoreStorageAction" v-if="filter === 'archived'">
        <img src="/file-1.svg" alt="">
        <span>Restore Storage</span>
      </div>
      <!-- <div class="column spacer"></div>
      <div class="column text-button text-button-and-logo" v-on:click="deleteStorageAction">
        <img src="/trash.svg" alt="">
        <span>Delete Storage</span>
      </div> -->
      <div class="column text">Archives are deleted after 30 days</div>
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
      // storage
      "archiveStorage",
      "restoreStorage",
      "deleteStorage",
      // stats
      "deleteAllStats"
    ]),
    ...mapMutations("table", ["changeFilter", "resetPage"]),
    filterIsActive: function(filterButton) {
      if (filterButton === this.filter) return true;
      else return false;
    },
    // requests
    archiveRequestAction: function() {
      const confirm = window.confirm('Are you sure you want to archive this request?')
      if (confirm) {
        this.archiveRequest({ requestId: this.selectedId })
      }
    },
    restoreRequestAction: function() {
      const confirm = window.confirm('Are you sure you want to restore this request?')
      if (confirm) {
        this.restoreRequest({ requestId: this.selectedId })
      }
    },
    deleteRequestAction: function() {
      const confirm = window.confirm('Are you sure you want to delete this request?')
      if (confirm) {
        this.deleteRequest({ requestId: this.selectedId })
      }
    },
    // workflows
    archiveWorkflowAction: function() {
      const confirm = window.confirm('Are you sure you want to archive this workflow?')
      if (confirm) {
        this.archiveWorkflow({ workflowId: this.selectedId })
      }
    },
    restoreWorkflowAction: function() {
      const confirm = window.confirm('Are you sure you want to restore this workflow?')
      if (confirm) {
        this.restoreWorkflow({ workflowId: this.selectedId })
      }
    },
    deleteWorkflowAction: function() {
      const confirm = window.confirm('Are you sure you want to delete this workflow?')
      if (confirm) {
        this.deleteWorkflow({ workflowId: this.selectedId })
      }
    },
    // storage
    archiveStorageAction: function() {
      const confirm = window.confirm('Are you sure you want to archive this storage?')
      if (confirm) {
        this.archiveStorage({ storageId: this.selectedId })
      }
    },
    restoreStorageAction: function() {
      const confirm = window.confirm('Are you sure you want to restore this storage?')
      if (confirm) {
        this.restoreStorage({ storageId: this.selectedId })
      }
    },
    deleteStorageAction: function() {
      const confirm = window.confirm('Are you sure you want to delete this storage?')
      if (confirm) {
        this.deleteStorage({ storageId: this.selectedId })
      }
    },
    // stats
    deleteAllStatsAction: function() {
      const confirm = window.confirm('Are you sure you want to delete all stats?')
      if (confirm) {
        this.deleteAllStats({ projectId: this.$route.params.projectId })
      }
    }
  }
};
</script>

<style lang="scss">
.table-toolbar-pagination {
  min-width: 25px;
}
</style>