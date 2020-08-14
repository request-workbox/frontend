<template>
  <keep-alive>
    <component :is="`StatisticOptions${upperFirstOption}`" v-if="this.option !== ''"></component>
  </keep-alive>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

import StatisticOptionsDetails from "./StatisticOptionsDetails";

export default {
  name: "StatisticOptions",
  components: {
    StatisticOptionsDetails,
  },
  computed: {
    ...mapState("table", ["option"]),
    upperFirstOption: function() {
      return _.upperFirst(this.option);
    }
  }
};
</script>