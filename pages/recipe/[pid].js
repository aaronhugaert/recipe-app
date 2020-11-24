import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchContent } from '../../utils/contentful';

import Nav from '../../components/nav';
import Head from '../../components/head';
import ReactMarkdown from 'react-markdown'
import Footer from '../../components/footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faClock, faUsers} from '@fortawesome/free-solid-svg-icons'

export async function getStaticPaths() {
  const response = await fetchContent(`
  {
      recipeCollection {
        items {
          slug
        }
      }
    }
  `);

  const paths = response.recipeCollection.items.map((slug) => ({
    params: { pid: slug.slug },
  }))
  
  return { paths, fallback: false }
}

export async function getStaticProps(context) {
  const response = await fetchContent(`
  {
      recipeCollection(where: {slug: "` +  context.params.pid + `"}) {
        items {
          sys {
            id
          },
          title,
          shortDescription,
          image {
            url
          },
          ingredients,
          preparation,
          difficulty,
          price,
          preparationTime,
          servings,
          slug,
          author {
            ... on Author{
              firstName,
              lastName,
              profilePicture {
                url
              }
            }
          },
          recipeTagCollection{
              items {
              ... on RecipeTag{
                title,
                color
              }
            }
          }
        }
      }
    }
  `);

  return {
    props: {
      recipe: response.recipeCollection.items[0],
    }
  }
}

function RecipePage({ recipe }) {
    return (
      <div className="container">
          <Head />
          <Nav />
          <article className="recipe-container content">
            <h1>{recipe.title}</h1>
            <h6 className="text-muted">{recipe.shortDescription}</h6>
            <div className="recipe-info-header">

              <img src={recipe.image.url}/>

              <ul className="list-group list-group-flush">

                <li className="list-group-item">
                  <div className="tags">
                      {recipe.recipeTagCollection.items.map((tag, index) => (
                          <span className="badge badge-primary" key={index} style={{ backgroundColor: tag.color }}>{tag.title}</span>
                      ))}
                  </div>
                </li>

                <li className="list-group-item recipe-info">
                  <p>{recipe.preparationTime} <FontAwesomeIcon icon={faClock} style={{color: "#adadad", marginLeft: "0.2rem"}}/></p>
                </li>

                <li className="list-group-item">
                  <div className="recipe-info">
                    <p>{recipe.difficulty}</p>
                    <div className="price-icons">
                      {[...Array(5),].map((value, index) => (
                        <FontAwesomeIcon key={index} icon={faDollarSign} style={{color: index < recipe.price ? "#f7c307" : "#adadad", marginRight: "0.2rem"}}/>
                      ))}
                    </div>
                    <p>{recipe.servings + ((recipe.serving == 1) ? " serving" : " servings")} <FontAwesomeIcon icon={faUsers} style={{color: "#adadad", marginLeft: "0.2rem"}}/></p>
                  </div>
                </li>

                <li className="list-group-item author">
                  <div>
                    <img src={recipe.author.profilePicture.url}/>
                    <p>{recipe.author.firstName + " " + recipe.author.lastName }</p>
                  </div>
                </li>

              </ul>
            
            </div>
            <h2>Ingredients</h2>
            <ReactMarkdown source={recipe.ingredients} className="ingredients"/>
            <h2>Preparation</h2>
            <ReactMarkdown source={recipe.preparation} className="preparation"/>
          </article>
          <Footer />
          <style jsx>{`

            .recipe-container h1 {
              margin: 0;
            }

            .recipe-container h6, .recipe-container h2 {
              margin-bottom: 1rem;
            }

            .recipe-info {
              display: flex;
              flex-direction: column;
            }

            .recipe-info > * {
              margin: 0;
              margin-bottom: 0.5rem;
            }

            .recipe-info > *:last-child {
              margin: 0;
              margin-bottom: 0rem;
            }

            .recipe-info-header {
              display: flex;
              flex-direction: column;
              border-style: inset;
              border: 1px solid #adadad;
              margin-bottom: 1rem;
            }

            .recipe-info-header > * {
              flex-basis: 0;
              flex-grow: 1;
            }

            .recipe-info-header > img {
              display: block;
              object-fit: cover;
              width: 100%;
              height: auto;
            }

            .recipe-container {
              margin-left: 1rem;
              margin-right: 1rem;
            }

            @media (min-width: 768px) {
              
              .recipe-info-header > img {
                display: block;
                object-fit: cover;
                width: 60%;
              }

              .recipe-info-header {
                flex-direction: row;
              }

              .recipe-container {
                margin-left: 6rem;
                margin-right: 6rem;
              }
            }

            @media (min-width: 992px) {
              .recipe-container {
                margin-left: 10rem;
                margin-right: 10rem;
              }
            }
          `}</style>
      </div>
      
    )
}
  
export default RecipePage;
