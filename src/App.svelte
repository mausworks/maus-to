<script>
  import { postSubmission, deleteSubmission } from "./api";
  import store from "./user-links";

  import ShortenerForm from "./ShortenerForm.svelte";
  import UserLink from "./UserLink.svelte";

  const userLinks = store();
  let links = userLinks.list();

  let url = "";
  let slug = "";
  let error = "";

  function submitLink(submission) {
    postSubmission(submission)
      .then((link) => {
        links = userLinks.add(link);

        // Seems it's only possible to clear using "null"
        url = " "; // Otherwise this will just work once (?!)
        slug = " ";
        url = null;
        slug = null;
      })
      .catch(({ message }) => {
        error = message;

        setTimeout(() => (error = ""), 5000);
      });
  }

  function discardLink(link) {
    links = userLinks.remove(link._id);
  }

  function deleteLink(linkId) {
    if (!confirm("Are you sure you want to delete this link?")) {
      return;
    }

    deleteSubmission(linkId).then((isDeleted) => {
      if (isDeleted) {
        links = userLinks.remove(linkId);
      }
    });
  }
</script>

<style>
  .shortened-links {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding: 0 12px;
    box-sizing: border-box;
  }
</style>

<h1 class="section-heading">Shorten link</h1>
<ShortenerForm {error} {url} {slug} onSubmitted={submitLink} />

{#if links && links.length}
  <h1 class="section-heading">Shortened links</h1>
  <div class="shortened-links">
    {#each links as link (link._id)}
      <UserLink
        {...link}
        clickDiscard={() => discardLink(link)}
        clickDelete={() => deleteLink(link._id)} />
    {/each}
  </div>
{/if}
