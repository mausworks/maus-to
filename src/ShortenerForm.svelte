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
  .shortener-form {
    max-width: 100%;
    display: flex;
    padding: 0 12px;
    gap: 0 12px;
  }

  @media screen and (max-width: 540px) {
    .shortener-form {
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      gap: 12px;
    }

    .input-item {
      flex: 0 0 auto !important;
    }
  }

  .input-item {
    display: flex;
    align-items: center;
    flex: 1 0.5 auto;
  }

  .input-item input {
    width: 100%;
    background: #282828;
    box-shadow: 0px 2px 2px 1px rgba(8, 8, 8, 0.2);
    border-radius: 2px;
    border: none;
    height: 42px;
    padding: 12px;
    transition: all 100ms linear;
    border-bottom: 0px solid transparent;
    font-size: 16px;
    outline: none !important;
  }

  .input-item input::placeholder {
    color: #effffd;
    opacity: 0.8;
  }

  .input-item input:focus {
    box-shadow: 0px 0 18px -8px rgba(8, 8, 8, 0.5);
  }

  .input-item.alias {
    flex: 0 1 340px;
  }

  button {
    display: block;
    flex: 0.12 0.12 130px;
    font-size: 16px;
    max-height: 42px;
    border: none;
    font-weight: 500;
    color: #080808;
    background: #ffff22;
    box-shadow: 0px 2px 2px 1px rgba(8, 8, 8, 0.2);
    border-radius: 2px;
    outline: none;
    transition: all 100ms ease-in;
    cursor: pointer;
  }

  button:focus,
  button:hover {
    box-shadow: 0px 0 18px -8px #ffff22;
  }

  .form-error {
    margin: 12px;
    border-radius: 2px;
    padding: 8px;
  }

  .form-error * {
    font-family: "Archivo Narrow", "Roboto Condensed", sans-serif;
    color: #bf0d24;
    font-weight: 500;
    font-size: 16px;
  }
</style>

<form class="shortener-form" on:submit={submitForm}>
  <div class="input-item">
    <input
      bind:value={url}
      placeholder="URL"
      name="url"
      id="url"
      type="text"
      required
      autocomplete="off" />
  </div>
  <div class="input-item alias">
    <input
      bind:value={slug}
      autocomplete="off"
      name="slug"
      id="slug"
      placeholder="Alias (Optional)"
      type="text"
      minlength="1"
      maxlength="100" />
  </div>

  <button type="submit">Shorten</button>
</form>

<div class="form-error">
  {#if error}
    <div in:fade={{ duration: 200 }} out:fade class="message">{error}</div>
  {/if}
</div>
