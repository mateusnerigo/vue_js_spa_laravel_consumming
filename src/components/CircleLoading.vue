<template>
    <div class="circle-loading-container"
        :class="{'full-page': fullPage}">
        <div class="circle-loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script>
export default{
    name: 'CircleLoading',
    props: {
        fullPage: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped lang="scss">
@import '/src/scss/variables.scss';

.circle-loading-container {
    transition: .2s;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;

    &.full-page {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 999;
        background: radial-gradient($transparent_white, $white);
    }
}

.circle-loading {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;

    div {
        animation: circle-loading 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        transform-origin: 40px 40px;

        &:after {
            content: " ";
            display: block;
            position: absolute;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: $black;
            margin: -4px 0 0 -4px;
        }

        &:nth-child(1) {
            animation-delay: -0.036s;

            &:after {
                top: 63px;
                left: 63px;
            }
        }

        &:nth-child(2) {
            animation-delay: -0.072s;

            &:after {
                top: 68px;
                left: 56px;
            }
        }

        &:nth-child(3) {
            animation-delay: -0.108s;

            &:after {
                top: 71px;
                left: 48px;
            }
        }

        &:nth-child(4) {
            animation-delay: -0.144s;

            &:after {
                top: 72px;
                left: 40px;
            }
        }

        &:nth-child(5) {
            animation-delay: -0.18s;

            &:after {
                top: 71px;
                left: 32px;
            }
        }

        &:nth-child(6) {
            animation-delay: -0.216s;

            &:after {
                top: 68px;
                left: 24px;
            }
        }

        &:nth-child(7) {
            animation-delay: -0.252s;

            &:after {
                top: 63px;
                left: 17px;
            }
        }

        &:nth-child(8) {
            animation-delay: -0.288s;

            &:after {
                top: 56px;
                left: 12px;
            }
        }
    }
}

@keyframes circle-loading {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
