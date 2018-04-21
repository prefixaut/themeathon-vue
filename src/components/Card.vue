<template>
    <div class="card">
        <div v-if="$slots.header" class="header">
            <slot name="header"></slot>
        </div>
        <div class="content">
            <slot></slot>
        </div>
        <div v-if="$slots.footer" class="footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
@import '../styles/config';
.card {
    width: 100%;

    .header {
        padding: 15px 20px;
        background: $color-gray-light;
        border-bottom: 1px solid $color-gray-very-dark;
        font-family: ADAM;
        text-align: center;
        font-size: 26px;
        line-height: 1.3;
    }

    .content {
        background: $color-gray-light;
        > *:not(img) {
            padding: 20px;
        }
        > img {
            margin: auto;
            display: block;
        }
    }

    .footer {
        padding: 15px 20px;
        background: $color-gray-base;
        border-top: 1px solid $color-gray-very-dark;
    }
}
</style>
