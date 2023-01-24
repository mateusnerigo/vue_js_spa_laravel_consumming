<template>
    <div class="login-container">
        <transition name="alert-transition">
            <Alert
                v-show="isShowingModal"
                :alertText="this.alertText"
                :alertType="this.alertType"
            />
        </transition>

        <CircleLoading v-if="this.isLoading" :fullPage="true" />

        <div class="login-form-container">
            <h1>{{ $t("Login") }}</h1>

            <div class="login-form-groups">
                <InputGroup
                    v-bind="inputGroups.userNameInput"
                    v-model="userName"
                />

                <InputGroup
                    v-bind="inputGroups.passwordInput"
                    v-model="password"
                />
            </div>

            <IconButton
                @click="login()"
                :icon="'login'"
                :innerText="this.loginButtonText"
                :text="'login'"
            />
        </div>
    </div>
</template>

<script>
import axios from 'axios';


import generalFunctions from '@/helpers/generalFunctions';

import Alert from '@/components/Alert.vue';
import CircleLoading from '@/components/CircleLoading.vue';
import InputGroup from '@/components/InputGroup.vue';
import IconButton from '@/components/IconButton.vue';

const loginRoute = `${process.env.VUE_APP_ROOT_API}/login`;

export default {
    name: 'LoginView',
	components: {
        Alert,
        CircleLoading,
        InputGroup,
        IconButton
    },

    data() {
        return {
            userName: '',
            password: '',
            isLoading: false,
            isShowingModal: false,
            alertType: '',
            alertText: '',
            loginData: '',
            loginButtonText: this.$t("Login"),

            inputGroups: {
                userNameInput: {
                    name: 'userName',
                    type: 'text',
                    id: 'login-form-username',
                    label: this.$t("username"),
                    placeholder: this.$t("enterUsername")
                },
                passwordInput: {
                    name: 'password',
                    type: 'password',
                    id: 'login-form-password',
                    label: this.$t("password"),
                    placeholder: this.$t("enterPassword")
                }
            }
        }
    },

    created() {
        if (generalFunctions.hasCookieByName(process.env.VUE_APP_COOKIE_TOKEN_NAME)) {
            this.$router.push('/');
        }
    },

    watch: {
        loginData(receivedLoginData) {
            if ((receivedLoginData.type == 'success') &&
                receivedLoginData.data.access_token &&
                receivedLoginData.data.expires_in > 0
            ) {
                generalFunctions.setAppCookies([
                    {
                        'name': process.env.VUE_APP_COOKIE_TOKEN_NAME,
                        'value': receivedLoginData.data.access_token
                    },
                    {
                        'name': process.env.VUE_APP_COOKIE_TOKEN_TYPE_NAME,
                        'value': receivedLoginData.data.token_type
                    }
                ]);

                this.$store.commit('isAuthenticated');
                this.$router.push('/loginSuccess');
                return;
            }

            if (receivedLoginData.msg != '') {
                this.alertText = receivedLoginData.msg;
                this.alertType = receivedLoginData.type;
                this.isShowingModal = true;

                setTimeout(() => {
                    this.isShowingModal = false;
                }, 2000);
            }
        }
    },

    methods: {
        async login() {
            this.loginData = '';
            this.isLoading = true;

            await axios.post(
                loginRoute,
                {
                    data: JSON.stringify({
                        userName: this.userName,
                        password: this.password
                    })
                },
            ).then(response => {
                this.loginData = response.data;
            }).catch(() => {
                console.clear();
                this.isLoading = false;

                this.loginData = {
                    "msg": `${this.$t("erroInternoNoServidor")} ${this.$t("tenteNovamenteMaisTarde")}`,
                    "type": "danger"
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '/src/scss/variables.scss';
.login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(45deg, $purple, $blue);

    .login-form-container {
        background: $white;
        box-shadow: 0px 0px 10px 2px $shadow_black;
        border-radius: 0.5rem;
        display: flex;
        flex-direction: column ;
        flex-wrap: nowrap;
        align-items: center;
        padding-bottom: 2rem;
        overflow-x: hidden;

        h1 {
            border-bottom: 1px solid $dark_white;
            width: 100%;
            padding: 1.5rem;
            color: $dark_blue;
            text-align: center;
        }

        .login-form-groups {
            padding: 2rem 1.5rem .5rem;
        }
    }
}
</style>
