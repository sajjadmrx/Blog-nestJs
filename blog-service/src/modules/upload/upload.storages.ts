import { diskStorage } from "multer";
import { promises } from "fs";
import BestString from "best-string";
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
      } finally {
        cb(null, path_);
      }
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const filename: string = new BestString(file.originalname)
        .noRtlCharacters()
        .replaceGlobal(" ", "-")
        .build();
      cb(null, uniqueSuffix + "-" + filename);
    },
  });
}
