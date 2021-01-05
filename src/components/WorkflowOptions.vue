<template>
  <keep-alive>
    <component :is="componentName" v-if="this.option !== ''"></component>
  </keep-alive>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

import WorkflowOptionsInstance from "./WorkflowOptionsInstance";
import WorkflowOptionsTasks from "./WorkflowOptionsTasks";
import Queue from './Queue'

export default {
  name: "WorkflowOptions",
  components: {
    WorkflowOptionsInstance,
    WorkflowOptionsTasks,
    Queue,
  },
  computed: {
    ...mapState("table", ["option"]),
    upperFirstOption: function() {
      return _.upperFirst(this.option);
    },
    componentName: function() {
      if (this.option === 'queue') {
        return 'Queue'
      } else {
        return `WorkflowOptions${this.upperFirstOption}`
      }
    }
  }
};
</script>