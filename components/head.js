import NextHead from 'next/head';
import { string } from 'prop-types';

const Head = (props) => (
  <NextHead>
    <title>Snappy Recipes</title>
  </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
  keywords: string,
  url: string,
  ogImage: string
};

export default Head;
