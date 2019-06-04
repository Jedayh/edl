export class Edl {

}

// export class Locataire {
//     nom: string;
//     prenom: string;
//     adresse: string;
//     ville: string;
//     departement: string;
//     portable: string;
//     telephoneFixe: string;
//     email: string;
//     ty: string
// }
// export class Location {
//     adresse:string;
//     residence: string;
//     type: string;
//     escalier: string;
//     batiment: string;
//     cave: string;
//     complement: string;
//     ville: string;
//     etage: string;
//     parking: string;
//     box: string;
//     garage: string
// }
export class Compteur {
    eauEtChauffage: {
        enService: boolean,
        eauFroide: {
            photo: string,
            compteur: string,
            type: string,
            releve: string,
            localisation: string
        },
        chauffage: {
            photo: string,
            type: string,
            chauffage: string
        }
    };
    electricite: {
        enService: boolean,
        photo: string,
        heuresPleines: string,
        numero: Int32Array,
        heuresCreuses: string,
        localisation: string
    };
    gaz: {
        enService: boolean,
        photo: string,
        compteur: string,
        numero: Int32Array,
        localisation: string
    }
}
