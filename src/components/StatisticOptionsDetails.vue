<template>
  <div class="row">
    <div class="column column-full-width">

    <pre v-for="(stat) in this.selectedData().stats" :key="stat._id">
    <code>{{ stat }}</code>
    </pre>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "StatisticOptionsDetails",
  computed: {
    ...mapGetters("table", ["selectedData"]),
  },
};
</script>