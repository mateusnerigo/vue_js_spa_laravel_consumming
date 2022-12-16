<template>
    <div class="login-container">
        <Message
            v-if="((messageText != '') && (messageType != ''))"
            :messageText="messageText"
            :messageType="messageType"
        />

        <h1>Login</h1>
        <div class="form">
            <div class="input-group">
                <label for="userName">Username</label>
                <input
                    type="text"
                    name="userName"
                    id="userName"
                    placeholder="Enter username"
                    v-model="userName"
                >
            </div>
            <div class="input-group">
                <label for="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    v-model="password"
                >
            </div>

            <a href="#" @click="login">Login</a>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Message from '@/components/Message.vue';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Access-Control-Allow-Credentials'] = '*';

export default {
	components: { Message },
    name: 'LoginView',
    data() {
        return {
            userName: '',
            password: '',
            messageType: '',
            messageText: '',
            loginData: ''
        }
    },

    mounted() {
    },

    methods: {
        async login() {
            await axios.post(
                'http://localhost:8000/api/login',
                {
                    data: JSON.stringify({
                        userName: this.userName,
                        password: this.password
                    })
                },
            ).then(response => {
                console.log(response)
                this.login = response.data;

            });

            if (this.login.msg != '') {
                this.messageText = this.login.msg;
                this.messageType = this.login.type;
            }

        }
    }
}
</script>

<style lang="scss" scoped>

</style>
