const createCommentsHTML = function(comments) {
  const commentsHTML = comments.map(({ date, name, comment }) => {
    const localeDate = new Date(date).toLocaleString();
    return `<p>${localeDate}: <strong>${name}</strong> : ${comment}</p>`;
  });
  return commentsHTML.join("\n");
};

const reloadComments = function() {
  fetch("/comments")
    .then(function(response) {
      return response.json();
    })
    .then(function(comments) {
      commentsDiv = document.getElementById("comments");
      commentsDiv.innerHTML = createCommentsHTML(comments);
    });
};

window.onload = function() {
  const reloadButton = document.getElementById("refresh");
  reloadButton.onclick = reloadComments;
  reloadComments();
};
