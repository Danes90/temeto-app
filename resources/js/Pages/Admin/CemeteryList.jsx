import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function CemeteryList({ cemeteries }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Temetők listája
                </h2>
            }
        >
            <Head title="Temetők listája" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-x-auto bg-white p-6 shadow-sm sm:rounded-lg">
                        <p className="mb-4 text-sm text-gray-500">
                            Temető felvétele (kell majd egy plusz gomb)
                        </p>
                        <table className="min-w-full border-collapse text-sm">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">
                                        Név
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Település
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Cím
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Leírás
                                    </th>
                                    <th>
                                        Aktív
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {cemeteries.map((cemetery) => (
                                    <tr
                                        key={cemetery.id}
                                        className="border-t"
                                    >
                                        <td className="px-4 py-2">
                                            {cemetery.name}
                                        </td>

                                        <td className="px-4 py-2">
                                            {cemetery.city}
                                        </td>

                                        <td className="px-4 py-2">
                                            {cemetery.address}
                                        </td>

                                        <td className="px-4 py-2">
                                            {cemetery.description}
                                        </td>
                                        <td className="px-4 py-2">
                                            (aktivitás állitása)
                                        </td>
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
