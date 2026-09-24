import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

/**
 * Legördülő menü, amivel a bejelentkezett felhasználó kiválaszthatja,
 * melyik temetőt szerkeszti éppen. A választott temető a szerver oldali
 * session-ben tárolódik (HandleInertiaRequests middleware osztja meg
 * minden oldallal, mint `cemeteries.active_id`).
 */
export default function CemeterySwitcher() {
    const { cemeteries } = usePage().props;
    const { accessible, active_id: activeId } = cemeteries;
    const [submitting, setSubmitting] = useState(false);

    if (!accessible || accessible.length === 0) {
        return (
            <p className="text-sm text-gray-500">
                Nincs elérhető temetőd.
            </p>
        );
    }

    const handleChange = (event) => {
        const cemeteryId = Number(event.target.value);

        if (cemeteryId === activeId) {
            return;
        }

        setSubmitting(true);

        router.post(
            route('cemetery.select'),
            { cemetery_id: cemeteryId },
            {
                preserveScroll: true,
                preserveState: false, // reload-oljuk az oldal adatait az új kontextussal
                onFinish: () => setSubmitting(false),
            }
        );
    };

    return (
        <div className="flex items-center gap-2">
            <label htmlFor="cemetery-switcher" className="text-sm font-medium text-gray-600">
                Temető:
            </label>
            <select
                id="cemetery-switcher"
                value={activeId ?? ''}
                onChange={handleChange}
                disabled={submitting}
                className="rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50"
            >
                {accessible.map((cemetery) => (
                    <option key={cemetery.id} value={cemetery.id}>
                        {cemetery.name}
                        {cemetery.city ? ` (${cemetery.city})` : ''}
                    </option>
                ))}
            </select>
        </div>
    );
}
