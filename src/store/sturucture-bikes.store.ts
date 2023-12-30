import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { firstValueFrom, tap } from "rxjs";
import { Page, EMPTY_BIKE } from "src/shared/constants";
import { Bike } from "src/shared/models/bike";
import { Weather, WeatherResponse } from "src/shared/models/weather";
import { BikeService } from "src/shared/services/bike.service";
import { ImageService } from "src/shared/services/image.service";
import { WeatherService } from "src/shared/services/weather.service";

export interface StructureBikesStoreState {
    currentPage: Page;
    bikes: Bike[];
    selectedBike: Bike;
    weather: Weather;
    error: any;
}

export const initialState: StructureBikesStoreState = {
    currentPage: Page.NONE,
    bikes: [],
    selectedBike: EMPTY_BIKE,
    weather: undefined,
    error: undefined
};

export const StructureBikesStore = signalStore(
    { providedIn: 'root' },
    withState({ ...initialState }),
    withMethods((state) => {
        const { selectedBike, bikes } = state;
        const bikeService = inject(BikeService);
        const imageService = inject(ImageService);
        const weatherService = inject(WeatherService);
        const router: Router = inject(Router);

        return {
            setCurrentPage(currentPage: Page) {
                patchState(state, { currentPage });
            },
            async incrementBikes() {
                const bikes: Bike[] = await firstValueFrom(bikeService.getBikes());
                patchState(state, { bikes });
            },
            async updateSelectedBike(selectedBikeId: number) {
                if (!selectedBike() || selectedBike().id !== selectedBikeId) {
                    const selectedBike: Bike = await firstValueFrom(bikeService.getBike(selectedBikeId));
                    patchState(state, { selectedBike });
                }
            },
            setSelectedBike(selectedBike: Bike) {
                patchState(state, { selectedBike });
            },
            async addBike(bike: Bike) {
                const bikeId: number = await firstValueFrom(bikeService.createBike(bike));
                router.navigate(['/view-bike', { id: bikeId }]);
            },
            async editBike(bike: Bike) {
                await firstValueFrom(bikeService.updateBike(bike));
                patchState(state, { selectedBike: EMPTY_BIKE })
                router.navigate(['/view-bike', { id: bike.id }]);
            },
            async deleteBike(bikeId: number) {
                await firstValueFrom(bikeService.deleteBike(bikeId));
                patchState(state, { bikes: bikes().filter(bike => bike.id !== bikeId )});
            },
            async viewWeather() {
                const weatherResponse: WeatherResponse = await firstValueFrom(weatherService.getWeather());
                const weather: Weather = weatherService.generateWeather(weatherResponse);
                patchState(state, { weather });
            },
            async addImage(bikeId: string, image: File) {
                const selectedBike: Bike = await firstValueFrom(imageService.addImage(bikeId, image));
                patchState(state, { selectedBike });
            },
            async deleteImage(bikeId: string, imageName: string) {
                const selectedBike: Bike = await firstValueFrom(imageService.deleteImage(bikeId, imageName));
                patchState(state, { selectedBike });
            }
        };
    })
);