<template>
  <div class="row">
    <div class="column column-full-width">
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
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "Table",
  computed: {
    ...mapState("table/tableTools", ["allData", "selectedId"]),
    ...mapGetters("table/tableTools", ["viewableData"])
  },
  methods: {
    ...mapActions("table/tableTools", ["selectOrDeselectRow"]),
    rowIsActive: function(data) {
      if (data._id === this.selectedId) return true;
      else return false;
    }
  }
};
</script>