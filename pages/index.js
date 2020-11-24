import Link from 'next/link';
import Nav from '../components/nav';
import Footer from '../components/footer';
import Header from '../components/header';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLemon } from '@fortawesome/free-solid-svg-icons'

export default () => (
  <div class="container" className="container">
    <Header />
    <Nav />
    <div className="content">
      <h1 className="title">Snappy Recipes <FontAwesomeIcon icon={faLemon} style={{color: "#f7c307"}}/></h1>
      <p className="description">With a zingy lemon twist</p>
    </div>
    <Footer />
    <style jsx>{`
      .svg {
        color: #ffd600;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        padding-bottom: 12px;
        line-height: 1.15;
        font-size: 37px;
        font-weight: 700;
        text-tranfsorm: uppercase;
      }
      .title, .description {
        text-align: center;
      }
    `}</style>
  </div>
);
