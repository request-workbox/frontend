<template>
  <keep-alive>
    <component :is="`RequestOptions${upperFirstOption}`" v-if="this.option !== ''"></component>
  </keep-alive>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

import RequestOptionsQuery from "./RequestOptionsQuery";
import RequestOptionsHeaders from "./RequestOptionsHeaders";
import RequestOptionsBody from "./RequestOptionsBody";
import RequestOptionsUrl from "./RequestOptionsUrl";

export default {
  name: "RequestOptions",
  components: {
    RequestOptionsQuery,
    RequestOptionsHeaders,
    RequestOptionsBody,
    RequestOptionsUrl,
  },
  computed: {
    ...mapState("table", ["option"]),
    upperFirstOption: function() {
      return _.upperFirst(this.option);
    }
  }
};
</script>