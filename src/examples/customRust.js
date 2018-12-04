import copyCodeBlock from '../copyCodeBlock';

const opts = {
  lang: 'rust',
  colors: {
    foreground: '#222',
    function: '#266',
    title: '#a42',
    comment: '#2a2',
    built_in: '#a26',
    string: '#288',
    meta: '#555',
    metaString: '#d2d' /* camelCase is converted to hyphen-case */
  }
};

export default string => copyCodeBlock(string, opts);
