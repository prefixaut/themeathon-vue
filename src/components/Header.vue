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
            <a class="social discord" href="https://discordapp.com/invite/wd5GwXK" target="_blank">
                <i class="icon fab fa-discord"></i>
            </a>
            <a class="social twitch" href="https://www.twitch.tv/Themeathon" target="_blank">
                <i class="icon fab fa-twitch"></i>
            </a>
            <a class="social twitter" href="https://twitter.com/Themeathon" target="_blank">
                <i class="icon fab fa-twitter"></i>
            </a>
            <a class="social youtube" href="https://www.youtube.com/channel/UCoeWJ8x6jM_tN5AnBqLzQfg" target="_blank">
                <i class="icon fab fa-youtube"></i>
            </a>
        </div>

        <nav class="menu-wrapper">
            <ul class="menu">
                <li>Who are we</li>
                <li>Save the Children</li>
                <li>Team</li>
            </ul>
        </nav>
    </header>
</template>

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

    .menu-wrapper {
        display: none;
    }
}
</style>
