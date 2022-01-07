import client from './sanity';
import imageUrlBuilder from '@sanity/image-url'

const blogFields = `
  title,
  subtitle,
  'slug': slug.current,
  date,
  'author': author->{
    name,
    'avatar': avatar.asset->url
  },
  coverImage
`;

const builder = imageUrlBuilder(client)
export const urlFor = source => builder.image(source);

export async function getAllBlogs({ offset }) {
  const results = await client
    .fetch(`*[_type == "blog"]{${blogFields}}[${offset}...${offset + 3}]`);
  return results;
}

// retrieve a single blog data
export async function getBlogBySlug(slug) {
  const result = await client
    .fetch(`*[_type == "blog" && slug.current == $slug] {
      ${blogFields},
      content[]{
        ...,
        "asset": asset->
      }
    }`, {slug})
    .then(res => res?.[0])
  return result;
}
