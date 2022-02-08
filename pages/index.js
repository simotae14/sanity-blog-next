import { useState } from 'react'
import { Row } from 'react-bootstrap'
import PageLayout from 'components/PageLayout'
import AuthorIntro from 'components/AuthorIntro'
import FilteringMenu from 'components/FilteringMenu'

import { useGetBlogsPages } from 'actions/pagination'
import { getAllBlogs } from 'lib/api'

export default function Home({ blogs }) {
  const [filter, setFilter] = useState({
    view: {
      list: 0 // if 0 we display cards, if 1 we display a list
    }
  });

  const {
    pages,
    isLoadingMore,
    isReachingEnd,
    loadMore
  } = useGetBlogsPages({blogs, filter});

  return (
    <PageLayout>
      <AuthorIntro />
      <FilteringMenu
        filter={filter}
        onChange={(option, value) => setFilter({
            ...filter,
            [option]: value
          })
        }
      />
      <hr/>
      {/* className from props */}
      <Row className="mb-5">
        {/*
        <Col md="10">
          <CardListItem />
        </Col>
        */}
        {pages}
      </Row>
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  const blogs = await getAllBlogs({ offset: 0 });
  return {
    props: {
      blogs
    }
  }
}
