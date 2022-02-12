import { useState } from 'react'
import { Row, Button } from 'react-bootstrap'
import PageLayout from 'components/PageLayout'
import AuthorIntro from 'components/AuthorIntro'
import FilteringMenu from 'components/FilteringMenu'

import { useGetBlogsPages } from 'actions/pagination'
import { getAllBlogs } from 'lib/api'

export default function Home({ blogs }) {
  const [filter, setFilter] = useState({
    view: {
      list: 0 // if 0 we display cards, if 1 we display a list
    },
    // add filter for the date
    date: {
      asc: 0
    }
  });

  // loadMore: to load more data
  // isLoadingMore: is true whenever we are making request to fetch data
  // isReachingEnd: is true when we loaded all of the data, data is empty (empty array)

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
        {pages}
      </Row>
      {/* Load more blogs button */}
      <div style={{textAlign: 'center'}}>
        <Button
          onClick={loadMore}
          disabled={isReachingEnd || isLoadingMore}
          size="lg"
          variant="outline-secondary"
        >
          { isLoadingMore ? '...' : isReachingEnd ? 'No more blogs' : 'More Blogs' }
        </Button>
      </div>
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  const blogs = await getAllBlogs({ offset: 0, date: 'desc' });
  return {
    props: {
      blogs
    }
  }
}
