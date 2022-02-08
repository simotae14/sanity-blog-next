import { useSWRPages } from 'swr'
import { useGetBlogs } from 'actions'
import { Col } from 'react-bootstrap'
import CardItem from 'components/CardItem'
import CardListItem from 'components/CardListItem'

export const useGetBlogsPages = ({blogs: initialData, filter}) => {
  return useSWRPages(
    'index-page',
    // callback, we fetch the data
    ({offset, withSWR}) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data: blogs } = withSWR(useGetBlogs(initialData));

      if (!blogs) { return 'Loading...'}

      return blogs
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
      return 0
    },
    // array dependencies
    [filter]
  )
}
