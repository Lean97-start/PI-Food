import axios from 'axios'
// const local = 'http://localhost:3001/';
export const GET_RECIPES = 'GET_RECIPES',
 GET_TYPES_DIETS = 'GET_TYPES_DIETS',
 FILTER_TYPES_DIETS = "FILTER_TYPES_DIETS",
 FILTER_SCORE = "FILTER_SCORE",
 ORDER_RECIPES = "ORDER_RECIPES",
 CREATE_RECIPE = "CREATE_RECIPE",
 FILTER_CREATED = "FILTER_CREATED",
 ORDER_SCORE = "ORDER_SCORE",
 ORDER_ALPHABETICAL = "ORDER_ALPHABETICAL",
 REMOVEDETAIL = 'REMOVEDETAIL';

export function getTypesRecipes(){
    return function(dispatch){ //Con esta function creator, me traigo todos los tipos de recetas.
        return axios.get(`/types`)
        .then(response => dispatch({type: GET_TYPES_DIETS, payload: response}))
        .catch(e => console.log(e))
    }
}

export function getRecipe(payload){
    //Por payload me voy a traer, si no se le pasa ningun query, ni id, todas las recetas
    //Si me trae una query, se lo paso a la url y me trae todas las coincidencias con el nombre
    //Si solo le paso el id, me va a traer la receta indicada.
    return function(dispatch){
        if(!payload){
            return axios.get(`/recipes/`)
            .then(recipes => dispatch({type: GET_RECIPES, payload: {recipes: recipes, type_passed: null}}))
            .catch(e => console.log(e))
        }
        else{    
            //payload.data me da el valor del query o el id. Y en type_passed le digo explicitamente que es. 
            return axios.get(`/recipes${payload.data}`)
            .then(recipes => dispatch({type: GET_RECIPES, payload: {recipes: recipes, type_passed: payload.type_passed}}))
            .catch(e => alert("No se ha encontrado ninguna receta con ese nombre."))}
    }
}

export function filterTypesDiets(payload){
    return {type: FILTER_TYPES_DIETS, payload: payload}
}
export function filterScore(payload){
    return {type: FILTER_SCORE, payload}
}
export function filterCreated(payload){
    return {type: FILTER_CREATED, payload}
}

export function changeOrder(payload){
    return {type: ORDER_SCORE, payload}
}
export function changeAlphabetical(payload){
    return {type: ORDER_ALPHABETICAL, payload}
}

export function postRecipe(payload){
    //Recibe los datos que vienen del formulario y lo paso por medio del payload al backend.
    return (dispatch) => {
        return axios.post(`/recipe`, payload)
        // .then(() => console.log("Receta creada con éxito"), () => console.log("Ocurrío un error en la creación de la receta, intente de nuevo"))
        .then((response) => dispatch({type: CREATE_RECIPE, payload: response.data}), (response) => dispatch({type: CREATE_RECIPE, payload: response.data}))       
    }
}

export function removeDetail(){
    return {type: REMOVEDETAIL}
}