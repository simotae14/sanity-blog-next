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
      alt,
      position = 'center'
    } }) => {
      let style = {};
      if (position === 'left') {
        style.float = position;
        style.marginRight = '30px';
      }
      if (position === 'right') {
        style.float = position;
        style.marginLeft = '30px';
      }
      return (
        <div className="blog-image" style={{ ...style }}>
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
