<template id="join">
    <b-container class="join" fluid>
        <b-row class="justify-content-center">
            <img src="../assets/logoquizywhit.png" alt="logo">
        </b-row>
        <b-row class="justify-content-center">
            <b-form inline v-show="sw">
                <div class="row">
                    <div class="col-10">
                        <b-input id="inline-form-input-name" class="inp" @keyup.enter="codeClick" placeholder="enter room code" v-model="code"></b-input>
                    </div>
                    <div class="col-2">
                        <b-button class="btn" @click="codeClick"><font-awesome-icon icon="play"/></b-button>
                    </div>
                </div>        
            </b-form>
                <b-form inline v-show="!sw">
                    <div class="row">
                        <div class="col-10">
                            <b-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0 inp" @keyup.enter="submmit" placeholder="enter nickname" v-model="nickname"></b-input>
                        </div>
                        <div class="col-2">
                            <b-button class="btn" @click="submmit"><font-awesome-icon icon="play"/></b-button>
                        </div>
                    </div>
            </b-form>
        </b-row>
    </b-container>
</template>


<script>

export default {
    data() {
        return {
            sw: true,
            code : '',
            nickname : ''
        }
    },
    methods : {
        codeClick() {
            if (this.code == '') {
                alert('code is empty make sure you were input code that correct')
            } else {
            console.log(this.code)
            this.sw = !this.sw
            }
        },
        submmit() {
            if (this.nickname == '') {
                alert('nickname is empty make sure you were input that. it will be help you to easily recognized')
            } else {
            console.log(this.code)
            console.log(this.nickname)

            this.$router.push({path : "/room", query : {code: this.code, nickname : this.nickname}})
            
            }
        }
    }
}
</script>

<style>
    body { background-color: #0b2239;}

    .btn {
        border-radius: 50px;
        background-color: #8880FF;
        border: 0;
    }

    .btn:hover {
        background-color: rgb(103, 97, 196);
    }

    .inp {
        border-radius: 15px;
    }
    
    .join {
        margin-top: 12%; 
    }
    
    img {
        height: 100px;
        margin: 50px;
    }

    /* RESPONSIVE VERSION */
    @media (max-width: 767.98px) {
        .join {
            margin: 150px 0;
        }
    }
</style>