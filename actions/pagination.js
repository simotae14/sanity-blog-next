import { useSWRPages } from 'swr'
import { useGetBlogs } from 'actions'
import { Col } from 'react-bootstrap'
import CardItem from 'components/CardItem'
import CardListItem from 'components/CardListItem'

export const useGetBlogsPages = ({blogs, filter}) => {
  return useSWRPages(
    'index-page',
    // callback, we fetch the data
    ({offset, withSWR}) => {
      let initialData = !offset && blogs;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data: paginatedBlogs } = withSWR(useGetBlogs({offset, filter}, initialData));
      if (!paginatedBlogs) { return 'Loading...'}

      return paginatedBlogs
        .map(({ slug, title, subtitle, date, coverImage, author }) =>
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
    },
    // here you will compute offset that will get passed into previous callback function with 'withSWR'
    // SWR: data you will get from 'withSWR' function
    // index: number of current page
    (SWR, index) => {
      // SWR contains the previous data
      if (SWR.data && SWR.data.length === 0) { return null }
      return (index + 1) * 3
    },
    // array dependencies
    [filter]
  )
}
