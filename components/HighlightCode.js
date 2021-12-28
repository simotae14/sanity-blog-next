/* eslint-disable react/no-find-dom-node */
import highlight from 'highlight.js'
import { useEffect, createRef } from 'react'
import { findDOMNode } from 'react-dom'

const HighlightCode = ({ children, language, filename }) => {
  const code = createRef();
  useEffect(() => {
    highlight.highlightBlock(findDOMNode(code.current));
  }, [code]);
  return (
    <pre data-file-name={filename}>
      <code
        ref={code}
        className={language}
      >
        {children}
      </code>
      <div className="code-filename">{filename}</div>
    </pre>
  );
};

export default HighlightCode;
