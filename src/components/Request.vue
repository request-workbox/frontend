<template>
  <div id="request-container">
    <RequestProject />    
    <RequestMenu />
    <RequestTableToolbar />
    <RequestTable />
    <RequestActionToolbar />
    <RequestDetails />
    <RequestTemplateToolbar />
    <RequestOptionsToolbar />
    <RequestOptions />
    <RequestResponseToolbar />
    <RequestResponse />
    <RequestFooter />
  </div>
</template>

<script>
import RequestProject from './RequestProject'
import RequestMenu from './RequestMenu'
import RequestTableToolbar from './RequestTableToolbar'
import RequestTable from './RequestTable'
import RequestActionToolbar from './RequestActionToolbar'
import RequestDetails from './RequestDetails'
import RequestTemplateToolbar from './RequestTemplateToolbar'
import RequestOptionsToolbar from './RequestOptionsToolbar'
import RequestOptions from './RequestOptions'
import RequestResponseToolbar from './RequestResponseToolbar'
import RequestResponse from './RequestResponse'
import RequestFooter from './RequestFooter'

export default {
  name: "Request",
  components: {
    RequestProject,
    RequestMenu,
    RequestTableToolbar,
    RequestTable,
    RequestActionToolbar,
    RequestDetails,
    RequestTemplateToolbar,
    RequestOptionsToolbar,
    RequestOptions,
    RequestResponseToolbar,
    RequestResponse,
    RequestFooter
  }
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
.row-dark {
  background:#f9f9f9;
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