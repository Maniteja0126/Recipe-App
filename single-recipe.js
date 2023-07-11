import { getRecipeCard } from "./getRecipeCard.js";


const cardId = localStorage.getItem("id");
const cardParentElement = document.querySelector(".main");
const SINGLERECIPEURL = `https://recipeapi.prakashsakari.repl.co/api/recipes/${cardId}`;
const createElement=(element)=>document.createElement(element);

    const getData = async (URL) => {
    try {
        const { data } = await axios.get(URL);
        return data;
    } catch (err) {
        console.log(err);
    }
    };

const singleRecipe = await getData(SINGLERECIPEURL);




getRecipeCard(singleRecipe,cardParentElement,createElement);


const recipeIngredients =(singleRecipe,cardParentElement,createElement)=>{
    for(let item of singleRecipe){
        // console.log(item);

        const container = createElement("div");
        container.classList.add("ingredients");
        const heading=createElement("h2");
        heading.classList.add("heading");
        heading.innerText="🥣 Ingredients";

        container.appendChild(heading);

        const items=item.TranslatedIngredients;
        const listItems=items.split(",");
        const ul=createElement("ul");
        ul.classList.add("listItems");
            listItems.forEach(element => {
                const li=createElement("li");
                li.innerText=element;
                ul.appendChild(li);
                container.append(ul);
                cardParentElement.appendChild(container);
        });

        const process = createElement("div");
        process.classList.add("process");

        const header=createElement("h2");
        header.classList.add("heading");
        header.innerText="🫕 Cooking Process";

        process.appendChild(header);

        const processList=item.TranslatedInstructions;
        const itemList=processList.split(".\n");
        const list =createElement("div");
        list.classList.add("steps-container");
        const ulList=createElement("ul");
        itemList.forEach(element => {
                const li=createElement("li");
                li.innerText=element;
                ulList.appendChild(li);
                list.append(ulList);
                process.appendChild(list)
                cardParentElement.appendChild(process);
        });
                
        // list.innerText=processList;
        // // container.appendChild(list)
    }
}

recipeIngredients(singleRecipe,cardParentElement,createElement);


console.log(singleRecipe);

