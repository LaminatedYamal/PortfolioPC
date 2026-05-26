const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'dkwgoenb',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

console.log("Fetching projects from Sanity...");
client.fetch(`*[_type == "project"] { _id, title, category, thumbnail, mediaGallery }`)
  .then(res => {
    console.log("Success! Found projects count:", res.length);
    console.log(JSON.stringify(res, null, 2));
  })
  .catch(err => {
    console.error("Error fetching from Sanity:", err.message);
  });
