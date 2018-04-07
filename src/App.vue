<template>
  <div id="app">
    <tt-header></tt-header>
    <main class="container">
        <div class="row">
            <section class="content-section" id="who-are-we">
                <tt-banner>Who are we?</tt-banner>
                <div class="text-container">
                    <p>We are Themeathon, a speedrunning marathon for charity founded by Lordmau5 and Jugachi in 2016.</p>
                    <p>Currently we are streaming the pre-marathon, a 24 hour online marathon raising money for Save the Chlidren. </p>
                    <p>The official marathon will be themed; guiding the breadth of content provided to you by our lovely hosts.
                        If you have a run, feel welcome to submit for the official marathon! Don't worry about conforming to the theme, it's not required for any runs.</p>
                    <p>The theme and dates for themeathon 2018 will be announced after the premarathon, so stay tuned!</p>
                </div>
            </section>
        </div>

        <div class="row player-row">
            <section class="content-section" id="twitch-live">
                <tt-banner>Livestream</tt-banner>

                <div class="player-wrapper">
                    <iframe
                        class="player"
                        src="https://player.twitch.tv/?channel=themeathon"
                        frameborder="0"
                        allowfullscreen="true"
                        scrolling="no"
                    ></iframe>
                </div>
            </section>
        </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './styles/styles';
</style>
