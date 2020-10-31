<script>
  import { scale } from "svelte/transition";

  export let url;
  export let slug;
  export let _id;

  export let clickDelete = () => {};
</script>

<style>
  .user-link {
    position: relative;
    padding: 12px 0;
    margin: 0 6px;
    border-top: 1px dashed #ddd;
  }

  .user-link:first-child {
    border-top: none;
  }

  .user-link input {
    font-family: "Folio Medium", sans-serif;
    border: none;
    flex: 1 1 auto;
    padding: 0 6px;
  }

  .target {
    display: flex;
    align-items: center;
  }

  .target span {
    font-size: 12px;
    opacity: 0.6;
    word-break: break-all;
    padding-right: 24px;
  }

  .target svg {
    width: 14px;
    height: 14px;
    margin: 6px 12px 6px 6px;
    flex: 0 0 auto;
    opacity: 0.8;
  }

  .delete {
    border: none;
    position: absolute;
    top: 0;
    right: 0;
    margin: 12px 6px 0 0;
    padding: 0;
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
  }

  .delete svg {
    width: 14px;
    height: 14px;
    fill: #a80000;
  }
</style>

<div class="user-link" in:scale out:scale>
  <input
    id="link-{_id}"
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
  <button class="delete" on:click={clickDelete}>
    <svg viewBox="0 0 24 24">
      <path
        d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" />
    </svg>
  </button>
</div>
