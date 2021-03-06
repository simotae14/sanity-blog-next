import { getAllBlogs } from 'lib/api'

export default async function getBlogs(req, res) {
  // retrieve offset and transform it in a number
  const offset = parseInt((req.query.offset || 0), 10)
  const date = req.query.date || 'desc'
  const data = await getAllBlogs({offset, date});
  res.status(200).json(data)
}
