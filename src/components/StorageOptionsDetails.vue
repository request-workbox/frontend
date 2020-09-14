<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Description</div>
      </div>

      <div class="row row-border-bottom" v-if="this.selectedData()._id">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Name"
            disabled
          />
        </div>
        <div class="column column-data column-grow">
          <input
            type="text"
            placeholder="Value"
            class="column-input-text"
            :value="this.selectedData().name"
            v-on:input="editStorageDetailAction('name', $event)"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "StorageOptionsDetails",
  computed: {
    ...mapGetters("table", ["selectedData"]),
  },
  methods: {
    ...mapMutations('table', ['editStorageDetail']),
    editStorageDetailAction: function(key, event) {
      this.editStorageDetail({key, value: event.target.value, storageId: this.selectedData()._id})
    },
  }
};
</script>