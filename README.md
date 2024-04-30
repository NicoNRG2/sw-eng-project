# Bakery4You

TODO

## Git strategy
The repository stands on 2 chief branches: `main` and `dev`:
* the `main` branch is used to maintain all the well-functioning features and working code. In this branch there are not any functionalities on testing as they are tested before merging in this branch;
* the `dev` branch is used in order to converge and test all the functionalities before merging into `main` branch;
* all the functionalities are developed in secondary branches:
  - `database: definition`: this branch contains the definition of the database;
  - `frontend: definition`: TBD
  - `backend: definition`: TBD
  - TBD

From these secondary branches, many other branches are created in order to develope a single functionality. After developing one, the branch is merged into the corrispondent secondary one.

### Branch nomenclature
All branches have conformed names: the prefix stands for the main component on which testing takes place. 
The `definition` suffix stands for the component's main branch on which the other branches are merged.

For example, the `frontend: definition` branch is the main one and the branch `frontend: feature X` is merged on it.

TODO: add git graph link

### Commits nomenclature
Similar to branches, prefixes and suffixes are also provided for commits. Prefixes indicate the general action of the commited work:
* `fix: ` - the commit fixes the feature;
* `feature: ` - the commit adds new feature;
* `chore: ` - general actions, such as renaming files or changing folders or adding documentation.

Suffixes describe the specific commited work depending on the prefix.

For example:
* `fix: changed algorithm X to Y`
* `feature: add graphics effects on buttons`
