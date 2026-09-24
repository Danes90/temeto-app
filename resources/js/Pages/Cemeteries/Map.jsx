import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CemeteryMapCanvas from '@/Components/Konva/CemeteryMapCanvas';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Map({ cemetery, parcels }) {
    const [drawMode, setDrawMode] = useState(false);
    const [pendingPoints, setPendingPoints] = useState(null);
    const [form, setForm] = useState({ name: '', color: '#4caf50' });

    const goToParcel = (parcel) => {
        router.visit(route('cemeteries.parcels.show', { cemetery: cemetery.id, parcel: parcel.id }));
    };

    const handleFinishDrawing = (flatPoints) => {
        const points = [];
        for (let i = 0; i < flatPoints.length; i += 2) {
            points.push({ x: flatPoints[i], y: flatPoints[i + 1] });
        }
        setPendingPoints(points);
        setDrawMode(false);
    };

    const handleSave = (e) => {
        e.preventDefault();

        router.post(
            route('cemeteries.parcels.store', { cemetery: cemetery.id }),
            { name: form.name, color: form.color, points: pendingPoints },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setPendingPoints(null);
                    setForm({ name: '', color: '#4caf50' });
                },
            }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">{cemetery.name} – parcella térkép</h2>
                    <button
                        onClick={() => setDrawMode((v) => !v)}
                        className={`rounded-md px-4 py-2 text-sm font-medium text-white ${
                            drawMode ? 'bg-red-600' : 'bg-indigo-600'
                        }`}
                    >
                        {drawMode ? 'Rajzolás megszakítása (Esc)' : '+ Új parcella rajzolása'}
                    </button>
                </div>
            }
        >
            <Head title={`${cemetery.name} – térkép`} />

            <div className="flex h-[calc(100vh-140px)] gap-4 px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex-1 overflow-hidden rounded-lg border bg-[#d7d1bd]">
                    <CemeteryMapCanvas
                        parcels={parcels}
                        drawMode={drawMode}
                        onFinishDrawing={handleFinishDrawing}
                        onSelectParcel={goToParcel}
                    />
                </div>

                {drawMode && (
                    <p className="w-64 shrink-0 text-sm text-gray-500">
                        Kattints a parcella sarokpontjaira a térképen, majd dupla kattintással zárd le (legalább 3
                        pont). Esc = megszakítás.
                    </p>
                )}

                {pendingPoints && (
                    <form
                        onSubmit={handleSave}
                        className="w-72 shrink-0 space-y-3 rounded-lg border bg-white p-4 shadow-sm"
                    >
                        <h3 className="font-semibold text-gray-800">Új parcella mentése</h3>

                        <div>
                            <label className="block text-sm text-gray-600">Neve / jele</label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                                autoFocus
                                className="mt-1 w-full rounded-md border-gray-300 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600">Szín</label>
                            <input
                                type="color"
                                value={form.color}
                                onChange={(e) => setForm({ ...form, color: e.target.value })}
                                className="mt-1 h-8 w-16"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white"
                            >
                                Mentés
                            </button>
                            <button
                                type="button"
                                onClick={() => setPendingPoints(null)}
                                className="rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700"
                            >
                                Mégse
                            </button>
                        </div>
                    </form>
                )}

                {!drawMode && !pendingPoints && (
                    <div className="w-64 shrink-0 space-y-2 overflow-y-auto">
                        <h3 className="text-sm font-semibold text-gray-600">Parcellák</h3>

                        {parcels.length === 0 && (
                            <p className="text-sm text-gray-400">
                                Még nincs parcella. Kattints a "+ Új parcella rajzolása" gombra.
                            </p>
                        )}

                        {parcels.map((parcel) => (
                            <button
                                key={parcel.id}
                                onClick={() => goToParcel(parcel)}
                                className="block w-full rounded-md border bg-white p-2 text-left text-sm hover:bg-gray-50"
                            >
                                <div className="font-medium">{parcel.name}</div>
                                <div className="text-xs text-gray-400">{parcel.graves_count ?? 0} sír</div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
