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

export default {
	components: { Message },
    name: 'LoginView',
    data() {
        return {
            userName: '',
            password: '',
            messageType: '',
            messageText: ''
        }
    },

    mounted() {
        axios.get('http://localhost:8000/sanctum/csrf-cookie');
    },

    methods: {
        async login() {
            let login = await axios.post(
                'http://localhost:8000/api/login',
                {
                    data: JSON.stringify({
                        userName: this.userName,
                        password: this.password
                    })
                },
            );

            if (login.data.msg != '') {
                this.messageText = login.data.msg;
                this.messageType = login.data.type;
            }

        }
    }
}
</script>

<style lang="scss" scoped>

</style>
