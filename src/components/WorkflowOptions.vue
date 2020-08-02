<template>
  <keep-alive>
    <component :is="`WorkflowOptions${upperFirstOption}`" v-if="this.option !== ''"></component>
  </keep-alive>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

import WorkflowOptionsSettings from "./WorkflowOptionsSettings";
import WorkflowOptionsTasks from "./WorkflowOptionsTasks";
import WorkflowOptionsInputs from "./WorkflowOptionsInputs";

export default {
  name: "WorkflowOptions",
  components: {
    WorkflowOptionsSettings,
    WorkflowOptionsTasks,
    WorkflowOptionsInputs
  },
  computed: {
    ...mapState("table", ["option"]),
    upperFirstOption: function() {
      return _.upperFirst(this.option);
    }
  }
};
</script>