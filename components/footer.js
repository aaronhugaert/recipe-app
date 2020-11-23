const Footer = () => (
  <footer>
    <ul>
      <li>
        Made by Aaron Hugaert
      </li>
    </ul>
    <style jsx>{`
      :global(body) {
        margin: 0;
      }

      footer li {
        display: block;
        float: right;
        list-style: none;
      }
    `}</style>
  </footer>
);

export default Footer;
