<template>
    <div class="login-container">
        <Message
            v-if="((this.messageText != '') && (this.messageType != ''))"
            :messageText="this.messageText"
            :messageType="this.messageType"
        />

        <h1>Login</h1>
        <div class="login-form-container">
            <InputGroup
                v-bind="inputGroups.userNameInput"
                v-model="userName"
            />

            <InputGroup
                v-bind="inputGroups.passwordInput"
                v-model="password"
            />

        <a href="#" @click="login">Login</a>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import generalFunctions from '@/helpers/generalFunctions';

import Message from '@/components/Message.vue';
import InputGroup from '@/components/InputGroup.vue';

const loginRoute = `${process.env.VUE_APP_ROOT_API}/login`;

export default {
    name: 'LoginView',
	components: {
        Message,
        InputGroup
    },

    data() {
        return {
            userName: '',
            password: '',
            messageType: '',
            messageText: '',
            loginData: '',

            inputGroups: {
                userNameInput: {
                    name: 'userName',
                    type: 'text',
                    id: 'login-form-username',
                    label: 'Username',
                    placeholder: 'Enter username'
                },
                passwordInput: {
                    name: 'password',
                    type: 'password',
                    id: 'login-form-password',
                    label: 'Password',
                    placeholder: 'Enter password'
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
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
