// Fetch posts
fetch('http://localhost:5000/api/posts')
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    // Render posts dynamically
  })
  .catch((err) => console.error(err));

// Create a post
const createPost = (content, image) => {
  fetch('http://localhost:5000/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: 'USER_ID', content, image }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('Post created:', data);
    })
    .catch((err) => console.error(err));
};
