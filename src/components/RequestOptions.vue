<template>
  <keep-alive>
    <component :is="`RequestOptions${upperFirstOption}`"></component>
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
import RequestOptionsPermissions from "./RequestOptionsPermissions";
import RequestOptionsSettings from "./RequestOptionsSettings";
import RequestOptionsAdapters from "./RequestOptionsAdapters";

export default {
  name: "RequestOptions",
  components: {
    RequestOptionsParameters,
    RequestOptionsQuery,
    RequestOptionsHeaders,
    RequestOptionsCookies,
    RequestOptionsBody,
    RequestOptionsUrl,
    RequestOptionsPermissions,
    RequestOptionsSettings,
    RequestOptionsAdapters
  },
  computed: {
    ...mapState("table", ["option"]),
    upperFirstOption: function() {
      return _.upperFirst(this.option);
    }
  }
};
</script>