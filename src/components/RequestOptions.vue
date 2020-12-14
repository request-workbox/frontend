<template>
  <keep-alive>
    <component :is="`RequestOptions${upperFirstOption}`" v-if="this.option !== '' && this.selectedData()._id"></component>
  </keep-alive>
</template>

<script>
import { mapGetters, mapState } from "vuex";
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
    ...mapGetters('table',['selectedData']),
    upperFirstOption: function() {
      return _.upperFirst(this.option);
    }
  }
};
</script>