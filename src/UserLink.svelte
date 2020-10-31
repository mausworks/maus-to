<script>
  import { scale } from "svelte/transition";

  export let url;
  export let slug;

  export let clickDiscard = () => {};
  export let clickDelete = () => {};
</script>

<style>
  .user-link {
    position: relative;
    display: flex;
    padding: 12px 0;
    margin: 0 6px;
    border-top: 1px dashed #ddd;
  }

  .user-link:first-child {
    border-top: none;
  }

  .submission {
    flex: 1 0 auto;
  }

  .origin {
    font-family: "Folio Medium", sans-serif;
    border: none;
    flex: 1 1 auto;
    padding: 0 6px;
    width: 100%;
  }

  .target {
    display: flex;
    margin-top: 6px;
  }

  .target span {
    font-size: 12px;
    opacity: 0.6;
    word-break: break-all;
    padding-right: 24px;
    max-width: 300px;
  }

  .target svg {
    width: 14px;
    height: 14px;
    margin: 0 10px 0 6px;
    flex: 0 0 auto;
    opacity: 0.8;
  }

  .actions {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    justify-content: center;
  }

  .actions button {
    border: none;
    top: 0;
    right: 0;
    padding: 0;
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
  }

  .actions svg {
    width: 12px;
    height: 12px;
  }

  .delete svg {
    fill: #d10000;
  }
</style>

<div class="user-link" in:scale out:scale>
  <div class="submission">
    <input
      class="origin"
      readonly
      onclick="this.select();"
      type="text"
      value="https://maus.to/{slug}" />
    <div class="target">
      <svg viewBox="0 0 24 24">
        <path d="M16 8v-4l8 8-8 8v-4h-16l8-8h8z" />
      </svg>
      <span>{url}</span>
    </div>
  </div>

  <div class="actions">
    <button
      class="discard"
      title="Remove from your links"
      on:click={clickDiscard}>
      <svg viewBox="0 0 24 24" clip-rule="evenodd" fill-rule="evenodd">
        <path
          d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" />
      </svg>
    </button>

    <button class="delete" title="Delete link" on:click={clickDelete}>
      <svg viewBox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd">
        <path
          d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm-14-2.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5h-14v16.5zm5-18.5h4v-1h-4v1z" />
      </svg>
    </button>
  </div>
</div>
