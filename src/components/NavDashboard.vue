<template>
    <nav class="navbar sticky-top navbar-expand-lg navbar-dark py-3">
        <div class="container-md">   
            <b-navbar-toggle target="nav-collapse" class="mr-auto ml-2"></b-navbar-toggle>
            <b-navbar-brand class="logobrand mr-auto mt-1" href="/"><img src="../assets/logo quizippy putih.png" alt="Logo Quizy" width="120"></b-navbar-brand>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <a class="nav-item nav-link navlink2" :class="{active: active==0}" href="/dashboard">Dashboard <span class="sr-only">(current)</span></a>
                    <a class="nav-item nav-link navlink2" :class="{active: active==1}" href="/achievement">Achievement</a>
                    <a class="nav-item nav-link navlink2" :class="{active: active==2}" href="/history">History</a>
                </b-navbar-nav>
                <b-navbar-nav class="ml-md-auto">
                    <a class="nav-item btn btn-primary main-button rounded-pill mx-2" role="button" :href="play">Join Game</a>
                    <a class="nav-item btn btn-primary main-button rounded-pill mx-2" role="button" href="/makequiz">Create Quiz</a>
                </b-navbar-nav>
                <b-navbar-nav>
                <a class="nav-link ml-4" href="/search"><i class="fas fa-search"></i></a>
                </b-navbar-nav>
                <b-navbar-nav>
                    <div class="dropdown">
                        <a class="" href="#" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
                            <img src="@/assets/setting.png" alt="This is setting icon" class="setting pl-2 pr-1" width="33px">
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <a class="dropdown-item" href="/account"><img src="../assets/account.png" alt="This is account icon" class="account-ico"> Account</a>
                            <a class="dropdown-item" @click="logout" ><img src="../assets/logout.png" alt="This is logout icon" class="logout-ico">Logout</a>
                        </div>
                    </div>
                </b-navbar-nav>
            </b-collapse>
        </div>
    </nav>  
</template>

<script>
export default {
    name: 'NavDashboard', 
    props: {
        active: Number
    },
    data: () =>{
        return {
            play : process.env.VUE_APP_PLAY,
        }
    },
    methods:{
        logout(){
            localStorage.setItem('token', null)
            location.href = '/'
        }
    }
}
</script>