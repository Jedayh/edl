
/**
 * Représente les données dans Pano.ts
 *
 * @export
 * @class PanoData
 */
export class PanoData {
  idSalle: number;
  idDefaut: number;
  pitch: number;
  yaw: number;
  observation: string; // description ambany
  description: string[]; // description ambony
  displayedDescription: string; // description ambony
  image1: string;
  image2: string;
}
