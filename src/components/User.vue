<template>
  <div id="user-container">
    <div class="paper paper-light">
      <p class="label">Team</p>
      <select class="select">
        <option class="option">Personal Team</option>
      </select>
      <p class="label">Project</p>
      <select class="select">
        <option class="option">Personal Project</option>
      </select>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#user-container {
  color: white;

  font-family: "Lato", sans-serif;

  display: flex;
  flex-direction: column;
  align-items: center;

}


.paper {
  width: 100%;
}
.paper-light {
  background: #137bf4;
}




.label {
  color: #9bc2fa;

  font-weight: 600;
  font-family: "Raleway", sans-serif;
  font-size: 0.6em;

  text-transform: uppercase;

  padding: 5px 0 0 5px;
  margin: 0;
}



.select {
  background: #04012e;
  color: white;
  border-radius: 5px;
  padding: 2px;
  border-color: transparent;
  margin: 5px 0 10px 5px;
}
.select:focus {
  outline: none;
}





</style>