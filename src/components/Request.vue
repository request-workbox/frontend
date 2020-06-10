<template>
  <div id="request-container">
    <RequestProject />
    <RequestMenu />
    <RequestTableToolbar />
    <RequestTable />
    <RequestDetails />
    <RequestOptionsToolbar />
    <RequestOptions />
    <RequestFooter />
  </div>
</template>

<script>
import RequestProject from "./RequestProject";
import RequestMenu from "./RequestMenu";
import RequestTableToolbar from "./RequestTableToolbar";
import RequestTable from "./RequestTable";
import RequestDetails from "./RequestDetails";
import RequestOptionsToolbar from "./RequestOptionsToolbar";
import RequestOptions from "./RequestOptions";
import RequestFooter from "./RequestFooter";

export default {
  name: "Request",
  components: {
    RequestProject,
    RequestMenu,
    RequestTableToolbar,
    RequestTable,
    RequestDetails,
    RequestOptionsToolbar,
    RequestOptions,
    RequestFooter
  }
};
</script>

<style lang="scss">
div {
  color: #202124;
}

#request-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  overflow-x: hidden;
}

.row {
  height: auto;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;

  margin: 0;
  padding: 0;
}
.row-border-bottom {
  border-bottom-color: #d1d1d1;
  border-bottom-style: solid;
  border-bottom-width: 1px;
}
.row-dark {
  background: #f9f9f9;
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
.column-data {
  white-space: nowrap;
  overflow: auto;

  font-size: 12px;

  border-right-color: #d8d8d8;
  border-right-style: solid;
  border-right-width: 1px;

  padding: 2px;
}
.column-header {
  background: #f9f9f9;
  color: #8c8c8c;
}
.column-header-text {
  font-weight: 500;
}
.column-checkbox {
  min-width: 23px;
}
.column-input-text {
  border-width: 0px;
  width: auto;

  font-weight: 400;
  font-size: 12px;
}
.column-input-text:focus {
  outline: none !important;
  border: 1px solid #2196f3;
  border-radius: 2px;
}
.column-10 {
  width: 10%;
}
.column-grow {
  flex-grow: 1;
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
  background: rgb(245, 245, 245);
  padding: 5px;
  font-size: 10px;
  font-weight: 400;
  text-transform: uppercase;

  cursor: pointer;
}
.filter-button-active {
  background: rgb(207, 207, 207);
  font-weight: 700;
}
.filter-button-left {
  border-radius: 4px 0 0 4px;
}
.filter-button-right {
  border-radius: 0 4px 4px 0;
}

.section-header {
  font-weight: 600;
  letter-spacing: 0.2;
}

.text {
  font-weight: 400;
  font-size: 10px;
}

.input-text {
  font-size: 15px;
  border: none;
  padding: 0 5px 5px 5px;
  cursor: pointer;
}
.input-hover {
  border-style: solid;
  border-width: 1px;
  border-color: transparent;
  cursor: pointer;
}
.input-hover:hover {
  border-color: #efefef;
}

.spacer {
  width: 15px;
}
.tiny-spacer {
  width: 5px;
}
</style>