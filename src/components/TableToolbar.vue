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
      <div class="row">
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
    <div class="column spacer"></div>
    <div class="column text-button" v-on:click="archiveAdapterAction" v-if="filter === 'active'">Archive</div>
    <div class="column text-button" v-on:click="restoreAdapterAction" v-if="filter === 'archived'">Restore</div>
    <div class="column spacer"></div>
    <div class="column text-button" v-on:click="deleteAdapterAction">Delete</div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";

export default {
  name: "TableToolbar",
  computed: {
    ...mapState("table", ["filter", 'selectedId']),
    ...mapGetters("table", ["pagination"]),
    ...mapFields("table", ["searchTerm"])
  },
  methods: {
    ...mapActions("table", [
      "previousPage",
      "nextPage",
      "archiveAdapter",
      "restoreAdapter",
      "deleteAdapter"
    ]),
    ...mapMutations("table", ["changeFilter", "resetPage"]),
    filterIsActive: function(filterButton) {
      if (filterButton === this.filter) return true;
      else return false;
    },
    archiveAdapterAction: function() {
      this.archiveAdapter({ adapterId: this.selectedId })
    },
    restoreAdapterAction: function() {
      this.restoreAdapter({ adapterId: this.selectedId })
    },
    deleteAdapterAction: function() {
      const confirm = window.confirm('Are you sure you want to delete this adapter?')
      if (confirm) {
        this.deleteAdapter({ adapterId: this.selectedId })
      }
    },
  }
};
</script>