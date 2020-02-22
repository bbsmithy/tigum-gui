import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  baseUrl: "https://api.github.com"
});

octokit.auth({});

export const getRepos = () => {
  console.log("GET REPOS");
  octokit.repos
    .list({
      owner: "bbsmithy"
    })
    .then(res => {
      console.log("Repo response", res);
    })
    .catch(err => {
      console.log("Error", err);
    });
};
