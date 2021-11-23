<template>
<body>
  <nav class="navbar navbar-expand-lg bg-primary navbar-dark py-3 fixed-top">
    <div class="container">
      <img src="@/assets/logo.png" width="75" class="px-2">
      <button class="navbar-toggler" type="button" data-bs-toggle=collapse data-bs-target="#navmenu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navmenu">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/standings" class="nav-link fw-bold fs-5 px-5">Standings</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/scores" class="nav-link fw-bold fs-5 px-5">Scores</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/input" class="nav-link fw-bold fs-5 px-5">Enter a Score</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view/>
  </body>
  
</template>

<script>
    export default{
        name: 'Navbar'
    }
</script>

<style>
    body::before{
        display:block;
        content:'';
        height:60px;
    }
</style>