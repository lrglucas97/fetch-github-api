import { baseUrl, repositoriesQuantity } from "../variables.js";

async function getReporitories(userName) {
  const response = await fetch(
    `${baseUrl}/${userName}/repos?per_page=${repositoriesQuantity}`
  );
  return await response.json();
}

export { getReporitories };
