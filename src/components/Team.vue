<template>
    <div class="team">
        <div class="row master-row">
            <div class="column section-column" v-for="(section, sectionIndex) in sections" :key="sectionIndex">
                <div class="section-title">
                    <h3>{{ section.name }}</h3>
                </div>
                <div class="row section-row">
                    <div class="column member" v-for="(member, memberIndex) in section.members" :key="sectionIndex + '-' + memberIndex">
                        <tt-card>
                            <template slot="header">{{ member.name }}</template>
                            <img :src="member.image" />
                        </tt-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sections: [
                {
                    name: 'Lead',
                    members: [
                        {
                            name: 'Lordmau5',
                            image: '/static/images/lordmau5.png',
                        },
                        {
                            name: 'Jugachi',
                            image: '/static/images/jugachi.png',
                        },
                    ]
                },
                {
                    name: 'Mods',
                    members: [
                        {
                            name: 'Konasumi',
                            image: '/static/images/konasumi.png',
                        },
                        {
                            name: 'DQFan',
                            image: '/static/images/dqfan.png',
                        },
                    ]
                },
                {
                    name: 'Editor',
                    members: [
                        {
                            name: 'Speedy',
                            image: '/static/images/speedy.png',
                        },
                    ]
                },
                {
                    name: 'Host/Mod',
                    members: [
                        {
                            name: 'Fox',
                            image: '/static/images/fox.png',
                        }
                    ]
                },
            ]
        };
    }
};
</script>

<style lang="scss">
@import '../styles/config';

.team {
    .row {
        flex-wrap: wrap;
        justify-content: center;
    }

    .section-column {
        border-right: 1px solid $color-off-black;
        border-left: 1px solid $color-off-black;
        margin-top: 35px;

        &:first-child {
            border-left: none;
        }

        &:last-child {
            border-right: none;
        }
    }

    .section-row {
        justify-content: space-around;
    }

    .section-title {
        display: block;
        padding: 5px 10px;
        text-align: center;
        font-family: ADAM;
        background: $color-primary-base;
        color: $color-off-white;
    }

    @include media-down('md') {
        .master-row {
            flex-direction: column;
        }

        .section-column {
            border: none;
        }
    }
}
</style>
