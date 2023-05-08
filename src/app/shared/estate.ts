export interface IEstate {
    id: string;
    name: string;
    type: string;
    price: Number;
    imgUrls: { imgUrl: string }[];
    constructionYear: string;
    location: string;
    description: string;
    ownerId: string;
}
