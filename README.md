# Bakery4You
*Bakery4You* is a web app that born out of the desire for customers to stay informed about all the available products within a store. The store, in this case, is a bakery.

Typically bakeries are manufacturing stores, where bakers handcraft a variety of delicious items such as bread, cakes, cookies, and more. Since much of the work is done by hand, customers would often need to visit the store physically to see what products are available. However, Bakery4You changes this by allowing people to view all products in real-time, make reservations for desired items, and await confirmation from the seller.

By definition, Bakery4You resembles an e-commerce platform, yet its primary function diverges from direct product purchases. Rather than completing transactions online, customers can place orders for desired products through the app. Once the seller approves the order, customers can then proceed to the bakery to physically purchase the items. This unique approach combines the convenience of online ordering with the traditional in-store purchasing experience, offering customers greater flexibility and convenience in acquiring their desired bakery items.\\
At the heart of Bakery4You lies the concept of seller recognition through an authentication page. The web application securely stores seller credentials, allowing bakers to log in and seamlessly update the daily availability of all products.

Parallel to the seller authentication feature, customers can also log in to Bakery4You to browse all available products showcased in a scrolling display. The primary objective of the application is to provide a real-time platform accessible to anyone. Customers can explore the array of products at their leisure, and if they find something of interest, they have the option to reserve it for purchase at their convenience. This real-time functionality empowers customers with flexibility and ensures a seamless experience, whether they're browsing or making reservations.

## Getting started

### Common usage
[Bakery4You](https://bakery4u.onrender.com)

#### Video tutorial
[Tutorial](https://youtu.be/0HA1sfo7hKU)

### Developing purpose
* install Node.js
* clone this repo:
```
git clone git@github.com:NicoNRG2/sw-eng-project.git
```

* navigate through `backend` directory and run `npm install` and then run the server with
```
node server.js
```

* from another command line, navigate into the `frontend` directory and run `npm install` and then run the frontend interface:
```
npm run dev
```


## Git strategy
The repository stands on 2 chief branches: `main` and `dev`:
* the `main` branch is used to maintain all the well-functioning features and working code. In this branch there are not any functionalities on testing as they are tested before merging in this branch;
* the `dev` branch is used in order to converge and test all the functionalities before merging into `main` branch;
* all the functionalities are developed in secondary branches:
  - `database: definition`: this branch contains the definition of the database;
  - `frontend: definition`: this branch contains the full code of the frontend;
  - `backend: definition`: this branch contains the full code of the backend

From these secondary branches, many other branches are created in order to develope a single functionality. After developing one, the branch is merged into the corrispondent secondary one.

### Branch nomenclature
All branches have conformed names: the prefix stands for the main component on which testing takes place. 
The `definition` suffix stands for the component's main branch on which the other branches are merged.

For example, the `frontend: definition` branch is the main one and the branch `frontend: feature X` is merged on it.

### Commits nomenclature
Similar to branches, prefixes and suffixes are also provided for commits. Prefixes indicate the general action of the commited work:
* `fix: ` - the commit fixes the feature;
* `feature: ` - the commit adds new feature;
* `chore: ` - general actions, such as renaming files or changing folders or adding documentation.

Suffixes describe the specific commited work depending on the prefix.

For example:
* `fix: changed algorithm X to Y`
* `feature: add graphics effects on buttons`
