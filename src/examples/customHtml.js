import copyCodeBlock from '../copyCodeBlock';

const opts = {
    lang: 'html',
    colors: {
        background: '#222',
        textColor: '#fff',
        attr: '#fab',
        string: '#abe',
        tag: '#afa',
        name: '#ea8'
    }
};

export default string => copyCodeBlock(string, opts);
