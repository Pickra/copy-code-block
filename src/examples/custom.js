import copyCodeBlock from '../copyCodeBlock';

const opts = {
    containerBackgroundColor: 'salmon',
    containerColor: '#5e008a'
};

export default string => copyCodeBlock(string, opts);