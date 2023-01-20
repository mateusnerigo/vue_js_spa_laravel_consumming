<template>
    <div class="login-container">
        <Message
            v-if="((this.messageText != '') && (this.messageType != ''))"
            :messageText="this.messageText"
            :messageType="this.messageType"
        />

        <CircleLoading v-if="this.isLoading" :fullPage="true" />

        <h1>{{ $t("Login") }}</h1>
        <div class="login-form-container">
            <InputGroup
                v-bind="inputGroups.userNameInput"
                v-model="userName"
            />

            <InputGroup
                v-bind="inputGroups.passwordInput"
                v-model="password"
            />

        <a href="#" @click="login">{{ $t("Login") }}</a>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import generalFunctions from '@/helpers/generalFunctions';

import Message from '@/components/Message.vue';
import CircleLoading from '@/components/CircleLoading.vue';
import InputGroup from '@/components/InputGroup.vue';

const loginRoute = `${process.env.VUE_APP_ROOT_API}/login`;

export default {
    name: 'LoginView',
	components: {
        Message,
        CircleLoading,
        InputGroup
    },

    data() {
        return {
            userName: '',
            password: '',
            isLoading: false,
            messageType: '',
            messageText: '',
            loginData: '',

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
                this.messageText = receivedLoginData.msg;
                this.messageType = receivedLoginData.type;
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
                    "type": "alert"
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
