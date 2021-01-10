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
    flex: 0 1 calc(50% - 6px);
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: rgba(8, 8, 8, 0.2);
    padding: 24px 24px 14px 24px;
  }

  @media screen and (max-width: 540px) {
    .user-link {
      flex: 0 0 100%;
    }
  }

  .alias-url {
    background-color: transparent;
    border: none;
    font-size: 16px;
    height: 22px;
    color: #effffd;
    outline: none !important;
    margin-bottom: 8px;
    padding: 0;
  }

  .target-url {
    font-family: "Archivo Narrow", "Roboto Condensed", sans-serif;
    color: rgba(239, 255, 253, 0.5);
  }

  .discard {
    background: none;
    width: 12px;
    height: 12px;
    border: none;
    position: absolute;
    right: 10px;
    top: 8px;
  }

  .discard svg {
    width: 10px;
    height: 10px;
  }

  .actions {
    margin-top: 20px;
  }

  .actions button {
    height: 26px;
    background: transparent;
    border: none;
    padding: 0 14px;
    outline: none !important;
    cursor: pointer;
  }

  .actions .delete {
    background-color: #bf0d24;
    color: #080808;
    border-radius: 13px;
    transition: all 250ms ease-out;
  }

  .actions .delete:hover,
  .actions .delete:focus {
    box-shadow: 0 2px 12px -4px #bf0d24;
  }
</style>

<div class="user-link" in:scale out:scale>
  <div class="submission">
    <div class="info">
      <input
        class="alias-url"
        readonly
        onclick="this.select();"
        type="text"
        value="maus.to/{slug}" />

      <div class="target-url">{url}</div>
    </div>
  </div>

  <button
    class="discard"
    title="Remove from your links"
    on:click={clickDiscard}>
    <svg viewBox="0 0 12 12">
      <path
        stroke="#EFFFFD"
        stroke-opacity=".2"
        stroke-width="3"
        d="M10 2L6 6m0 0l-4 4m4-4L2 2m4 4l4 4" />
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
