import {PackageJson} from "./pacakge-json";

export class Inherit {

    private parentPackages: PackageJson[];

    private ciderPackage: PackageJson;

    public setCiderPackage(ciderPackage) {
        this.ciderPackage = ciderPackage;
        return this;
    }

    public setParentPackages(parentPackage: PackageJson[]) {
        this.parentPackages = parentPackage;
        return this;
    }

    get properties() {
        return ['dependencies', "scripts", "devDependencies"]
    }

    public Inherit() {
        const outputPackage = Object.assign({}, this.ciderPackage);
        this.parentPackages.forEach(deps => {
            this.properties.forEach(prop => {
                console.log(deps[prop])
                Object.assign(outputPackage[prop], deps[prop]);
            })
        })
        return outputPackage;
    }
}