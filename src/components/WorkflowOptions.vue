<template>
  <keep-alive>
    <component :is="`WorkflowOptions${upperFirstOption}`" v-if="this.option !== ''"></component>
  </keep-alive>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

import WorkflowOptionsInstance from "./WorkflowOptionsInstance";
import WorkflowOptionsTasks from "./WorkflowOptionsTasks";
import WorkflowOptionsSchedule from './WorkflowOptionsSchedule'

export default {
  name: "WorkflowOptions",
  components: {
    WorkflowOptionsInstance,
    WorkflowOptionsTasks,
    WorkflowOptionsSchedule,
  },
  computed: {
    ...mapState("table", ["option"]),
    upperFirstOption: function() {
      return _.upperFirst(this.option);
    }
  }
};
</script>