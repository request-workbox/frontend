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
import WorkflowOptionsSchedule from './WorkflowOptionsSchedule'
import SocketQueue from "./SocketQueue";

export default {
  name: "WorkflowOptions",
  components: {
    WorkflowOptionsInstance,
    WorkflowOptionsTasks,
    WorkflowOptionsSchedule,
    SocketQueue,
  },
  computed: {
    ...mapState("table", ["option"]),
    upperFirstOption: function() {
      return _.upperFirst(this.option);
    },
    componentName: function() {
      if (this.option === 'socketqueue') {
        return 'SocketQueue'
      } else {
        return `WorkflowOptions${this.upperFirstOption}`
      }
    }
  }
};
</script>