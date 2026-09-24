<?php

use App\Http\Controllers\Admin\UserCemeteryController;
use App\Http\Controllers\CemeterySelectionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DeceasedController;
use App\Http\Controllers\GraveController;
use App\Http\Controllers\ParcelController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    // Aktív temető kiválasztása (session-be írja) — a React switcher ide postol
    Route::post('/active-cemetery', [CemeterySelectionController::class, 'store'])
        ->name('cemetery.select');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Temetőhöz kötött erőforrások (parcellák, sírok, elhunytak), jogosultság-
    // ellenőrzéssel. scopeBindings(): a {parcel}-nek az adott {cemetery}-hez,
    // a {grave}-nek az adott {parcel}-hez, a {deceased}-nek az adott {grave}-hez
    // kell tartoznia, különben 404-et ad.
    Route::middleware('cemetery.access')
        ->prefix('cemeteries/{cemetery}')
        ->name('cemeteries.')
        ->scopeBindings()
        ->group(function () {
            // Temető-szintű térkép: parcellák (poligonok)
            Route::get('/map', [ParcelController::class, 'index'])->name('map');
            Route::post('/parcels', [ParcelController::class, 'store'])->name('parcels.store');
            Route::get('/parcels/{parcel}', [ParcelController::class, 'show'])->name('parcels.show');
            Route::put('/parcels/{parcel}', [ParcelController::class, 'update'])->name('parcels.update');
            Route::delete('/parcels/{parcel}', [ParcelController::class, 'destroy'])->name('parcels.destroy');

            // Parcella-szintű térkép: sírok (téglalapok)
            Route::post('/parcels/{parcel}/graves', [GraveController::class, 'store'])->name('parcels.graves.store');
            Route::put('/parcels/{parcel}/graves/{grave}', [GraveController::class, 'update'])->name('parcels.graves.update');
            Route::delete('/parcels/{parcel}/graves/{grave}', [GraveController::class, 'destroy'])->name('parcels.graves.destroy');

            // Egy síron belüli elhunytak
            Route::post('/parcels/{parcel}/graves/{grave}/deceased', [DeceasedController::class, 'store'])
                ->name('parcels.graves.deceased.store');
            Route::put('/parcels/{parcel}/graves/{grave}/deceased/{deceased}', [DeceasedController::class, 'update'])
                ->name('parcels.graves.deceased.update');
            Route::delete('/parcels/{parcel}/graves/{grave}/deceased/{deceased}', [DeceasedController::class, 'destroy'])
                ->name('parcels.graves.deceased.destroy');
        });

    // Csak super admin: felhasználó–temető hozzárendelések kezelése (checkbox-mátrix).
    Route::middleware('super_admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/user-cemeteries', [UserCemeteryController::class, 'index'])
            ->name('user-cemeteries.index');

        Route::patch('/user-cemeteries/{user}/{cemetery}', [UserCemeteryController::class, 'update'])
            ->name('user-cemeteries.update');
    });
});

require __DIR__.'/auth.php';
