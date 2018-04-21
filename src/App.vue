<template>
  <div id="app">
    <tt-header></tt-header>

    <main class="container">
        <div class="row intro-row">
            <section class="content-section" id="who-are-we">
                <tt-banner>Who are we?</tt-banner>
                <div class="text-container">
                    <p>We are Themeathon, a speedrunning marathon for charity founded by Lordmau5 and Jugachi in 2016.</p>
                    <p>Currently we are streaming the pre-marathon, a 24 hour online marathon raising money for Save the Chlidren.</p>
                    <p>The official marathon will be themed; guiding the breadth of content provided to you by our lovely hosts.
                        If you have a run, feel welcome to submit for the official marathon! Don't worry about conforming to the theme, it's not required for any runs.</p>
                    <p>The theme and dates for themeathon 2018 will be announced after the premarathon, so stay tuned!</p>
                </div>
            </section>
        </div>

        <div class="row stc-row">
            <section class="content-section" id="save-the-children">
                <tt-banner>Save the Children</tt-banner>
                <div class="text-container">
                    <p><a href="http://www.savethechildren.org/" target="_blank">Save the Children</a> is a global,
                        nonprofit organization serving children in 120 countries around the world.</p>

                    <p>We give children a healthy start, the opportunity to learn and protection from harm.
                        We aim to inspire breakthroughs in the way the world treats children,
                        and to achieve immediate and lasting change in childrens lives by improving their health,
                        education and economic opportunities.</p>

                    <p>Save the Children invests in childhood - everyday, in times of crisis and for our future.
                        In times of acute crisis, we mobilize rapid assistance to help children recover from the effects of war,
                        conflict and natural disasters.</p>

                    <p>Recognized for our commitment to accountability, innovation and collaboration,
                        our work takes us into the heart of communities,
                        where we help children and families help themselves.</p>

                    <p>We work with other organizations, governments, non-profits and a variety of local partners while
                        maintaining our own independence without political agenda or religious orientation.</p>

                    <p>We are one of the most trusted, efficient and effective charitable organizations in the world.
                        We have received Charity Navigator's* highest 4-star rating for 14 years in a row. </p>

                    <p><a href="https://www.charitynavigator.org/index.cfm?bay=search.summary&orgid=4438#.VxUsKPkrKUk" target="_blank">Save The Children's annual report from 2014.</a>
                        If you wish to learn more about their work and what they do in the field.</p>
                </div>
            </section>
        </div>

        <div v-if="streamOnline" class="row player-row">
            <section class="content-section" id="twitch-live">
                <tt-banner>Livestream</tt-banner>

                <div class="player-wrapper">
                    <iframe
                        class="player"
                        :src="'https://player.twitch.tv/?channel=' + channel"
                        frameborder="0"
                        allowfullscreen="true"
                        scrolling="no"
                    ></iframe>
                </div>
            </section>
        </div>

        <div class="row schedule-row">
            <section class="content-section" id="schedule">
                <tt-banner>Schedule</tt-banner>
                <tt-schedule></tt-schedule>
            </section>
        </div>

        <div class="row team-row">
            <section class="content-section" id="team">
                <tt-banner>Team</tt-banner>
                <tt-team></tt-team>
            </section>
        </div>
    </main>
  </div>
</template>

<script>
export default {
    created() {
        fetch('https://decapi.me/twitch/uptime/' + this.channel).then(res => {
            if (!res.ok) {
                return;
            }
            return res.text();
        }).then(body => {
            if (!body) {
                return;
            }
            const end = 'offline';
            if (body.length > end.length && body.substr(-end.length) !== end) {
                this.streamOnline = true;
            }
        });
    },
    data() {
        return {
            channel: process.env.TWITCH_CHANNEL,
            streamOnline: false,
        };
    }
};
</script>

<style lang="scss">
@import './styles/styles';
</style>
