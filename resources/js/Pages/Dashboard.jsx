import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CemeterySwitcher from '@/Components/CemeterySwitcher';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ activeCemetery }) {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Vezérlőpult
                    </h2>
                    <CemeterySwitcher />
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        {activeCemetery ? (
                            <>
                                <p>
                                    Jelenleg a(z) <strong>{activeCemetery.name}</strong>{' '}
                                    temető adatait szerkeszted.
                                </p>
                                <Link
                                    href={route('cemeteries.map', { cemetery: activeCemetery.id })}
                                    className="mt-3 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
                                >
                                    🗺️ Parcella térkép megnyitása
                                </Link>
                            </>
                        ) : (
                            <p>Nincs elérhető temetőd. Kérj hozzáférést egy adminisztrátortól.</p>
                        )}

                        {auth.user?.is_super_admin && (
                            <p className="mt-4 text-sm text-gray-500">
                                Super adminként az összes temetőhöz hozzáférsz.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
