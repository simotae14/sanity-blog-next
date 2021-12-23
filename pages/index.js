import { Row, Col } from 'react-bootstrap'
import PageLayout from 'components/PageLayout'
import AuthorIntro from 'components/AuthorIntro'
import CardListItem from 'components/CardListItem'
import CardItem from 'components/CardItem'

import { getAllBlogs } from 'lib/api'

export default function Home({ blogs }) {
  return (
    <PageLayout>
      <AuthorIntro />
      <hr/>
      {/* className from props */}
      <Row className="mb-5">
        {/*
        <Col md="10">
          <CardListItem />
        </Col>
        */}
        {
          blogs.map(({ slug, title, subtitle, date, coverImage, author }) => (
            <Col key={slug} md="4">
              <CardItem
                author={author}
                title={title}
                subtitle={subtitle}
                date={date}
                image={coverImage}
              />
            </Col>
          ))
        }

      </Row>
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  const blogs = await getAllBlogs();
  return {
    props: {
      blogs
    }
  }
}
