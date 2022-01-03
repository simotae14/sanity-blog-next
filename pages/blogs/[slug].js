/* eslint-disable @next/next/no-img-element */
import PageLayout from "components/PageLayout"
import BlogHeader from 'components/BlogHeader'
import BlogContent from "components/BlogContent"
import {
  getBlogBySlug,
  getAllBlogs,
  urlFor
} from 'lib/api'
import { Row, Col } from 'react-bootstrap'

const BlogDetail = ({ blog }) => {
  return (
    <PageLayout className="blog-detail-page">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <BlogHeader
            title={blog.title}
            subtitle={blog.subtitle}
            coverImage={urlFor(blog?.coverImage).height(600).url()}
            author={blog.author}
            date={blog.date}
          />
          <hr/>
          {/* Blog Content Here */}
          <BlogContent content={blog.content} />
        </Col>
      </Row>
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
  // retrieve all the blogs
  const blogs = await getAllBlogs();
  const paths = blogs?.map(({slug}) => (
    {
      params: {
        slug
      }
    }
  ))
  return {
    paths,
    fallback: false
  }
}

export default BlogDetail;
