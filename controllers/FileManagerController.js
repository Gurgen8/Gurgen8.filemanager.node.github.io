import fs from 'fs';
import path from 'path'
import _ from 'lodash'

class FileManagerController {
  static index(req, res, next) {
    try {
      const { dir = '/' } = req.query;
      const data = fs.readdirSync(dir);
      let files = [];
      data.forEach(file => {
        try {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);
          files.push({
            name: file,
            lName: file.toLowerCase(),
            isDirectory: stat.isDirectory(),
            path: filePath,
          })
        } catch (e) {
          //
        }
      })
      files = _.orderBy(files, ['isDirectory', 'lName'], ['desc', 'asc'])

      res.render('file-manager/index', {
        files,
        dir,
        backFolder: path.join(dir, '..'),
      })
    } catch (e) {
      next(e);
    }
  }

  static edit(req, res, next) {
    try {
      const { file } = req.query;
      let content
      try {
        content = fs.readFileSync(file);
      } catch (e) {
        content = '';
      }

      res.render('file-manager/edit', {
        content,
        file,
      })

    } catch (e) {
      next(e);
    }
  }

  static editSave(req, res, next) {
    try {
      const { content, file } = req.body;
      fs.writeFileSync(file, content)
      const dir = path.dirname(file);
      res.redirect('/file?dir=' + dir)
    } catch (e) {
      next(e);
    }
  }
}

export default FileManagerController;

