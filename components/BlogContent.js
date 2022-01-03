/* eslint-disable @next/next/no-img-element */
import BlockContent from '@sanity/block-content-to-react'
import HighlightCode from 'components/HighlightCode'
import { urlFor } from 'lib/api';

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
        <HighlightCode
          language={language}
          filename={filename}
        >
          {code}
        </HighlightCode>
      )
    },
    image: ({ node: {
      asset,
      alt
    } }) => {
      return (
        <div className="blog-image">
          <img alt={alt} src={urlFor(asset).height(300).fit('max').url()} />
          <div className="image-alt">{alt}</div>
        </div>
      )
    }
  }
}

const BlogContent = ({ content }) => {
  return (
    <BlockContent
      blocks={content}
      serializers={serializers}
    />
  );
};

export default BlogContent;
