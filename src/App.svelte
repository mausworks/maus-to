<script>
  import { postSubmission } from "./api";
  import store from "./user-links";

  import Card from "./Card.svelte";
  import ShortenerForm from "./ShortenerForm.svelte";
  import UserLink from "./UserLink.svelte";

  const userLinks = store();

  let links = userLinks.list();
  let error = "";

  function submitLink(submission) {
    postSubmission(submission)
      .then((link) => {
        links = userLinks.add(link);
      })
      .catch(({ message }) => {
        error = message;

        setTimeout(() => (error = ""), 5000);
      });
  }

  function deleteLink(link) {
    links = userLinks.remove(link._id);
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
  <ShortenerForm onSubmitted={submitLink} {error} />
</Card>

{#if links && links.length}
  <Card>
    {#each links as link (link._id)}
      <UserLink {...link} clickDelete={() => deleteLink(link)} />
    {/each}
  </Card>
{/if}
