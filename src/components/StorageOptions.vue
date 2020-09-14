<template>
  <keep-alive>
    <component :is="`StorageOptions${upperFirstOption}`" v-if="this.option !== ''"></component>
  </keep-alive>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

import StorageOptionsDetails from "./StorageOptionsDetails";

export default {
  name: "StorageOptions",
  components: {
    StorageOptionsDetails,
  },
  computed: {
    ...mapState("table", ["option"]),
    upperFirstOption: function() {
      return _.upperFirst(this.option);
    }
  }
};
</script>