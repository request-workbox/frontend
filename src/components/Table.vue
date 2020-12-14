<template>
  <div class="row" id="table-row">
    <!-- Request Table -->
    <div class="column column-full-width table-row-data" v-if="currentRoute === 'Requests'">
      <div class="row row-border-bottom">
        <div class="column column-data column-header column-20">
          <span class="column-text-button" v-on:click="toggleOrderDirection">Date Created</span>
        </div>
        <div class="column column-data column-header column-10">Name</div>
        <div class="column column-data column-header column-grow">Url</div>
        <div class="column column-data column-header column-20">Request ID</div>
      </div>

      <template v-if="allData.length > 0">
        <div
          v-for="(data) in viewableData()"
          v-bind:key="data._id"
          class="row row-border-bottom table-row-selectable"
          v-bind:class="{ 'table-row-selected': rowIsActive(data) }"
          v-on:click="selectOrDeselectRowAction(data)"
        >
          <div class="column column-data column-20">{{ dateCreated(data.createdAt) }}</div>
          <div class="column column-data column-10">{{ data.name }}</div>
          <div class="column column-data column-grow">{{ data.url }}</div>
          <div class="column column-data column-20">{{ data._id }}</div>
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
          <div class="column column-data column-grow column-filler"></div>
          <div class="column column-data column-20 column-filler"></div>
        </div>
      </template>
    </div>

    <!-- Workflow Table -->
    <div class="column column-full-width table-row-data" v-if="currentRoute === 'Workflows'">
      <div class="row row-border-bottom">
        <div class="column column-data column-header column-20">
          <span class="column-text-button" v-on:click="toggleOrderDirection">Date Created</span>
        </div>
        <div class="column column-data column-header column-10">Name</div>
        <div class="column column-data column-header column-grow">Tasks</div>
        <div class="column column-data column-header column-20">Workflow ID</div>
      </div>

      <template v-if="allData.length > 0">
        <div
          v-for="(data) in viewableData()"
          v-bind:key="data._id"
          class="row row-border-bottom table-row-selectable"
          v-bind:class="{ 'table-row-selected': rowIsActive(data) }"
          v-on:click="selectOrDeselectRowAction(data)"
        >
          <div class="column column-data column-20">{{ dateCreated(data.createdAt) }}</div>
          <div class="column column-data column-10">{{ data.name }}</div>
          <div class="column column-data column-grow">{{ numberOfWorkflowTasks(data) }}</div>
          <div class="column column-data column-20">{{ data._id }}</div>
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
          <div class="column column-data column-grow column-filler"></div>
          <div class="column column-data column-20 column-filler"></div>
        </div>
      </template>
    </div>

    <!-- Storage Table -->
    <div class="column column-full-width table-row-data" v-if="currentRoute === 'Storage'">
      <div class="row row-border-bottom">
        <div class="column column-data column-header column-20">
          <span class="column-text-button" v-on:click="toggleOrderDirection">Date Created</span>
        </div>
        <div class="column column-data column-header column-10">Name</div>
        <div class="column column-data column-header column-grow">Storage Type</div>
        <div class="column column-data column-header column-20">Storage ID</div>
      </div>

      <template v-if="allData.length > 0">
        <div
          v-for="(data) in viewableData()"
          v-bind:key="data._id"
          class="row row-border-bottom table-row-selectable"
          v-bind:class="{ 'table-row-selected': rowIsActive(data) }"
          v-on:click="selectOrDeselectRowAction(data)"
        >
          <div class="column column-data column-20">{{ dateCreated(data.createdAt) }}</div>
          <div class="column column-data column-10">{{ data.name }}</div>
          <div class="column column-data column-grow">{{ storageType(data) }}</div>
          <div class="column column-data column-20">{{ data._id }}</div>
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
          <div class="column column-data column-grow column-filler"></div>
          <div class="column column-data column-20 column-filler"></div>
        </div>
      </template>
    </div>

    <!-- Statistic Table -->
    <div class="column column-full-width table-row-data" v-if="currentRoute === 'Statistics'">
      <div class="row row-border-bottom">
        <div class="column column-data column-header column-20" id="table-header-1">
          <span class="column-text-button" v-on:click="toggleOrderDirection">Date Created</span>
        </div>
        <div class="column column-data column-header column-grow">Workflow Name</div>
        <div class="column column-data column-header column-20">Queue Type</div>
        <div class="column column-data column-header column-20">Instance ID</div>
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
          v-on:click="selectOrDeselectRowAction(data)"
        >
          <div class="column column-data column-20">{{ dateCreated(data.createdAt) }}</div>
          <div class="column column-data column-grow">{{ data.workflowName }}</div>
          <div class="column column-data column-20">{{ queueType(data.queueType) }}</div>
          <div class="column column-data column-20">{{ data._id }}</div>
        </div>
      </template>

      <template>
        <div
          v-for="(data) in leftoverRows"
          v-bind:key="data._id"
          class="row row-border-bottom table-row-selectable"
        >
          <div class="column column-data column-20 column-filler"></div>
          <div class="column column-data column-grow column-filler"></div>
          <div class="column column-data column-20 column-filler"></div>
        </div>
      </template>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import moment from 'moment-timezone'
import _ from 'lodash'

export default {
  name: "Table",
  computed: {
    ...mapState("table", ["allData", "selectedId", 'option','editing']),
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
    ...mapMutations('table', ['toggleOrderDirection']),
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
    },
    queueType: function(queueType) {
      return _.upperFirst(queueType)
    },
    selectOrDeselectRowAction: function(payload) {
      if (this.editing) return;

      if (this.selectedId === payload._id) {
        this.$router.replace({ path: this.$route.name, query: { option: this.option, }}).catch((err) => err)
      } else {
        this.$router.replace({ path: this.$route.name, query: { id: payload._id, option: this.option, }}).catch((err) => err)
      }
      this.selectOrDeselectRow(payload)
    },
  },
};
</script>