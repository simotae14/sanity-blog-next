/* eslint-disable @next/next/no-img-element */
import PageLayout from "components/PageLayout"
import BlogHeader from 'components/BlogHeader'
import { getBlogBySlug, getAllBlogs } from 'lib/api'
import { Row, Col } from 'react-bootstrap'

import BlockContent from '@sanity/block-content-to-react'

const serializers = {
  types: {
    code: ({
      node: {
        language,
        code,
        filename
      }
    }) => {
      return (
        <pre data-language={language}>
          <code>{code}</code>
          <p>{filename}</p>
        </pre>
      )
    }
  }
}

const BlogDetail = ({ blog }) => {
  return (
    <PageLayout className="blog-detail-page">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <BlogHeader
            title={blog.title}
            subtitle={blog.subtitle}
            coverImage={blog.coverImage}
            author={blog.author}
            date={blog.date}
          />
          <hr/>
          {/* Blog Content Here */}
          <BlockContent
            blocks={blog.content}
            serializers={serializers}
            imageOptions={{
              w: 320,
              h: 240,
              fit: 'max'
            }}
          />
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
