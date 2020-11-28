<script>
  import { scale } from "svelte/transition";
  import { fetchStats } from "./api";

  export let url;
  export let slug;

  let visitCount;
  let lastVisit;

  export let clickDiscard = () => {};
  export let clickDelete = () => {};

  const clickShowVisits = () => {
    fetchStats(slug).then((stats) => {
      visitCount = stats.count;
      lastVisit = stats.lastVisitedAt;
    });
  };
</script>

<style>
  .user-link {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 12px 0;
    margin: 0 6px;
    border-bottom: 1px dashed #ddd;
  }

  .user-link:last-child {
    border-bottom: none;
    padding-bottom: 0;
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
    flex-direction: row;
    align-items: flex-start;
    padding: 14px 0 6px 0;
  }

  .actions button {
    font-family: "Folio Medium", sans-serif;
    border-radius: 500px;
    border: none;
    padding: 12px 14px 10px 14px;
    line-height: 0.5;
    font-size: 14px;
    background: #efefef;
  }

  .actions button.visits-loaded {
    background: none;
  }

  .actions .delete {
    margin-right: 8px;
    background-color: #d10000;
    color: #fff;
  }

  .discard {
    border: none;
    margin: 12px 0;
    height: 24px;
    width: 24px;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
  }

  .discard svg {
    width: 12px;
    height: 12px;
  }
</style>

<div class="user-link" in:scale out:scale>
  <div class="submission">
    <div class="info">
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
  </div>

  <button
    class="discard"
    title="Remove from your links"
    on:click={clickDiscard}>
    <svg viewBox="0 0 24 24" clip-rule="evenodd" fill-rule="evenodd">
      <path
        d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" />
    </svg>
  </button>

  <div class="actions">
    <button class="delete" on:click={clickDelete}>Delete</button>
    <button
      title={lastVisit && `Last visited ${new Date(lastVisit).toLocaleString()}`}
      on:click={clickShowVisits}
      class={visitCount !== undefined ? 'visits-loaded' : ''}>
      {visitCount === undefined ? 'Show visits' : visitCount === 1 ? `1 visit` : `${visitCount} visits`}
    </button>
  </div>
</div>
