<template>
  <div id="request-container">
    <div class="row row-border-bottom">
      <div class="column column-full-width">
        <div class="row">
          <div class="column">
            <input type="text" value="Project Name" />
          </div>
          <div class="column text-button">Share</div>
          <div class="column text-button">Team</div>
        </div>
      </div>
    </div>

    <div class="row row-border-bottom">
      <div class="column">
        <div class="row">
          <div class="column text-button">File</div>
          <div class="column text-button">Edit</div>
        </div>
      </div>
    </div>

    <div class="row row-border-bottom">
      <div class="column">
        <div class="row">
          <div class="column">
            <input type="text" value="Search" />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="row">
          <div class="column text-button">Prev</div>
          <div class="column text">20 / 400</div>
          <div class="column text-button">Next</div>
        </div>
      </div>
      <div class="column">
        <div class="row">
          <div class="column filter-button filter-button-active">Public</div>
          <div class="column filter-button">Private</div>
        </div>
      </div>
      <div class="column">
        <div class="row">
          <div class="column filter-button filter-button-active">Active</div>
          <div class="column filter-button">Deleted</div>
        </div>
      </div>
    </div>

    <div class="row row-border-bottom">
      <div class="column column-full-width">
        <div class="row">
          <div class="column column-full-width">
            <input type="text" />
          </div>
          <div class="column column-full-width">
            <input type="text" />
          </div>
          <div class="column column-full-width">
            <input type="text" />
          </div>
          <div class="column column-full-width">
            <input type="text" />
          </div>
        </div>
      </div>
    </div>

    <div class="row row-border-bottom">
      <div class="column">
        <div class="row">
          <div class="column tiny-button">Create New</div>
          <div class="column tiny-button">Save Changes</div>
        </div>
      </div>
    </div>

    <div class="row row-border-bottom">
      <div class="column column-full-width">
        <div class="row row-justify-between">
          <div class="column section-header">Request Name</div>
          <div class="column text">Last Edited</div>
        </div>
      </div>
    </div>

    <div class="row row-border-bottom">
      <div class="column">
        <div class="row">
          <div class="column">Select Method</div>
          <div class="column">URL</div>
        </div>
      </div>
      <div class="column">
        <div class="row">
          <div class="column button">Test Request</div>
        </div>
      </div>
      <div class="column">
        <div class="row">
          <div class="column button">Save</div>
        </div>
      </div>
    </div>

    <div class="row row-justify-between row-border-bottom">
      <div class="column">
        <div class="row">
          <div class="column tab-button tab-button-active">Parameters</div>
          <div class="column tab-button">Query</div>
          <div class="column tab-button">Headers</div>
          <div class="column tab-button">Cookies</div>
          <div class="column tab-button">Body</div>
          <div class="column tab-button">Details</div>
          <div class="column tab-button">Plugins</div>
          <div class="column tab-button">Permissions</div>
        </div>
      </div>
      <div class="column">
        <div class="row">
          <div class="column text-button">Code</div>
        </div>
      </div>
    </div>

    <div class="row row-border-bottom">
      <div class="column">
        <div class="row">
          <div class="column section-header">Parameters</div>
        </div>
      </div>
    </div>

    <div class="row row-border-bottom">
      <div class="column column-full-width">
        <div class="row">
          <div class="column column-full-width">
            <input type="text" />
          </div>
          <div class="column column-full-width">
            <input type="text" />
          </div>
          <div class="column column-full-width">
            <input type="text" />
          </div>
        </div>
      </div>
    </div>

    <div class="row row-border-bottom">
      <div class="column">
        <div class="row">
          <div class="column section-header">Response</div>
        </div>
      </div>
    </div>

    <div class="row row-justify-between row-border-bottom">
      <div class="column">
        <div class="row">
          <div class="column tab-button tab-button-active">Body</div>
          <div class="column tab-button">Cookies</div>
          <div class="column tab-button">Headers</div>
          <div class="column tab-button">Cookies</div>
          <div class="column tab-button">Body</div>
          <div class="column tab-button">Details</div>
          <div class="column tab-button">Plugins</div>
          <div class="column tab-button">Permissions</div>
        </div>
      </div>
      <div class="column">
        <div class="row">
          <div class="column">
            <div class="row">
              <div class="column text">Status</div>
              <div class="column text">Time</div>
              <div class="column text">Size</div>
            </div>
          </div>
          <div class="column">
            <div class="row">
              <div class="column text-button">Save Response</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row row-border-bottom">
      <div class="column column-full-width">
        <div class="row">
          <div class="column column-full-width">
            <input type="text" />
          </div>
          <div class="column column-full-width">
            <input type="text" />
          </div>
          <div class="column column-full-width">
            <input type="text" />
          </div>
        </div>
      </div>
    </div>

    <div class="row row-border-bottom">
      <div class="column">
        <div class="row">
          <div class="column section-header">Footer</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Request",
  components: {}
};
</script>

<style lang="scss">
div {
  padding:0;
  margin:0;
}

#request-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.row {
  height: auto;
  width: 100%;

  display: flex;
  flex-direction: row;
}
.row-border-bottom {
  border-bottom-color: #d1d1d1;
  border-bottom-style: solid;
  border-bottom-width: 1px;
}
.row-justify-between {
  justify-content: space-between;
}
.column {
  height: 100%;
}
.column-full-width {
  width: 100%;
}

.text-button {
  background: white;
  color: black;
  cursor: pointer;
  font-size: 11px;
  padding: 5px;
  border-radius: 2px;
}
.text-button:hover {
  background: #f1f1f1;
}

.button {
  background: #0075d2;
    color: white;
    cursor: pointer;
    font-size: 12px;
    padding: 10px;
    border-radius: 2px;
    margin: 0;
}
.button:hover {
  background: #f1f1f1;
}

.tiny-button {
  background: grey;
    color: white;
    cursor: pointer;
    font-size: 10px;
    padding: 4px 12px;
    border-radius: 2px;
    margin: 0 15px 0 0;
}
.tiny-button:hover {
  background: #f1f1f1;
}



.filter-button {
  background: grey;
}
.filter-button-active {
  background: #f1f1f1;
}


.tab-button {
  background: lightblue;
}
.tab-button-active {
  background: blue;
}

.section-header {
  font-weight:600;
  letter-spacing: .2;
}

.text {
  font-weight:400;
  font-size: 10px;
}

</style>