import {Language} from "../types/DataType";

export class CommonService {
    static getAllLanguages(): Array<Language> {
        return [
            {id: 1, slug: 'en', title: 'English'},
            {id: 2, slug: 'id', title: 'Indonesia'}
        ]
    }
}
