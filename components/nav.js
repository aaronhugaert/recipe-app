import Link from 'next/link';

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/recipes">
          <a>Recipes</a>
        </Link>
      </li>
    </ul>

    <style jsx>{`
      :global(body) {
        margin: 0;
      }
      nav {
        width: 100%;
        text-align: center;
        background-color: black;
        padding-left: 1rem;
        padding-right: 1rem;
      }
      nav a {
        color: white;
        font-weight: 500;
        text-decoration: none;
        font-size: 1rem;
        text-transform:uppercase;
        padding: 0.5rem;
      }
      ul {
        display: flex;
      }
      nav > ul {
        padding: 4px 16px;
      }

      li {
        display: flex;
        padding: 6px 8px;
      }
    `}</style>
  </nav>
);

export default Nav;
