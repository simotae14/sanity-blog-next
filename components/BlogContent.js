import BlockContent from '@sanity/block-content-to-react'
import HighlightCode from 'components/HighlightCode'

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
    }
  }
}

const BlogContent = ({ content }) => {
  return (
    <BlockContent
      blocks={content}
      serializers={serializers}
      imageOptions={{
        w: 320,
        h: 240,
        fit: 'max'
      }}
    />
  );
};

export default BlogContent;
