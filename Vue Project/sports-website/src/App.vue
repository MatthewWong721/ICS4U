<template>
  <nav class="navbar navbar-expand-lg bg-primary navbar-dark py-3 fixed-top">
    <div class="container">
      <img src="images/logo.png" width="75" class="px-2">
      <button class="navbar-toggler" type="button" data-bs-toggle=collapse data-bs-target="#navmenu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navmenu">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/standings" class="nav-link fw-bold fs-5 px-5">Standings</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/standings" class="nav-link fw-bold fs-5 px-5">Standings</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/standings" class="nav-link fw-bold fs-5 px-5">Standings</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
