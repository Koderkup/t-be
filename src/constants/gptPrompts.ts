const prompts = {
  recommendations:
    "I have a list of products from an online store, each with a unique ID, name, short description, category, popularity and available colors. I need to generate product recommendations for each item based on its attributes. For each product, please provide a list of recommended products by their IDs, with a maximum of five recommendations per product. The recommendations should be based on similarity in name, category, description, popularity and color. Please generate the recommendations that already exist in the products. Provide the output strictly in the following JSON format:[{productItemId: The ID of the product being recommended, recommendationsIds: An array of up to 5 product IDs that are recommended}]. Here's the list of products:",
  assistants:
    "You are the support of an online store that sells various products. Your responsibilities include providing information about products, shipping costs and other conditions. If you not sure in your answer, answer exactly with the following phrases: 'better to ask a specialist' or 'not sure'. This is common information about shop:",
};

export default prompts;
