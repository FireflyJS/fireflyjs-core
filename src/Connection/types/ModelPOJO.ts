import Model from "../../Model/class";

/**
 * [POJO](https://masteringjs.io/tutorials/fundamentals/pojo#:~:text=The%20intuition%20behind%20POJOs%20is,create%20POJOs%20by%20calling%20Object.) containing model name as keys and Model instance as values
 */
type ModelPOJO = { [k: string]: Model };

export { ModelPOJO };
