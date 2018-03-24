# cider
a tools to inherit from parent package.json

#### Objective

To be able to inherit from another package.json. For example I don't want to set the same package.json all over again when I am starting a nodeJs project in Typescript.


#### How to use it ?
1. Create a project as you would always do with ```npm```or ```yarn```. Cider is compatible with any of your project, new or older.
2. Create a package-cider.json.
3. Copy-Paste your package.json.
4/ Add property 'parents'. Add your dependencies.

#### parents
1. It can be from a node_modules you install =>
`
parents:{
node_modules:['my_parent']
}
`
2. in future it could be from githb repo or any repo.


