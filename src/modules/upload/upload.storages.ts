import { diskStorage } from "multer";
import { promises } from "fs";
import path from "path";
export function postStorage() {
    return diskStorage({
        destination: async function (req, file, cb) {
            const path_ = `./uploads/posts`;

            try {
                const state = await promises.stat(path_);
                if (!state.isDirectory()) {
                    await promises.mkdir(path_);
                }

            } catch (error) {
                await promises.mkdir(path_);
            }
            finally {
                cb(null, path_);
            }
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix + '-' + file.originalname)
        }
    });
}