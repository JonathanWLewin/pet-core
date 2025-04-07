import { getUrl } from 'aws-amplify/storage';
import { ExtendedPet } from '../constants/types';


export const fetchImage = async (uri: string) => {
    const url = await getUrl({
        path: `profile-pictures/${uri}`,
    });
    return url.url.toString();
}

export const fetchProfilePictures = async (pets: ExtendedPet[]) => {
    const downloads = [];

    for (const pet of pets) {
        if (pet.uri) {
            downloads.push(fetchImage(pet.uri).then((url) => {
                pet.downloadUrl = url;
            }));
        }
    }

    await Promise.all(downloads);
};
