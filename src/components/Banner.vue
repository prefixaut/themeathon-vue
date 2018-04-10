<template>
    <div class="banner">
        <div class="left"></div>
        <div class="content">
            <span>
                <slot></slot>
            </span>
        </div>
        <div class="right"></div>
    </div>
</template>

<style lang="scss">
@import '../styles/config';

.banner {
    height: 110px;
    display: flex;
    justify-content: center;
    margin: 10px 0;

    .left {
        height: 100%;
        width: 80px;
        display: inline-block;
        background-image: url('/static/images/badge-left.png');
        background-size: cover;
        background-repeat: no-repeat;
    }

    .right {
        height: 100%;
        width: 80px;
        display: inline-block;
        background-image: url('/static/images/badge-right.png');
        background-size: cover;
        background-repeat: no-repeat;
    }

    .content {
        height: 91px;
        display: inline-block;
        background: $color-banner;
        box-shadow: 0px 7.5px #{'rgba(35, 31, 32, 30%)'};
        display: flex;

        span {
            display: block;
            margin-top: 15px;
            font-size: 48px;
            font-family: ADAM;
        }
    }
}

@include media-down('md') {
    .banner {
        height: 80px;

        .left,
        .right {
            width: 63px;
        }

        .content {
            height: 71px;

            span {
                font-size: 32px;
            }
        }
    }
}
</style>
