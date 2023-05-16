export interface IEstate {
    id: string;
    name: string;
    type: string;
    price: number;
    imgUrls: { imgUrl: string }[];
    constructionYear: string;
    rooms: number;
    area: number;
    location: string;
    description: string;
    ownerId: string;
}
