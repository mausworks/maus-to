<script>
  import { postSubmission, deleteSubmission } from "./api";
  import store from "./user-links";

  import Card from "./Card.svelte";
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
  h1 {
    margin: 24px 0;
    text-align: center;
    font-size: 22px;
  }
</style>

<Card>
  <h1>Shorten link</h1>
  <ShortenerForm {error} {url} {slug} onSubmitted={submitLink} />
</Card>

{#if links && links.length}
  <Card>
    {#each links as link (link._id)}
      <UserLink
        {...link}
        clickDiscard={() => discardLink(link)}
        clickDelete={() => deleteLink(link._id)} />
    {/each}
  </Card>
{/if}
