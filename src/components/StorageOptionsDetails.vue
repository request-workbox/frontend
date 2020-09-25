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

      <div class="row row-border-bottom" v-if="this.selectedData()._id && this.selectedData().storageType === 'file'">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="File"
            disabled
          />
        </div>
        <div class="column text-button action">
          <span v-if="!revealing" v-on:click="getStorageDetailAction">Reveal</span>
          <span v-if="revealing">Loading...</span>
        </div>
        <div class="column text-button action">
          <span v-if="!downloading" v-on:click="downloadStorageDetailAction">Download</span>
          <span v-if="downloading">Downloading...</span>
        </div>
        <input class="column text-button action" type="file" ref="file" v-on:change="handleFileUpload()"/>
        <div class="column text-button action" v-if="storageValue">
          <span v-if="!replacing" v-on:click="updateStorageDetailAction">Upload New File</span>
          <span v-if="replacing">Uploading...</span>
        </div>
      </div>

      <pre v-if="this.selectedData()._id && this.selectedData().storageType === 'file'">
        <code>{{ this.selectedData().storageValue }}</code>
      </pre>

      <div class="row row-border-bottom" v-if="this.selectedData()._id && this.selectedData().storageType === 'text'">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Text"
            disabled
          />
        </div>
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Storage Value"
            class="column-input-text"
            :value="this.selectedData().storageValue"
            v-on:input="editStorageValueAction('storageValue', $event)"
          />
        </div>
        <div class="column text-button action">
          <span v-if="!revealing" v-on:click="getStorageDetailAction">Reveal</span>
          <span v-if="revealing">Loading...</span>
        </div>
        <div class="column text-button action">
          <span v-if="!replacing" v-on:click="updateStorageDetailAction">Update</span>
          <span v-if="replacing">Updating...</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "StorageOptionsDetails",
  data: function() {
    return {
      storageValue: null,
      revealing: false,
      downloading: false,
      replacing: false,
    }
  },
  computed: {
    ...mapGetters("table", ["selectedData"]),
  },
  methods: {
    ...mapMutations('table', ['editStorageDetail','editStorageValue']),
    ...mapActions('table', ['getStorageDetail', 'updateStorageDetail']),
    editStorageDetailAction: function(key, event) {
      this.editStorageDetail({key, value: event.target.value, storageId: this.selectedData()._id})
    },
    editStorageValueAction: function(key, event) {
      this.editStorageValue({key, value: event.target.value, storageId: this.selectedData()._id})
    },
    getStorageDetailAction: async function() {
      try {
        this.revealing = true
        await this.getStorageDetail({storageId: this.selectedData()._id, editStorageValue: true})
      } catch(err) {
        // console.log(err)
      } finally {
        this.revealing = false
      }
    },
    downloadStorageDetailAction: async function() {
      try {
        this.downloading = true
        const storageDetail = await this.getStorageDetail({storageId: this.selectedData()._id, editStorageValue: false})

        const fileURL = window.URL.createObjectURL(new Blob([storageDetail.storageValue]));
        const fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', this.selectedData().name);
        document.body.appendChild(fileLink);
        fileLink.click();
      } catch(err) {
        // console.log(err)
      } finally {
        this.downloading = false
      }
    },
    handleFileUpload: async function() {
      try {
        const thisRef = this
        const reader = new FileReader();
        reader.onloadend = function(e) {
          thisRef.storageValue = e.target.result
        };
        reader.readAsBinaryString(this.$refs.file.files[0]);
      } catch(err) {
        // console.log(err)
      }
    },
    updateStorageDetailAction: async function() {
      try {
        this.replacing = true

        if (this.selectedData().storageType === 'text') {
          this.storageValue = this.selectedData().storageValue
          await this.updateStorageDetail({storageId: this.selectedData()._id, storageValue: this.storageValue })
        } else if (this.selectedData().storageType === 'file') {
          await this.updateStorageDetail({storageId: this.selectedData()._id, storageValue: this.storageValue })
          location.reload()
        }
      } catch(err) {
        // console.log(err)
      } finally {
        this.replacing = false
      }
    }
  }
};
</script>