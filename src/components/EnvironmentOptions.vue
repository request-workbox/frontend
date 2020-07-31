<template>
  <keep-alive>
    <component :is="`EnvironmentOptions${upperFirstOption}`" v-if="this.option !== ''"></component>
  </keep-alive>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

import EnvironmentOptionsSettings from "./EnvironmentOptionsSettings";
import EnvironmentOptionsData from "./EnvironmentOptionsData";

export default {
  name: "EnvironmentOptions",
  components: {
    EnvironmentOptionsSettings,
    EnvironmentOptionsData,
  },
  computed: {
    ...mapState("table", ["option"]),
    upperFirstOption: function() {
      return _.upperFirst(this.option);
    }
  }
};
</script>