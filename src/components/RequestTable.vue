<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header column-10" id="table-header-1">Method</div>
        <div class="column column-data column-header column-10" id="table-header-2">Protocol</div>
        <div class="column column-data column-header column-10" id="table-header-3">Name</div>
        <div class="column column-data column-header column-grow" id="table-header-4">Url</div>
      </div>

      <div v-if="allRequests.length === 0" class="row row-border-bottom">
        <div class="column column-data column-10" id="table-data-1">GET</div>
        <div class="column column-data column-10" id="table-data-2">HTTPS</div>
        <div class="column column-data column-10" id="table-data-3">API</div>
        <div class="column column-data column-grow" id="table-data-4">https://api.com</div>
      </div>

      <template v-if="allRequests.length > 0">
        <div
          v-for="(request) in viewableRequests()"
          v-bind:key="request._id"
          class="row row-border-bottom table-row-selectable"
          v-bind:class="{ 'table-row-selected': rowIsActive(request) }"
          v-on:click="selectOrDeselectRow(request)"
        >
          <div class="column column-data column-10" id="table-data-1">{{ request.url.method }}</div>
          <div class="column column-data column-10" id="table-data-2">{{ request.url.protocol }}</div>
          <div class="column column-data column-10" id="table-data-3">{{ request.url.name }}</div>
          <div class="column column-data column-grow" id="table-data-4">{{ request.url.url }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "RequestTable",
  computed: {
    ...mapState("request/requestTable", ["allRequests", "requestId"]),
    ...mapGetters("request/requestTable", ["viewableRequests"])
  },
  methods: {
    ...mapActions("request/requestTable", ["selectOrDeselectRow"]),
    rowIsActive: function(request) {
      if (request._id === this.requestId) return true;
      else return false;
    }
  }
};
</script>