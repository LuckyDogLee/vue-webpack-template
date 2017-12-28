<template>
  <div id="app">
    <header>
      <h1>Hello App</h1>
      <nav>
        <router-link to="/home">Home</router-link>
        <router-link to="/posts">Posts</router-link>
        <router-link to="/show">Show</router-link>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<style>
  .router-link-active {
    color: #000;
    font-weight: bolder;
  }
</style>
