<template>
  <div class="row" id="table-row">
    <!-- Request Table -->
    <div class="column column-full-width table-row-data" v-if="currentRoute === 'Requests'">
      <div class="row row-border-bottom">
        <div class="column column-data column-header column-20" id="table-header-1">Date Created</div>
        <div class="column column-data column-header column-10" id="table-header-1">Method</div>
        <div class="column column-data column-header column-10" id="table-header-3">Name</div>
        <div class="column column-data column-header column-grow" id="table-header-4">Url</div>
      </div>

      <template v-if="allData.length > 0">
        <div
          v-for="(data) in viewableData()"
          v-bind:key="data._id"
          class="row row-border-bottom table-row-selectable"
          v-bind:class="{ 'table-row-selected': rowIsActive(data) }"
          v-on:click="selectOrDeselectRow(data)"
        >
          <div class="column column-data column-20" id="table-data-1">{{ dateCreated(data.createdAt) }}</div>
          <div class="column column-data column-10" id="table-data-1">{{ data.url.method }}</div>
          <div class="column column-data column-10" id="table-data-3">{{ data.url.name }}</div>
          <div class="column column-data column-grow" id="table-data-4">{{ data.url.url }}</div>
        </div>
      </template>

      <template>
        <div
          v-for="(data) in leftoverRows"
          v-bind:key="data._id"
          class="row row-border-bottom table-row-selectable"
        >
          <div class="column column-data column-20 column-filler"></div>
          <div class="column column-data column-10 column-filler"></div>
          <div class="column column-data column-10 column-filler"></div>
          <div class="column column-data column-grow column-filler"></div>
        </div>
      </template>
    </div>

    <!-- Workflow Table -->
    <div class="column column-full-width table-row-data" v-if="currentRoute === 'Workflows'">
      <div class="row row-border-bottom">
        <div class="column column-data column-header column-20" id="table-header-1">Date Created</div>
        <div class="column column-data column-header column-20" id="table-header-1">Name</div>
        <div class="column column-data column-header column-20" id="table-header-4">Tasks</div>
      </div>

      <template v-if="allData.length > 0">
        <div
          v-for="(data) in viewableData()"
          v-bind:key="data._id"
          class="row row-border-bottom table-row-selectable"
          v-bind:class="{ 'table-row-selected': rowIsActive(data) }"
          v-on:click="selectOrDeselectRow(data)"
        >
          <div class="column column-data column-20" id="table-data-1">{{ dateCreated(data.createdAt) }}</div>
          <div class="column column-data column-20" id="table-data-1">{{ data.name }}</div>
          <div class="column column-data column-20" id="table-data-2">{{ numberOfWorkflowTasks(data) }}</div>
        </div>
      </template>

      <template>
        <div
          v-for="(data) in leftoverRows"
          v-bind:key="data._id"
          class="row row-border-bottom table-row-selectable"
        >
          <div class="column column-data column-20 column-filler"></div>
          <div class="column column-data column-20 column-filler"></div>
          <div class="column column-data column-20 column-filler"></div>
        </div>
      </template>
    </div>

    <!-- Storage Table -->
    <div class="column column-full-width table-row-data" v-if="currentRoute === 'Storage'">
      <div class="row row-border-bottom">
        <div class="column column-data column-header column-20" id="table-header-1">Date Created</div>
        <div class="column column-data column-header column-20">Name</div>
        <div class="column column-data column-header column-20">Storage Type</div>
      </div>

      <template v-if="allData.length > 0">
        <div
          v-for="(data) in viewableData()"
          v-bind:key="data._id"
          class="row row-border-bottom table-row-selectable"
          v-bind:class="{ 'table-row-selected': rowIsActive(data) }"
          v-on:click="selectOrDeselectRow(data)"
        >
          <div class="column column-data column-20" id="table-data-1">{{ dateCreated(data.createdAt) }}</div>
          <div class="column column-data column-20">{{ data.name }}</div>
          <div class="column column-data column-20">{{ storageType(data) }}</div>
        </div>
      </template>

      <template>
        <div
          v-for="(data) in leftoverRows"
          v-bind:key="data._id"
          class="row row-border-bottom table-row-selectable"
        >
          <div class="column column-data column-20 column-filler"></div>
          <div class="column column-data column-20 column-filler"></div>
          <div class="column column-data column-20 column-filler"></div>
        </div>
      </template>
    </div>

    <!-- Statistic Table -->
    <div class="column column-full-width table-row-data" v-if="currentRoute === 'Statistics'">
      <div class="row row-border-bottom">
        <div class="column column-data column-header column-20">Date Created</div>
        <div class="column column-data column-header column-20">Instance</div>
        <div class="column column-data column-header column-grow">Workflow Name</div>
      </div>

      <!-- <div v-if="allData.length === 0" class="row row-border-bottom">
        <div class="column column-data column-grow" id="table-data-4">Workflow Name</div>
      </div> -->

      <template v-if="allData.length > 0">
        <div
          v-for="(data) in viewableData()"
          v-bind:key="data._id"
          class="row row-border-bottom table-row-selectable"
          v-bind:class="{ 'table-row-selected': rowIsActive(data) }"
          v-on:click="selectOrDeselectRow(data)"
        >
          <div class="column column-data column-20" id="table-data-1">{{ dateCreated(data.createdAt) }}</div>
          <div class="column column-data column-20" id="table-data-2">{{ data._id }}</div>
          <div class="column column-data column-grow" id="table-data-2">{{ data.workflowName }}</div>
        </div>
      </template>

      <template>
        <div
          v-for="(data) in leftoverRows"
          v-bind:key="data._id"
          class="row row-border-bottom table-row-selectable"
        >
          <div class="column column-data column-20 column-filler"></div>
          <div class="column column-data column-20 column-filler"></div>
          <div class="column column-data column-grow column-filler"></div>
        </div>
      </template>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import moment from 'moment-timezone'
import _ from 'lodash'

export default {
  name: "Table",
  computed: {
    ...mapState("table", ["allData", "selectedId"]),
    ...mapGetters("table", ["viewableData"]),
    currentRoute: function () {
      return this.$route.name;
    },
    leftoverRows: function() {
      const leftover = 6 - _.size(this.viewableData())
      return leftover
    }
  },
  methods: {
    ...mapActions("table", ["selectOrDeselectRow"]),
    rowIsActive: function (data) {
      if (data._id === this.selectedId) return true;
      else return false;
    },
    numberOfWorkflowTasks: function(data) {
      if (!data.tasks || !_.size(data.tasks)) return '0 Tasks'
      return `${_.size(data.tasks)} Tasks`
    },
    storageType: function(data) {
      if (data.storageType === 'file') return 'File'
      if (data.storageType === 'text') return 'Text'
    },
    dateCreated: function(createdAt) {
      if (!createdAt) return ''
      return `${moment(createdAt).format('M-D-YYYY, h:mm a')}`
    }
  },
};
</script>

<style lang="scss">

</style>