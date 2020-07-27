<template>
  <div class="row">
    <!-- Request Table -->
    <div class="column column-full-width" v-if="currentRoute === 'Requests'">
      <div class="row row-border-bottom">
        <div class="column column-data column-header column-10" id="table-header-1">Method</div>
        <div class="column column-data column-header column-10" id="table-header-2">Protocol</div>
        <div class="column column-data column-header column-10" id="table-header-3">Name</div>
        <div class="column column-data column-header column-grow" id="table-header-4">Url</div>
      </div>

      <div v-if="allData.length === 0" class="row row-border-bottom">
        <div class="column column-data column-10" id="table-data-1">GET</div>
        <div class="column column-data column-10" id="table-data-2">HTTPS</div>
        <div class="column column-data column-10" id="table-data-3">API</div>
        <div class="column column-data column-grow" id="table-data-4">https://api.com</div>
      </div>

      <template v-if="allData.length > 0">
        <div
          v-for="(data) in viewableData()"
          v-bind:key="data._id"
          class="row row-border-bottom table-row-selectable"
          v-bind:class="{ 'table-row-selected': rowIsActive(data) }"
          v-on:click="selectOrDeselectRow(data)"
        >
          <div class="column column-data column-10" id="table-data-1">{{ data.url.method }}</div>
          <div class="column column-data column-10" id="table-data-2">{{ data.url.protocol }}</div>
          <div class="column column-data column-10" id="table-data-3">{{ data.url.name }}</div>
          <div class="column column-data column-grow" id="table-data-4">{{ data.url.url }}</div>
        </div>
      </template>
    </div>
    <!-- Workflow Table -->
    <div class="column column-full-width" v-if="currentRoute === 'Workflows'">
      <div class="row row-border-bottom">
        <div class="column column-data column-header column-20" id="table-header-1">Name</div>
        <div class="column column-data column-header column-20" id="table-header-4">Tasks</div>
        <div class="column column-data column-header column-20" id="table-header-2">Timeout</div>
        <div class="column column-data column-header column-grow" id="table-header-3">On Timeout</div>
      </div>

      <div v-if="allData.length === 0" class="row row-border-bottom">
        <div class="column column-data column-20" id="table-data-1">Workflow Name</div>
        <div class="column column-data column-20" id="table-data-4">4 Tasks</div>
        <div class="column column-data column-20" id="table-data-2">30 Seconds</div>
        <div class="column column-data column-grow" id="table-data-3">Send 200 and Continue</div>
      </div>

      <template v-if="allData.length > 0">
        <div
          v-for="(data) in viewableData()"
          v-bind:key="data._id"
          class="row row-border-bottom table-row-selectable"
          v-bind:class="{ 'table-row-selected': rowIsActive(data) }"
          v-on:click="selectOrDeselectRow(data)"
        >
          <div class="column column-data column-20" id="table-data-1">{{ data.name }}</div>
          <div class="column column-data column-20" id="table-data-2">{{ data.active }}</div>
          <div class="column column-data column-20" id="table-data-3">{{ data.timeout }}</div>
          <div class="column column-data column-grow" id="table-data-4">{{ data.onTimeout }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "Table",
  computed: {
    ...mapState("table", ["allData", "selectedId"]),
    ...mapGetters("table", ["viewableData"]),
    currentRoute: function () {
      return this.$route.name;
    },
  },
  methods: {
    ...mapActions("table", ["selectOrDeselectRow"]),
    rowIsActive: function (data) {
      if (data._id === this.selectedId) return true;
      else return false;
    },
  },
};
</script>