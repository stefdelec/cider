export interface SimpleObject {
    [key: string]: string
}

export interface PackageJson {
    devDependencies: SimpleObject,
    dependencies: SimpleObject,
    scripts: SimpleObject
}