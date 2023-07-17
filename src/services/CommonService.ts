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
            {
                id: 3, name: 'menu.other_information', childs: [
                    {id: 31, name: 'menu.air_quality', path: '/air-quality'},
                    {id: 32, name: 'menu.bike_point', path: '/bike-point'},
                    {id: 33, name: 'menu.journey_planner', path: '/journey/planner'},
                ]
            },
            {id: 4, name: 'menu.about', path: '/about'},
            {id: 5, name: 'menu.contact', path: '/contact'},
        ]
    }
}
