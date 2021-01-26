<script lang="ts">
    import Game from "./entities/Game";
    import {getRepository} from "fireorm";

    function createGame(){
        const gameRepository = getRepository(Game)
        let game = new Game()
        game.countdownTime = 60
        game.remainingTime =
        game.isStarted = false
    }
</script>

<style>
</style>

<div class="App">
    <h1>Spielerklärung</h1>
    <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
        takimata sanctus est Lorem ipsum dolor sit amet.
    </p>
    <button on:click={createGame}>lokales Spiel</button>
    <button on:click={createGame}>remote Spiel</button>
</div>
