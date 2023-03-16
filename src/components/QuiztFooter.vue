<template>
    <section class="footer">
        <footer class="page-footer py-4">
                <div class="container">
                    <a href="#div-id2" v-smooth-scroll="{ duration: 1500, offset: -100}"><img src="@/assets/scrollup.png" class="img-scrollUp" alt=""></a>
                    <div class="row">
                        <div class="col-md-6 logof">
                            <img src="../assets/logo quizippy putih.png" alt="This is quizippy logo" width="150px">
                            <p>© Copyright <span>QUIZIPPY</span> All Rights Reserved</p>
                            <div class="d-flex">
                                <p class="created">Created by Team</p>
                                <a class="privacy" href="">Privacy</a>
                                <a class="terms" href="">Terms</a>
                            </div>        
                        </div> 
                        <div class="col-md-6 iconn">
                            <h5>Follow Us</h5>
                            <div class="icon text-center">
                                <a href=""><img src="@/assets/twitter.png" alt="" width="35px"></a> 
                                <a href=""><img src="@/assets/facebook.png" alt="" width="35px"></a> 
                                <a href=""><img src="@/assets/instagram.png" alt="" width="35px"></a> 
                            </div>
                        </div>
                    </div>
                </div>
        </footer>
    </section>
</template>

<script>
export default {
    name: 'QuiztFooter'
}
</script>