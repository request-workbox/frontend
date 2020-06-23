<template>
  <div class="row">
    <div class="column column-full-width">
      <!-- <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-checkbox">
          <input type="checkbox" id="options-header-checkbox" disabled />
        </div>
        <div class="column column-data column-header-text column-20" id="options-header-1"></div>
        <div class="column column-data column-header-text column-grow" id="options-header-2"></div>
      </div> -->

      <div class="row row-border-bottom" v-for="value in this.permissions" :key="value._id">
        <!-- <div class="column column-data column-checkbox">
          <input type="checkbox" id="options-data-checkbox" />
        </div> -->
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            :value="value.key"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <input
            type="text"
            placeholder="Value"
            class="column-input-text"
            :value="value.value"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "RequestOptionsPermissions",
  computed: {
    ...mapState("request/requestOptionsPermissions", ["permissions"])
  }
};
</script>