<script>
  import { scale } from "svelte/transition";
</script>

<style>
  .card {
    margin-top: 4vh;
    background-color: #fff;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #e5e3e1;
    display: flex;
    flex-direction: column;
  }
</style>

<div in:scale out:scale class="card">
  <slot />
</div>
