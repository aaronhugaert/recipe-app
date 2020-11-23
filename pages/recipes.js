import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchContent } from '../utils/contentful';
import Nav from '../components/nav';
import Footer from '../components/footer';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faClock, faUsers} from '@fortawesome/free-solid-svg-icons'

import { Card, Badge, ListGroup } from 'react-bootstrap'

export async function getStaticProps() {
    const response = await fetchContent(`
    {
        recipeCollection {
          items {
            sys {
              id
            },
            title,
            shortDescription,
            image {
              url
            },
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
        recipeCollection: response.recipeCollection.items,
      }
    }
  }

function RecipesPage({ recipeCollection }) {
return (
      <div className="container">
        <Nav />
        <div className="recipes content">
            {recipeCollection.map((recipe, index) => (
                <div key={index} className="recipe">
                    <Card>
                        <Card.Img variant="top" src={recipe.image.url}/>
                        <div className="card-body"> 
                            <Card.Title>{recipe.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{recipe.shortDescription}
                            <div className="tags">
                                {recipe.recipeTagCollection.items.map((tag, index) => (
                                    <span className="badge badge-primary" key={index} style={{ backgroundColor: tag.color }}>{tag.title}</span>
                                ))}
                            </div>
                            </Card.Subtitle>
                        </div> 
                          <ul className="list-group list-group-flush">
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
                                <p>{recipe.servings} <FontAwesomeIcon icon={faUsers} style={{color: "#adadad", marginLeft: "0.2rem"}}/></p>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <Link href={"/recipe/" + recipe.slug}>
                                <button className="btn btn-primary">Take a look</button>
                              </Link>
                            </li>
                            <li className="list-group-item author">
                              <div>
                                <img src={recipe.author.profilePicture.url}/>
                                <p>{recipe.author.firstName + " " + recipe.author.lastName }</p>
                              </div>
                            </li>
                          </ul>
                    </Card>
                </div>
            ))}
        </div>
        <Footer />
        <style jsx>{`
            .card-body {
              padding-bottom: 0rem;
            }

            .recipe-info {
              flex-wrap: wrap;
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
            }

            .recipe .list-group-item {
              margin: 0rem;
              padding-top: 0.4rem;
              padding-bottom: 0.4rem;
            }

            .recipe-info p, .recipe-info * {
              color: #6c757d;
              font-size: 0.9rem;
              font-weight: 700;
              margin-bottom: 0rem;
              margin: auto;
            }

            .price-icons * {
              margin-right: 0.1rem;
            }

            .btn-primary, .btn-primary.active, .btn-primary:focus  {
              display: block;
              background-color: #f7c307;
              color: #000000;
              font-weight: 700;
              border: none;
              box-shadow: none;
              border-radius: 0px;
              margin: auto;
              margin-top: 1rem;
              margin-bottom: 1rem;
            }

            .btn-primary:hover{
              transform: scale(1.1);
            }

            .btn-primary:active, btn-primary:hover, .btn-primary:active:focus {
              background-color: #000000;
              color: #FFFFFF;
              border: none;
              box-shadow: none;
            }
            
            .recipes {
              display: grid;
              grid-gap: 1rem 1rem;
              grid-template-columns: repeat(1, 1fr);
            }
           
            @media (min-width: 768px) {
              .recipes {
                grid-template-columns: repeat(2, 1fr);
              }
            }
            
            @media (min-width: 992px) {
              .recipes {
                grid-template-columns: repeat(3, 1fr);
              }
            }
 
          `}</style>
      </div>
        
    )
}
  
export default RecipesPage;