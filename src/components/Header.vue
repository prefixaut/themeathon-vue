<template>
    <header>
        <div class="title">
            <a href="/">
                <div class="logo-wrapper">
                <img class="logo" src="/static/images/logo-title-sw.png" />
                </div>
            </a>
        </div>

        <div class="social-media">
            <a v-if="discord" class="social discord" :href="discord" title="Discord Invite-Link" target="_blank">
                <i class="icon fab fa-discord"></i>
            </a>
            <a v-if="twitch" class="social twitch" :href="'https://www.twitch.tv/' + twitch" :title="twitch" target="_blank">
                <i class="icon fab fa-twitch"></i>
            </a>
            <a v-if="twitter" class="social twitter" :href="'https://twitter.com/' + twitter" :title="'@' + twitter" target="_blank">
                <i class="icon fab fa-twitter"></i>
            </a>
            <a v-if="youtube" class="social youtube" :href="youtube" title="YouTube Channel" target="_blank">
                <i class="icon fab fa-youtube"></i>
            </a>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            discord: process.env.DISCORD_LINK,
            twitch: process.env.TWITCH_CHANNEL,
            twitter: process.env.TWITTER_NAME,
            youtube: process.env.YOUTUBE_LINK,
        };
    }
};
</script>

<style lang="scss">
@import '../styles/config';

header {
    width: 100%;
    height: 70px;
    position: sticky;
    background: $color-gray-base;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    .social-media {
        display: none;
    }

    @include media-up('sm') {
        .social-media {
            display: block;
            height: 100%;
            flex: 0 0 auto;

            .social {
                height: 100%;
                width: 70px;
                padding: 15px;
                display: block;
                box-sizing: border-box;
                border-right: 1px solid $color-gray-dark;
                text-align: center;
                transition: 300ms;
                float: left;

                &:last-child {
                    border-right: none;
                }

                .icon {
                    vertical-align: middle;
                    transition: 300ms;
                    font-size: 38px;
                }

                @each $name, $color in $header-icons {
                    &.#{$name} {
                        .icon {
                            color: $color;
                        }

                        &:hover {
                            background: $color;

                            .icon {
                                color: $color-off-white;
                            }
                        }
                    }
                }
            }
        }
    }

    .title {
        height: 100%;
        font-family: 'ADAM';
        color: $color-primary-base;
        flex: 0 0 auto;
        margin: auto;
        padding: 0 10px;

        .logo-wrapper {
            height: 100%;
            display: inline-block;

            .logo {
                height: 100%;
            }
        }
    }
}
</style>
