import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

/**
 * Super admin felület: melyik felhasználó melyik temetőhöz férjen hozzá.
 * Minden checkbox saját kérést küld (nem egy nagy form-mentés), így
 * a változás azonnal, oldalújratöltés nélkül érvényesül.
 */
export default function UserCemeteryAssignments({ users, cemeteries }) {
    const [assignments, setAssignments] = useState(() => {
        const map = {};
        users.forEach((user) => {
            map[user.id] = new Set(user.cemetery_ids);
        });
        return map;
    });
    const [pendingKey, setPendingKey] = useState(null);

    const toggle = (user, cemetery) => {
        if (user.is_super_admin) {
            return;
        }

        const key = `${user.id}-${cemetery.id}`;
        const wasAttached = assignments[user.id]?.has(cemetery.id) ?? false;
        const nextAttached = !wasAttached;

        // Optimista UI-frissítés
        setAssignments((prev) => {
            const updated = new Set(prev[user.id]);
            nextAttached ? updated.add(cemetery.id) : updated.delete(cemetery.id);
            return { ...prev, [user.id]: updated };
        });
        setPendingKey(key);

        router.patch(
            route('admin.user-cemeteries.update', { user: user.id, cemetery: cemetery.id }),
            { attached: nextAttached },
            {
                preserveScroll: true,
                preserveState: true,
                onError: () => {
                    // hiba esetén visszaállítjuk az eredeti állapotot
                    setAssignments((prev) => {
                        const updated = new Set(prev[user.id]);
                        wasAttached ? updated.add(cemetery.id) : updated.delete(cemetery.id);
                        return { ...prev, [user.id]: updated };
                    });
                },
                onFinish: () => setPendingKey(null),
            }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Felhasználók – temető hozzárendelések
                </h2>
            }
        >
            <Head title="Felhasználó–temető hozzárendelések" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-x-auto bg-white p-6 shadow-sm sm:rounded-lg">
                        <p className="mb-4 text-sm text-gray-500">
                            Pipáld be, mely temetőkhöz férjen hozzá az adott felhasználó.
                            A <span className="font-semibold">super admin</span> felhasználók
                            minden temetőhöz automatikusan hozzáférnek, ezért náluk a
                            checkboxok nem szerkeszthetők.
                        </p>

                        <table className="min-w-full border-collapse text-sm">
                            <thead>
                                <tr>
                                    <th className="sticky left-0 z-10 bg-white p-2 text-left font-semibold">
                                        Felhasználó
                                    </th>
                                    {cemeteries.map((cemetery) => (
                                        <th
                                            key={cemetery.id}
                                            className="whitespace-nowrap p-2 text-center font-semibold"
                                        >
                                            {cemetery.name}
                                            {cemetery.city && (
                                                <span className="block text-xs font-normal text-gray-400">
                                                    {cemetery.city}
                                                </span>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-t">
                                        <td className="sticky left-0 z-10 bg-white p-2">
                                            <div className="font-medium text-gray-800">
                                                {user.name}
                                                {user.is_super_admin && (
                                                    <span className="ml-2 rounded bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                                                        super admin
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-400">{user.email}</div>
                                        </td>
                                        {cemeteries.map((cemetery) => {
                                            const checked =
                                                user.is_super_admin ||
                                                assignments[user.id]?.has(cemetery.id);
                                            const key = `${user.id}-${cemetery.id}`;

                                            return (
                                                <td key={cemetery.id} className="p-2 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={checked}
                                                        disabled={user.is_super_admin || pendingKey === key}
                                                        onChange={() => toggle(user, cemetery)}
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50"
                                                    />
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
