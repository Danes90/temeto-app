import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ParcelGraveCanvas from '@/Components/Konva/ParcelGraveCanvas';
import DeceasedPanel from '@/Components/DeceasedPanel';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ cemetery, parcel, graves }) {
    const [drawMode, setDrawMode] = useState(false);
    const [selectedGraveId, setSelectedGraveId] = useState(null);
    const [pendingRect, setPendingRect] = useState(null);
    const [label, setLabel] = useState('');

    const selectedGrave = graves.find((g) => g.id === selectedGraveId) || null;

    const handleFinishDrawing = (rect) => {
        setPendingRect(rect);
        setDrawMode(false);
    };

    const handleSaveGrave = (e) => {
        e.preventDefault();

        router.post(
            route('cemeteries.parcels.graves.store', { cemetery: cemetery.id, parcel: parcel.id }),
            { label, ...pendingRect, rotation: 0 },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setPendingRect(null);
                    setLabel('');
                },
            }
        );
    };

    const handleUpdateGrave = (grave, changes) => {
        router.put(
            route('cemeteries.parcels.graves.update', {
                cemetery: cemetery.id,
                parcel: parcel.id,
                grave: grave.id,
            }),
            changes,
            { preserveScroll: true, preserveState: true }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <Link
                            href={route('cemeteries.map', { cemetery: cemetery.id })}
                            className="text-xs text-indigo-600 hover:underline"
                        >
                            ← vissza a temető térképére
                        </Link>
                        <h2 className="text-xl font-semibold text-gray-800">
                            {cemetery.name} – {parcel.name} parcella
                        </h2>
                    </div>
                    <button
                        onClick={() => setDrawMode((v) => !v)}
                        className={`rounded-md px-4 py-2 text-sm font-medium text-white ${
                            drawMode ? 'bg-red-600' : 'bg-indigo-600'
                        }`}
                    >
                        {drawMode ? 'Rajzolás megszakítása' : '+ Új sír rajzolása'}
                    </button>
                </div>
            }
        >
            <Head title={`${parcel.name} parcella`} />

            <div className="flex h-[calc(100vh-140px)] gap-4 px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex-1 overflow-hidden rounded-lg border bg-[#efe6cf]">
                    <ParcelGraveCanvas
                        graves={graves}
                        drawMode={drawMode}
                        selectedGraveId={selectedGraveId}
                        onFinishDrawing={handleFinishDrawing}
                        onSelectGrave={(grave) => setSelectedGraveId(grave?.id ?? null)}
                        onUpdateGrave={handleUpdateGrave}
                    />
                </div>

                {drawMode && (
                    <p className="w-64 shrink-0 text-sm text-gray-500">
                        Húzz egy téglalapot a térképen az új sír helyére.
                    </p>
                )}

                {pendingRect && (
                    <form
                        onSubmit={handleSaveGrave}
                        className="w-72 shrink-0 space-y-3 rounded-lg border bg-white p-4 shadow-sm"
                    >
                        <h3 className="font-semibold text-gray-800">Új sír mentése</h3>

                        <div>
                            <label className="block text-sm text-gray-600">Sírszám / jel</label>
                            <input
                                type="text"
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                required
                                autoFocus
                                placeholder="pl. A-01"
                                className="mt-1 w-full rounded-md border-gray-300 text-sm"
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
                                onClick={() => setPendingRect(null)}
                                className="rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700"
                            >
                                Mégse
                            </button>
                        </div>
                    </form>
                )}

                {selectedGrave && !pendingRect && (
                    <DeceasedPanel
                        cemetery={cemetery}
                        parcel={parcel}
                        grave={selectedGrave}
                        onClose={() => setSelectedGraveId(null)}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
