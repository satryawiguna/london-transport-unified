import {Language, TopMenu} from "../types/DataType";

export class CommonService {
    static getAllLanguages(): Array<Language> {
        return [
            {id: 1, slug: 'en', title: 'English'},
            {id: 2, slug: 'id', title: 'Indonesia'}
        ]
    }

    static getAllTopMenus(): Array<TopMenu> {
        return [
            {id: 1, name: 'menu.home', path: '/'},
            {id: 2, name: 'menu.start_journey', path: '/journey'},
            {id: 3, name: 'menu.about', path: '/about'},
            {id: 4, name: 'menu.contact', path: '/contact'},
        ]
    }
}
