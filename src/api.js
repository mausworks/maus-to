export async function postSubmission(submission) {
  const res = await fetch("/api/link", {
    method: "POST",
    body: JSON.stringify(submission),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    return await res.json();
  } else {
    const { error } = await res.json();

    throw new Error(error);
  }
}

export async function deleteSubmission(linkId) {
  const res = await fetch(`/api/link?id=${linkId}`, { method: "DELETE" });

  if (res.ok) {
    return await res.json();
  } else {
    const { error } = await res.json();

    throw new Error(error);
  }
}
