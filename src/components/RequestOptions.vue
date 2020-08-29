<template>
  <keep-alive>
    <component :is="`RequestOptions${upperFirstOption}`" v-if="this.option !== ''"></component>
  </keep-alive>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

import RequestOptionsParameters from "./RequestOptionsParameters";
import RequestOptionsQuery from "./RequestOptionsQuery";
import RequestOptionsHeaders from "./RequestOptionsHeaders";
import RequestOptionsCookies from "./RequestOptionsCookies";
import RequestOptionsBody from "./RequestOptionsBody";
import RequestOptionsUrl from "./RequestOptionsUrl";
import RequestOptionsSettings from "./RequestOptionsSettings";
import RequestOptionsAdapters from "./RequestOptionsAdapters";
import RequestOptionsInputs from "./RequestOptionsInputs";

export default {
  name: "RequestOptions",
  components: {
    RequestOptionsParameters,
    RequestOptionsQuery,
    RequestOptionsHeaders,
    RequestOptionsCookies,
    RequestOptionsBody,
    RequestOptionsUrl,
    RequestOptionsSettings,
    RequestOptionsAdapters,
    RequestOptionsInputs
  },
  computed: {
    ...mapState("table", ["option"]),
    upperFirstOption: function() {
      return _.upperFirst(this.option);
    }
  }
};
</script>