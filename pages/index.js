import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import PageLayout from 'components/PageLayout'
import AuthorIntro from 'components/AuthorIntro'
import CardListItem from 'components/CardListItem'
import CardItem from 'components/CardItem'
import FilteringMenu from 'components/FilteringMenu'

import { getAllBlogs } from 'lib/api'
import { useGetBlogs } from 'actions'

export default function Home({ blogs: initialData }) {
  const [filter, setFilter] = useState({
    view: {
      list: 0 // if 0 we display cards, if 1 we display a list
    }
  });
  const { data: blogs, error } = useGetBlogs(initialData);

  return (
    <PageLayout>
      <AuthorIntro />
      <FilteringMenu
        filter={filter}
        onChange={(option, value) => {
          setFilter({
            ...filter,
            [option]: value
          })
        }}
      />
      <hr/>
      {/* className from props */}
      <Row className="mb-5">
        {/*
        <Col md="10">
          <CardListItem />
        </Col>
        */}
        {
          blogs.map(({ slug, title, subtitle, date, coverImage, author }) =>
          filter.view.list ? (
            <Col key={`${slug}-list`} md="9">
              <CardListItem
                author={author}
                title={title}
                subtitle={subtitle}
                date={date}
                link={{
                  href: "/blogs/[slug]",
                  as: `/blogs/${slug}`
                }}
              />
            </Col>
          ) : (
            <Col key={slug} md="4">
              <CardItem
                author={author}
                title={title}
                subtitle={subtitle}
                date={date}
                image={coverImage}
                link={{
                  href: "/blogs/[slug]",
                  as: `/blogs/${slug}`
                }}
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
