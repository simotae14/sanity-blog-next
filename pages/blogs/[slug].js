import PageLayout from "components/PageLayout"
import { getBlogBySlug } from 'lib/api'

const BlogDetail = ({ blog }) => {
  return (
    <PageLayout>
      <h1>
        Hello Detail Page - {blog?.slug}
      </h1>
    </PageLayout>
  );
}

export async function getStaticProps({ params }) {
  const blog = await getBlogBySlug(params.slug);
  return {
    props: {
      blog
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          slug: 'my-third-blog'
        }
      },
      {
        params: {
          slug: 'my-second-blog'
        }
      },
      {
        params: {
          slug: 'my-first-blog'
        }
      }
    ],
    fallback: false
  }
}

export default BlogDetail;
