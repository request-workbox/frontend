<template>
  <div class="row" v-if="this.selectedStorage()._id">
    <div class="column column-full-width padding-left-right-15">

      <div class="row row-border-bottom">
        <div class="column column-grow account-column-data-header">Storage Information</div>
      </div>

      <div class="row row-border-bottom-light" v-if="this.selectedStorage()._id">
        <div class="column account-column-data column-20">
          <p class="text-12">Name</p>
        </div>
        <div class="column account-column-data column-grow">
          <input
            type="text"
            placeholder="Value"
            class="column-input-text"
            :value="this.selectedStorage().name"
            v-on:input="editStorageDetailAction('name', $event)"
          />
        </div>
      </div>

      <!-- TEXT -->

      <div class="row row-border-bottom-light" v-if="this.selectedStorage().storageType === 'text'">
        <div class="column account-column-data column-20">
          <p class="text-12">Storage Value</p>
        </div>
        <div class="column account-column-data column-20">
          <input
            type="text"
            placeholder="Storage Value"
            class="column-input-text"
            :value="this.selectedStorage().storageValue"
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

      <div class="row row-border-bottom-light" v-if="this.selectedStorage().storageType === 'file'">
        <div class="column account-column-data column-20">
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

      <!-- Locked / Sensitive -->
      <div class="row row-border-bottom-light row-border-bottom-light-tall">
        <div class="column account-column-data column-grow">
          <input 
            id="team"
            type="checkbox"
            :checked="this.selectedStorage().lockedResource"
            @change="editPermission('lockedResource', $event)">
          <label for="team">Locked Resource</label>
          <input 
            id="prevent"
            type="checkbox"
            :checked="this.selectedStorage().preventExecution"
            @change="editPermission('preventExecution', $event)">
          <label for="prevent">Prevent Execution</label>
          <input 
            id="owner"
            type="checkbox"
            :checked="this.selectedStorage().sensitiveResponse"
            @change="editPermission('sensitiveResponse', $event)">
          <label for="owner">Sensitive Response</label>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import _ from 'lodash'

const download = require('downloadjs')

export default {
  name: 'StorageOptionsDetails',
  data: function() {
    return {
      storageValue: null,
      revealing: false,
      downloading: false,
      replacing: false,
    }
  },
  computed: {
    ...mapGetters('storage', ['selectedStorage']),
  },
  methods: {
    ...mapMutations('storage', ['editStorageDetail','editStorageValue']),
    ...mapActions('storage', ['getTextStorageData', 'getFileStorageData', 'updateTextStorageData','updateFileStorageData']),
    editStorageDetailAction: function(key, event) {
      this.editStorageDetail({key, value: event.target.value, storageId: this.selectedStorage()._id})
    },
    editPermission: function(key, event) {
      this.editStorageDetail({key, value: event.target.checked, storageId: this.selectedStorage()._id})
    },
    editStorageValueAction: function(key, event) {
      this.editStorageValue({key, value: event.target.value, storageId: this.selectedStorage()._id})
    },
    getTextStorageDataAction: async function() {
      try {
        this.revealing = true
        const storage = await this.getTextStorageData({ storageId: this.selectedStorage()._id })
      } catch(err) {
        console.log('Storage options details error', err.message)
      } finally {
        this.revealing = false
      }
    },
    getFileStorageDataAction: async function() {
      try {
        this.downloading = true
        const storage = await this.getFileStorageData({ storageId: this.selectedStorage()._id })

        console.log(this.selectedStorage())

        let fileData = storage.storageValue

        const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(fileData)
        const downloadAnchorNode = document.createElement('a')
        downloadAnchorNode.setAttribute("href",     dataStr)
        downloadAnchorNode.setAttribute("download", this.selectedStorage().originalname)
        document.body.appendChild(downloadAnchorNode)
        downloadAnchorNode.click()
        downloadAnchorNode.remove()

      } catch(err) {
        console.log('Storage options details error', err.message)
      } finally {
        this.downloading = false
      }
    },
    handleFileInput: async function() {
      try {
        this.storageValue = this.$refs.file.files[0]
      } catch(err) {
        console.log('Storage options details error', err.message)
      }
    },
    updateTextStorageDataAction: async function() {
      try {
        this.replacing = true
        const storage = await this.updateTextStorageData({storageId: this.selectedStorage()._id, storageValue: this.selectedStorage().storageValue })
      } catch(err) {
        console.log('Storage options details error', err.message)
      } finally {
        this.replacing = false
      }
    },
    updateFileStorageDataAction: async function() {
      try {
        this.replacing = true
        const storage = await this.updateFileStorageData({storageId: this.selectedStorage()._id, storageValue: this.storageValue })
      } catch(err) {
        console.log('Storage options details error', err.message)
      } finally {
        this.replacing = false
      }
    }
  }
};
</script>