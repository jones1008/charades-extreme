<script lang="ts">
  import {createGame, Game, getGame} from "./classes/Game"
  import type {Ref} from "typesaurus"
  import {update} from "typesaurus"

  let game: Game
  let gameRef: Ref<Game>

  function newGame() {
    createGame().then(ref => {
      gameRef = ref
      return getGame(ref)
    }).then(gameDoc => {
      game = gameDoc.data
    }).catch(err => {
      console.log(err)
    });
  }

  let newWord: string = ""
  function addWord() {
    game.words.push(newWord)
    newWord = ""
    update(gameRef, game).catch(err => {
      console.log(err)
    });
  }
</script>

<style>
</style>

<div class="App">
  <button on:click={newGame}>Spiel erstellen</button>
  <input name="new-word" type="text" placeholder="Wort eintippen..." bind:value={newWord}>
  <button on:click={addWord}>Wort hinzufügen</button>
  {#if game }
    <h4>Deine Worte</h4>
    {#each game.words as word}
      <p>{word}</p>
    {/each}
  {/if}
</div>
