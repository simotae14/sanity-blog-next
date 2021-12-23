import client from './sanity';

const blogFields = `
  title,
  subtitle,
  'slug': slug.current,
  date,
  'author': author->{
    name,
    'avatar': avatar.asset->url
  },
  'coverImage': coverImage.asset->url
`;

export async function getAllBlogs() {
  const results = await client
    .fetch(`*[_type == "blog"]{${blogFields}}`);
  return results;
}

// retrieve a single blog data
export async function getBlogBySlug(slug) {
  const results = await client
    .fetch(`*[_type == "blog && slug.current == $slug] {
      ${blogFields}
    }`, {slug})

  return results[0]
}
