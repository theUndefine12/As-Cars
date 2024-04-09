import { Injectable } from '@nestjs/common';
import * as fs from 'fs'
import * as path from 'path'
import {v4} from 'uuid'

@Injectable()
export class FileService {

    createFile(file: any) {
        const fileType = file.originalname.split('.').pop()
        const fileName = v4() + '.' + fileType
        const filePath = path.resolve(__dirname, '..', 'static')

        if(!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath)
        }

        fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)
        return fileName
    }

    async removeFile(file: string) {
        const filePath = path.resolve(__dirname, '..', 'static', file)
        await fs.promises.unlink(filePath)

        return 'File is deleted'
    }
}
