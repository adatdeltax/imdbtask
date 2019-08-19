<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="dark"
    >
       <b-navbar-brand href="#">
      <img src="https://i.ibb.co/FqBptW6/logo.png" height="40" width="90" alt="Kitten">
    </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <b-navbar-nav>
          <b-nav-item href="/movies">
            Movies
          </b-nav-item>
          <b-nav-item href="/">
            Home
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>

</script>
