<script>
  import { fade } from "svelte/transition";

  export let error;
  export let url;
  export let slug;

  export let onSubmitted = () => {};

  function submitForm(event) {
    event.preventDefault();

    const trimmedSlug = slug?.trim();

    onSubmitted({
      url,
      slug: trimmedSlug ? trimmedSlug : undefined,
    });

    return false;
  }
</script>

<style>
  .input-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 16px 4px;
  }

  .input-item input {
    flex: 0.5 1 auto;
    height: 42px;
    padding: 0 6px;
    border: none;
    border-bottom: 1px solid #ddd;
    outline: none !important;
  }

  .form-lower {
    margin: 36px 0 12px 0;
    display: flex;
    align-items: center;
  }

  button {
    display: block;
    margin: 0 24px 0 auto;
    padding: 16px 24px 12px 24px;
    font-family: "Folio Medium", sans-serif;
    line-height: 1;
    background-color: #1b0b0f;
    border-radius: 100px;
    border: none;
    color: #fff;
    cursor: pointer;
    outline: none !important;
  }

  .message {
    color: #a80000;
    border-radius: 200px;
    flex: 1 1 auto;
    margin: 0 12px 0 12px;
  }
</style>

<form on:submit={submitForm}>
  <div class="input-item">
    <label for="url">Link</label>
    <input
      bind:value={url}
      name="url"
      id="url"
      type="text"
      required
      autocomplete="off" />
  </div>
  <div class="input-item">
    <label for="slug">Slug</label>
    <input
      bind:value={slug}
      autocomplete="off"
      name="slug"
      id="slug"
      placeholder="(Optional)"
      type="text"
      minlength="1"
      maxlength="100" />
  </div>
  <div class="form-lower">
    {#if error}
      <div in:fade={{ duration: 200 }} out:fade class="message">{error}</div>
    {/if}
    <button type="submit">Shorten</button>
  </div>
</form>
