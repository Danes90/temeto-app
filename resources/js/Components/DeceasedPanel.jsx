import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function DeceasedPanel({ cemetery, parcel, grave, onClose }) {
    const [form, setForm] = useState({ name: '', birth_date: '', death_date: '', notes: '' });

    const handleAdd = (e) => {
        e.preventDefault();

        router.post(
            route('cemeteries.parcels.graves.deceased.store', {
                cemetery: cemetery.id,
                parcel: parcel.id,
                grave: grave.id,
            }),
            form,
            {
                preserveScroll: true,
                onSuccess: () => setForm({ name: '', birth_date: '', death_date: '', notes: '' }),
            }
        );
    };

    const handleDelete = (deceased) => {
        if (!confirm(`Biztosan törlöd: ${deceased.name}?`)) {
            return;
        }

        router.delete(
            route('cemeteries.parcels.graves.deceased.destroy', {
                cemetery: cemetery.id,
                parcel: parcel.id,
                grave: grave.id,
                deceased: deceased.id,
            }),
            { preserveScroll: true }
        );
    };

    return (
        <div className="w-80 shrink-0 space-y-4 overflow-y-auto rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Sír: {grave.label}</h3>
                <button onClick={onClose} className="text-sm text-gray-400 hover:text-gray-600">
                    ✕
                </button>
            </div>

            <div className="space-y-2">
                {grave.deceased.length === 0 && (
                    <p className="text-sm text-gray-400">Nincs rögzített elhunyt ebben a sírban.</p>
                )}

                {grave.deceased.map((d) => (
                    <div key={d.id} className="rounded-md border p-2 text-sm">
                        <div className="flex items-start justify-between">
                            <div className="font-medium text-gray-800">{d.name}</div>
                            <button onClick={() => handleDelete(d)} className="text-xs text-red-500">
                                törlés
                            </button>
                        </div>
                        <div className="text-xs text-gray-500">
                            {d.birth_date ?? '?'} – {d.death_date ?? '?'}
                        </div>
                        {d.notes && <div className="mt-1 text-xs text-gray-500">{d.notes}</div>}
                    </div>
                ))}
            </div>

            <form onSubmit={handleAdd} className="space-y-2 border-t pt-3">
                <h4 className="text-sm font-semibold text-gray-600">Új elhunyt hozzáadása</h4>

                <input
                    type="text"
                    placeholder="Név"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full rounded-md border-gray-300 text-sm"
                />

                <div className="flex gap-2">
                    <input
                        type="date"
                        value={form.birth_date}
                        onChange={(e) => setForm({ ...form, birth_date: e.target.value })}
                        className="w-1/2 rounded-md border-gray-300 text-sm"
                    />
                    <input
                        type="date"
                        value={form.death_date}
                        onChange={(e) => setForm({ ...form, death_date: e.target.value })}
                        className="w-1/2 rounded-md border-gray-300 text-sm"
                    />
                </div>

                <textarea
                    placeholder="Megjegyzés"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={2}
                    className="w-full rounded-md border-gray-300 text-sm"
                />

                <button
                    type="submit"
                    className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white"
                >
                    Hozzáadás
                </button>
            </form>
        </div>
    );
}
