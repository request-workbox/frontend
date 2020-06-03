<template>
  <div id="request-container">
    <div class="card card-dark">
      <div class="paper paper-light paper-header">
        <div id="title">Task Transformers</div>
      </div>
      <div class="paper paper-dark paper-detail">
        <div id="title">This form allows you to adjust required request options.</div>
      </div>
    </div>

    <div class="card card-light">
      <div class="paper paper-light paper-header">
        <div id="title">Requests</div>
      </div>
      <div class="paper paper-dark paper-detail">
        <div id="title">This form allows you to adjust required request options.</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@600&display=swap");

#request-container {
  display: flex;
  height: 415px;
  width: 200px;
  background: #0027ff;

  flex-direction: column;
  align-items: center;
}
.card {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    
    padding: 5px 0;
    margin-top:2px;
    
    width:98%;
    height:auto;
}
.card-light {
    background: #0785ff;
    box-shadow: 1px 3px 0px 0px #161fdd;

    .paper-header {
        box-shadow: 0px 1px 0px 0px #1600ff;
    }
    .paper-detail {
        box-shadow: 0px 1px 0px 0px #44ff00;
    }
}
.card-dark {
    background: #19106c;
    box-shadow: 1px 3px 0px 0px #161fdd;
}
.paper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-family: "Raleway", sans-serif;
  font-size: 0.8em;
  text-align: center;

  height:fit-content;

  border-radius: 3px;

  margin: 3px 0;
  padding: 5px 10px;
}
.paper-light {
    color: white;
    border-width:1px;
    border-style:solid;
    border-color:#0061ef;
}
.paper-dark {
    background: #4a51f9;
    color: white;
}
.paper-detail {
    width: 85%;
    align-items: flex-start;
    font-size:0.6em;
    text-align: left;
}
.paper-header {
    width: fit-content;
    text-transform: uppercase;
}
</style>