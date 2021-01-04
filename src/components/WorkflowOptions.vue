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
import Schedule from './Schedule'

export default {
  name: "WorkflowOptions",
  components: {
    WorkflowOptionsInstance,
    WorkflowOptionsTasks,
    Schedule,
  },
  computed: {
    ...mapState("table", ["option"]),
    upperFirstOption: function() {
      return _.upperFirst(this.option);
    },
    componentName: function() {
      if (this.option === 'schedule') {
        return 'Schedule'
      } else {
        return `WorkflowOptions${this.upperFirstOption}`
      }
    }
  }
};
</script>