import { fetchContent } from '@utils/contentful'

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
        <div className="recipes">
            {recipeCollection.map((recipe, index) => (
                <div key={"recipe" + index} className="recipe">
                    <h2>{recipe.title}</h2>
                    <p>{recipe.shortDescription}</p>
                    <img width="300px" src={recipe.image.url}/>
                    <p>{recipe.difficulty}</p>
                    <p>{recipe.price}</p>
                    <p>{recipe.preparationtime}</p>
                    <p>{recipe.servings}</p>
                    <h3>{recipe.author.firstName + " " + recipe.author.lastName }</h3>
                </div>
            ))}
        </div>
    )
}
  
export default RecipesPage;