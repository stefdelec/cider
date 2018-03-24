import * as fs from "fs";
import * as process from "process";
import * as path from "path";
import {Inherit} from "./inherit";

enum parentsSource {
    node_modules = "node_modules"
}

export class PackageJson {
    private inheritance: Inherit = new Inherit();

    constructor() {

    }

    private depKey = "parents";
    private cwd = process.cwd();

    private ciderPackagePath = path.join(process.cwd(), 'package-cider.json')

    private openPackage(path): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.readFile(path, "utf8", ((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(data))
                }
            }))
        })
    }

    public getParentDependencies(): Promise<string[]> {
        return this.openPackage(this.ciderPackagePath)
            .then(i => i.parents)
            .then(i => i.node_modules)
    }

    private writePackageJson(data): boolean {
        const packageJsonPath = path.join(this.cwd, 'package-test.json');
        fs.writeFileSync(packageJsonPath, JSON.stringify(data));
        return true;
    }

    public async makeCiderPackage(): Promise<any> {
        const deps = await this.getParentDependencies();
        const listOfDep = await Promise.all(deps.map(async dep => {
            const packageJsonPath = path.join(this.cwd, './node_modules', dep, 'package.json');
            return await this.openPackage(packageJsonPath);
        }))
        const ciderPackage = await this.openPackage(this.ciderPackagePath);
        const newPackage = this.inheritance
            .setParentPackages(listOfDep)
            .setCiderPackage(ciderPackage)
            .Inherit();

        this.writePackageJson(newPackage)
        return newPackage;
    }
}


const p = new PackageJson();
p.makeCiderPackage().then(i => console.log(i));