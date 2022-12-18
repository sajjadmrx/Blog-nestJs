import { promises } from 'fs'

export async function fileHasExist(name: string, path: string) {

    try {
        path = path.replace(/\\/g, '/');
        let fullPath = path + '/' + name;
        let extension = await promises.stat(fullPath)

        return extension.isFile()

    } catch (error) {
        return false
    }

}