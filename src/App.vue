<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #d0d0d0;
}
.layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  background: #dfd313;
  border-radius: 25px;
  max-height: 50px;
  height: 50px;
  width: 200px;
  max-width: 100%;
  border: none;
  font-size: 20px;
  color: #2a2a2e;
  font-weight: bold;
  padding-top: 5px;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background: #f7f2a5;
  }

}
.flex {
  display: flex;
}
.jc-c {
  justify-content: center;
}
.jc-sb {
  justify-content: space-between;
}
.ai-c {
  align-items: center;
}
.as-e {
  align-self: flex-end;
}
</style>
