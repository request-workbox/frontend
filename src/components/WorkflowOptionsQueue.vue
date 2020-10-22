<template>
  <div class="row">
    <div class="column column-full-width">

    <div class="row row-border-bottom">
      <div class="column column-data column-header column-5 column-padded">Stat</div>
      <div class="column column-data column-header column-10 column-padded">Created</div>
      <div class="column column-data column-header column-10 column-padded">Departure</div>
      <div class="column column-data column-header column-10 column-padded">Status</div>
      <div class="column column-data column-header column-grow column-padded">Message</div>
      <div class="column column-data column-header column-10 column-padded">Remove</div>
    </div>

    <!-- <div class="row row-border-bottom table-row-selectable" v-bind:class="{'table-row-selected':shouldBeSelected(stat._id)}" v-for="(stat) in this.selectedData().stats" :key="stat._id" v-on:click="selectStatAction(stat)">
      <div class="column column-data column-10 column-padded">{{ stat.status }}</div>
      <div class="column column-data column-10 column-padded">{{ stat.statusText }}</div>
      <div class="column column-data column-10 column-padded">{{ stat.requestName }}</div>
      <div class="column column-data column-20 column-padded">{{ stat.requestType }}</div>
      <div class="column column-data column-grow column-padded">{{ statisticCreatedAt(stat.createdAt) }}</div>
    </div>

    <div class="row row-border-bottom" v-if="shouldShowSelectedStat()">
      <div class="column text-button action" v-if="!loading" v-on:click="getInstanceDetailAction()">Load Requests / Responses</div>
      <div class="column text-button action" v-if="loading">Loading...</div>
    </div>

    <pre v-if="shouldShowSelectedStat()">
      <code>{{ selectedStat() }}</code>
    </pre> -->

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import moment from 'moment-timezone'
import _ from 'lodash'

export default {
  name: "WorkflowOptionsQueue",
  computed: {
    ...mapGetters("table", ["selectedData"]),
  },
};
</script>