export default function userLinks() {
  let links = JSON.parse(localStorage.getItem("USER_LINKS") || "[]");

  function save() {
    localStorage.setItem("USER_LINKS", JSON.stringify(links));
  }

  return {
    add(newLink) {
      links = [newLink, ...links];
      save();
      return links;
    },
    list() {
      return links;
    },
    remove(id) {
      links = links.filter((link) => link._id !== id);
      save();
      return links;
    },
  };
}
