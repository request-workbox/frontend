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

      <!-- TEXT -->

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
          <span v-if="!revealing" v-on:click="getTextStorageDataAction">Reveal</span>
          <span v-if="revealing">Loading...</span>
        </div>
        <div class="column text-button action">
          <span v-if="!replacing" v-on:click="updateTextStorageDataAction">Update</span>
          <span v-if="replacing">Updating...</span>
        </div>
      </div>

      <!-- FILE -->

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
          <span v-if="!downloading" v-on:click="getFileStorageDataAction">Download</span>
          <span v-if="downloading">Downloading...</span>
        </div>
        <input class="column text-button action" type="file" ref="file" v-on:change="handleFileInput()"/>
        <div class="column text-button action" v-if="storageValue">
          <span v-if="!replacing" v-on:click="updateFileStorageDataAction">Upload New File</span>
          <span v-if="replacing">Uploading...</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import _ from 'lodash'

const download = require("downloadjs")

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
    ...mapActions('table', ['getTextStorageData', 'getFileStorageData', 'updateTextStorageData','updateFileStorageData']),
    editStorageDetailAction: function(key, event) {
      this.editStorageDetail({key, value: event.target.value, storageId: this.selectedData()._id})
    },
    editStorageValueAction: function(key, event) {
      this.editStorageValue({key, value: event.target.value, storageId: this.selectedData()._id})
    },
    getTextStorageDataAction: async function() {
      try {
        this.revealing = true
        await this.getTextStorageData({ storageId: this.selectedData()._id })
      } catch(err) {
        // console.log(err)
      } finally {
        this.revealing = false
      }
    },
    getFileStorageDataAction: async function() {
      try {
        this.downloading = true
        const fileDataResponse = await this.getFileStorageData({ storageId: this.selectedData()._id })

        let fileData;

        if (this.selectedData().mimetype && this.selectedData().mimetype === 'text/plain') {
          fileData = fileDataResponse.data
        } else if (this.selectedData().mimetype && this.selectedData().mimetype === 'application/json') {
          fileData = JSON.stringify(fileDataResponse.data)
        }

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(fileData)
        const downloadAnchorNode = document.createElement('a')
        downloadAnchorNode.setAttribute("href",     dataStr)
        downloadAnchorNode.setAttribute("download", this.selectedData().originalname)
        document.body.appendChild(downloadAnchorNode)
        downloadAnchorNode.click()
        downloadAnchorNode.remove()

      } catch(err) {
        // console.log(err)
      } finally {
        this.downloading = false
      }
    },
    handleFileInput: async function() {
      try {
        this.storageValue = this.$refs.file.files[0]
      } catch(err) {
        // console.log(err)
      }
    },
    updateTextStorageDataAction: async function() {
      try {
        this.replacing = true
        await this.updateTextStorageData({storageId: this.selectedData()._id, storageValue: this.selectedData().storageValue })
      } catch(err) {
        // console.log(err)
      } finally {
        this.replacing = false
      }
    },
    updateFileStorageDataAction: async function() {
      try {
        this.replacing = true
        await this.updateFileStorageData({storageId: this.selectedData()._id, storageValue: this.storageValue })
        location.reload()
      } catch(err) {
        // console.log(err)
        Vue.$toast.open(err.response.data)
      } finally {
        this.replacing = false
      }
    }
  }
};
</script>