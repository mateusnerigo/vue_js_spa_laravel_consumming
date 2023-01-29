<template>
    <div class="login-container">
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
import generalFunctions from '@/helpers/generalFunctions';

import InputGroup from '@/components/InputGroup.vue';
import IconButton from '@/components/IconButton.vue';


export default {
    name: 'LoginView',
	components: {
        InputGroup,
        IconButton
    },

    data() {
        return {
            userName: '',
            password: '',

            loginButtonText: this.$t("Login"),

            inputGroups: {
                userNameInput: {
                    name: 'userName',
                    type: 'text',
                    id: 'login-form-username',
                    label: this.$t("username"),
                    placeholder: this.$t("enterUsername"),
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

    methods: {
        login() {
            this.$store.dispatch('login', {
                "userName": this.userName,
                "password": this.password
            }).then(response => {
                this.$router.push('/loginSuccess');
                return;
            }, error => {
                generalFunctions.handleRequisitionErrors(error);
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
        padding-bottom: 1rem;
        overflow-x: hidden;


        h1 {
            width: 100%;
            padding: 1rem;
            font-size: 1.5rem;
            color: $dark_blue;
        }

        .login-form-groups {
            padding: 1rem 1rem 0rem;
            margin-bottom: 2rem;
        }
    }
}
</style>
