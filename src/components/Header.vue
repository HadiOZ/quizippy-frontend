<template>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark py-3">
        <div class="container-md">   
            <b-navbar-toggle target="nav-collapse" class="mr-auto"></b-navbar-toggle>
            <b-navbar-brand class="mr-auto mt-1" href="/"><img src="@/assets/logo quizippy putih.png" alt="Logo Quizippy" width="120"></b-navbar-brand>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-md-auto">
                    <a class="nav-item btn btn-primary text-white main-button rounded-pill mx-2" role="button" href="/dashboard">GO BACK</a>
                </b-navbar-nav>
            </b-collapse>
            <b-navbar-nav class="ml-md-auto">
                
            </b-navbar-nav>
        </div>
    </nav>  
    <!-- Akhir Navbar -->

</template>

<script>
    export default {
        name : 'Headers'
    }
</script>

<style src="../views/css/style.css"></style>