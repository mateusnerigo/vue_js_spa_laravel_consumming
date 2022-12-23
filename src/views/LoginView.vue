<template>
    <div class="login-container">
        <Message
            v-if="((messageText != '') && (messageType != ''))"
            :messageText="messageText"
            :messageType="messageType"
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
import Cookie from 'js-cookie';

import Message from '@/components/Message.vue';
import InputGroup from '@/components/InputGroup.vue';

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

    mounted() {
        Cookie.remove(process.env.VUE_APP_COOKIE_NAME);
    },

    watch: {
        loginData(receivedLoginData) {
            if ((receivedLoginData.type == 'success') &&
                receivedLoginData.data.access_token &&
                receivedLoginData.data.expires_in > 0
            ) {
                Cookie.set(
                    process.env.VUE_APP_COOKIE_NAME,
                    `${receivedLoginData.data.token_type} ${receivedLoginData.data.access_token}`
                );

                this.$router.push('/');
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
                process.env.VUE_APP_ROOT_API + '/login',
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
